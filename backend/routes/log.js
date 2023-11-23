// logRoutes.js

const express = require('express');
const { createLog, getLog } = require('../controller/logs.js');

const router = express.Router();

// POST endpoint for creating a new log
router.post('/logs', getLog);
// router.post('/logs', createLog);

module.exports = router;
