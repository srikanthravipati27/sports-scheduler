const express = require('express');
const { ensureAuthenticated } = require('./roleauth');
const { User, Session, Sport, PlayerSession } = require('./models');
const router = express.Router();
const { Op } = require('sequelize');

// Player Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  const createdSessions = await Session.findAll({
    where: { creatorId: req.user.id },
    include: [
      { model: Sport, as: 'sport' },
      { model: User, as: 'players' }, // Ensure this association is included
    ],
  });

  const joinedSessions = await PlayerSession.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: Session,
        as: 'session',
        include: [{ model: Sport, as: 'sport' }],
      },
    ],
  });

  const otherSessions = await Session.findAll({
    where: {
      creatorId: { [Op.ne]: req.user.id },
      startTime: { [Op.gt]: new Date() }, // Exclude past sessions
    },
    include: { model: Sport, as: 'sport' },
  });

  res.render('playerdashboard', {
    createdSessions,
    joinedSessions,
    otherSessions,
    csrfToken: req.csrfToken(),
  });
});

// Create Session (GET)
router.get('/create-session', ensureAuthenticated, async (req, res) => {
  try {
    const sports = await Sport.findAll();
    res.render('playercreatesession', { sports, csrfToken: req.csrfToken() });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Create Session (POST)
router.post('/create-session', ensureAuthenticated, async (req, res) => {
  const { sportId, location, startTime, endTime, maxPlayers } = req.body;

  try {
    await Session.create({
      sportId,
      creatorId: req.user.id,
      location,
      startTime,
      endTime,
      maxPlayers,
      availableSpots: maxPlayers,
    });

    res.redirect('/player/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Join Session
router.post('/join-session/:sessionId', ensureAuthenticated, async (req, res) => {
  const sessionId = req.params.sessionId;

  try {
    const session = await Session.findByPk(sessionId, {
      include: [{ model: User, as: 'players' }],
    });

    if (session.players.some((player) => player.id === req.user.id)) {
      return res.status(400).send('You have already joined this session.');
    }

    if (session.players.length >= session.maxPlayers) {
      return res.status(400).send('Session is full');
    }

    await PlayerSession.create({
      userId: req.user.id,
      sessionId,
    });

    session.availableSpots -= 1;
    await session.save();

    res.redirect('/player/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Cancel Session
router.post('/cancel-session/:sessionId', ensureAuthenticated, async (req, res) => {
  const { sessionId } = req.params;
  const { reason } = req.body;

  try {
    const session = await Session.findByPk(sessionId);

    if (!session) {
      return res.status(404).send('Session not found');
    }

    await PlayerSession.destroy({
      where: { userId: req.user.id, sessionId },
    });

    session.availableSpots += 1;
    await session.save();

    res.redirect('/player/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete Session (Only for session creators)
router.post('/delete-session/:sessionId', ensureAuthenticated, async (req, res) => {
  const sessionId = req.params.sessionId;

  try {
    const session = await Session.findOne({
      where: { id: sessionId, creatorId: req.user.id },
    });

    if (!session) {
      return res.status(404).send('Session not found or you are not the creator.');
    }

    await session.destroy();

    res.redirect('/player/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
