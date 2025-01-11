const express = require('express');

const { ensureAuthenticated } = require('./roleauth');
const { Session, Sport, PlayerSession } = require('./models');
const router = express.Router();

// Player Dashboard
router.get('/dashboard', ensureAuthenticated,  async (req, res) => {
  const createdSessions = await Session.findAll({ where: { creatorId: req.user.id } });
  const joinedSessions = await PlayerSession.findAll({
    where: { playerId: req.user.id },
    include: [{ model: Session, as: 'session' }],
  });
  res.render('playerdashboard', { createdSessions, joinedSessions });
});

// Create Session
router.get('/create-session', ensureAuthenticated,  async (req, res) => {
  const sports = await Sport.findAll();
  res.render('playercreatesession', { sports, csrfToken: req.csrfToken() });
});

router.post('/create-session', ensureAuthenticated, async (req, res) => {
  const { sportId, location, startTime, endTime, maxPlayers } = req.body;
  
  // Create the session with maxPlayers and availableSpots
  await Session.create({
    sportId,
    creatorId: req.user.id,
    location,
    startTime,
    endTime,
    maxPlayers,
    availableSpots: maxPlayers,  // Initially, available spots are equal to maxPlayers
  });

  res.redirect('/player/dashboard');
});


// Join Session
// Join Session
// Join Session
router.post('/join-session/:sessionId', ensureAuthenticated, async (req, res) => {
  const sessionId = req.params.sessionId;
  const session = await Session.findByPk(sessionId, {
    include: [{ model: User, as: 'players' }],
  });

  if (session.players.length >= session.maxPlayers) {
    // Handle case where session is full
    return res.status(400).send('Session is full');
  }

  if (session.availableSpots > 0) {
    await PlayerSession.create({
      playerId: req.user.id,
      sessionId,
    });

    // Decrease available spots
    session.availableSpots -= 1;
    await session.save();

    res.redirect('/player/dashboard');
  } else {
    res.status(400).send('No available spots');
  }
});



// Cancel Session
// Cancel Session
router.post('/cancel-session/:sessionId', ensureAuthenticated, async (req, res) => {
  const sessionId = req.params.sessionId;
  const session = await Session.findByPk(sessionId);

  // Remove the player from the session
  await PlayerSession.destroy({
    where: { playerId: req.user.id, sessionId },
  });

  // Increment the available spots
  await session.update({ availableSpots: session.availableSpots + 1 });

  res.redirect('/player/dashboard');
});


module.exports = router;
