const express = require('express');
const router = express.Router();
const bitController = require('../controller/bitController');

router.get('/bitcoin', bitController.getData);

module.exports=router;