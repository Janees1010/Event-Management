const express = require("express");
const router = express.Router()
const {addEvent,fetchEvent} = require("../controller/eventController") 

router.post("/add",addEvent)
router.get("/",fetchEvent)

module.exports =  router;
