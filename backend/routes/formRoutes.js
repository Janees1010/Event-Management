const express = require("express");
const router = express.Router()
const {addForm,fetchForm,findOneForm} = require("../controller/formController") 

router.post("/add",addForm)
router.get("/findOne",findOneForm)
router.get("/",fetchForm)

module.exports =  router;
