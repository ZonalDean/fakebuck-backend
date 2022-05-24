const express = require("express");
const router = express.Router();


// CONTROLLER
const usersController = require('../controller/usersController')

// MIDDLEWARE
const upload = require('../middlwares/Upload')

// ROUTERS
router.patch('/', upload.single('profilePic'), usersController.updateProfile)
router.get('/me', usersController.getMe)

module.exports = router
