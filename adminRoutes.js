const express = require('express');
const { ensureAuthenticated, ensureAdmin } = require('./roleauth');
const { Sport, Session, User } = require('./models');
const router = express.Router();


router.get('/dashboard', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const sports = await Sport.findAll();
    const sessions = await Session.findAll();
    res.render('admindashboard', { sports, sessions, csrfToken: req.csrfToken()  });
});


router.get('/manage-sports', ensureAuthenticated, ensureAdmin, (req, res) => {
    res.render('adminmanagesport', { csrfToken: req.csrfToken() });
});

// Add Sport
router.post('/manage-sports', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const { name } = req.body;
    await Sport.create({ name });
    res.redirect('/admin/dashboard');
});

// Edit Sport 
router.get('/edit-sport/:id', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const sport = await Sport.findByPk(req.params.id);
    res.render('admineditsport', { sport, csrfToken: req.csrfToken() });
});

// Edit Sport
router.post('/edit-sport/:id', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const { name } = req.body;
    await Sport.update({ name }, { where: { id: req.params.id } });
    res.redirect('/admin/dashboard');
});

// Delete Sport
router.post('/delete-sport/:id', ensureAuthenticated, ensureAdmin, async (req, res) => {
    await Sport.destroy({ where: { id: req.params.id } });
    res.redirect('/admin/dashboard');
});

// Admin Reports
router.get('/reports', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const report = await Session.findAll({
        include: [{ model: Sport, as: 'sport' }],
    });
    res.render('adminreport', { report });
});

// Edit/Delete Session 
router.get('/manage-sessions', ensureAuthenticated, ensureAdmin, async (req, res) => {
    const sessions = await Session.findAll({
        include: [{ model: Sport, as: 'sport' }],
    });
    res.render('adminmanagesession', { sessions, csrfToken: req.csrfToken() });
});

// Delete Session
router.post('/delete-session/:id', ensureAuthenticated, ensureAdmin, async (req, res) => {
    await Session.destroy({ where: { id: req.params.id } });
    res.redirect('/admin/manage-sessions');
});

module.exports = router;
