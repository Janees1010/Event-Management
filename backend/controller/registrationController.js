
const {
    registerEventService,
    getregisteredDetails
} = require("../services/registrationService")
 
const registerEvent = async (req,res)=>{
   try {
     const response = await registerEventService(req.body,req.user)
     return res.status(200).json(response)
   } catch (error) {
        return res.status(500).json(error.message)
   }
}

const getRegisteredResponse = async()=>{
    try {
         const response  =  await getregisteredDetails()
         return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    registerEvent,
    getRegisteredResponse
}