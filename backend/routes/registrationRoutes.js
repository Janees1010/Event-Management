const express = require("express");
const router = express.Router()
const authentiCteUser = require("../middleware/Authentication")
const {registerEvent} = require("../controller/registrationController") 

router.post("/register",authentiCteUser,registerEvent)


module.exports =  router;
