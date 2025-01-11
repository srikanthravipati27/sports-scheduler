const express = require('express');
const { ensureAuthenticated } = require('./roleauth');
const { User, Session, Sport, PlayerSession } = require('./models');
const router = express.Router();

// Player Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    const createdSessions = await Session.findAll({
        where: { creatorId: req.user.id },
        include: {
            model: Sport,
            as: 'sport',
        },
    });

    const joinedSessions = await PlayerSession.findAll({
        where: { userId: req.user.id },
        include: [{ model: Session, as: 'session' }],
    });

    res.render('playerdashboard', { createdSessions, joinedSessions, csrfToken: req.csrfToken() });
});

// Create Session (GET)
router.get('/create-session', ensureAuthenticated, async (req, res) => {
    const sports = await Sport.findAll();
    res.render('playercreatesession', { sports, csrfToken: req.csrfToken() });
});

// Create Session (POST)
router.post('/create-session', ensureAuthenticated, async (req, res) => {
    const { sportId, location, startTime, endTime, maxPlayers } = req.body;
    const session = await Session.create({
        sportId,
        location,
        startTime,
        endTime,
        maxPlayers,
        creatorId: req.user.id,
        availableSpots: maxPlayers,
    });
    res.redirect('/player/dashboard');
});

// Join Session
router.post('/join-session/:sessionId', ensureAuthenticated, async (req, res) => {
    const session = await Session.findByPk(req.params.sessionId);
    if (session.availableSpots > 0) {
        await PlayerSession.create({
            userId: req.user.id,
            sessionId: session.id,
        });
        session.availableSpots -= 1;
        await session.save();
    }
    res.redirect('/player/dashboard');
});

// Cancel Session
router.post('/cancel-session/:sessionId', ensureAuthenticated, async (req, res) => {
    const playerSession = await PlayerSession.findOne({
        where: {
            userId: req.user.id,
            sessionId: req.params.sessionId,
        },
    });
    if (playerSession) {
        await playerSession.destroy();
        const session = await Session.findByPk(req.params.sessionId);
        session.availableSpots += 1;
        await session.save();
    }
    res.redirect('/player/dashboard');
});

module.exports = router;
