const express = require('express');
const router = express.Router();

// Require all route modules
const tourRouter = require('./tour.router');

// Use all route modules
router.use('/tours', tourRouter);

module.exports = router;
