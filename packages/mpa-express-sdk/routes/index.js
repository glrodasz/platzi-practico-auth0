var router = require('express').Router();

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    // TODO: Load isAuthenticated from the OIDC context
    isAuthenticated: null
  });
});

// TODO: Add the requiresAuth middleware
router.get('/profile', function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});

module.exports = router;
