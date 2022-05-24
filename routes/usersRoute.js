const express = require("express");
const router = express.Router();
const usersController = require('../controller/usersController')

router.get('/me', usersController.getMe)

module.exports = router
