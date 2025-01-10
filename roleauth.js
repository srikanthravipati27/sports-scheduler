function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to access this resource.');
    res.redirect('/auth/login');
  }
  
  function ensureAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      return next();
    }
    req.flash('error_msg', 'Access denied.');
    res.redirect('/auth/login');
  }
  
  module.exports = { ensureAuthenticated, ensureAdmin };
  