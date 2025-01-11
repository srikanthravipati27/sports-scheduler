const express = require('express');
const { ensureAuthenticated, ensureAdmin } = require('./roleauth');
const { Sport, Session, User } = require('./models');
const router = express.Router();

// Admin Dashboard
router.get('/dashboard', ensureAuthenticated, ensureAdmin, async (req, res) => {
  const sports = await Sport.findAll();
  const sessions = await Session.findAll();
  res.render('admindashboard', { sports, sessions });
});

// Manage Sports (Add/Edit/Delete)
router.get('/manage-sports', ensureAuthenticated, ensureAdmin, (req, res) => {
  res.render('adminmanagesport',{ csrfToken: req.csrfToken(),});
});

router.post('/manage-sports', ensureAuthenticated, ensureAdmin, async (req, res) => {
  const { name } = req.body;
  await Sport.create({ name });
  res.redirect('/admin/dashboard');
});

// Admin Reports
router.get('/reports', ensureAuthenticated, ensureAdmin, async (req, res) => {
  const report = await Session.findAll({
    include: [{ model: Sport, as: 'sport' }],
  });
  res.render('adminreport', { report });
});

module.exports = router;
