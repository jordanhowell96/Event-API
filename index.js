const router = module.exports = require('express').Router();

router.use('/events', require('./events/router.js'));
router.use('/venues', require('./venues/router.js'));
router.use('/users', require('./users/router.js'));