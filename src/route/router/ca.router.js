const express = require('express');
const ca = require('../../app/controller/ca.controller');

const router = express.Router();

router.get('/', ca.index);
router.post('/', ca.ca);

module.exports = router;