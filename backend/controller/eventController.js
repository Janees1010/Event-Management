const {
    addEventService,
    fetchEventService
} =  require("../services/eventService")

const addEvent = async(req,res)=>{
    try {
        console.log(req.body);
        
         const {title ,venue ,type ,form ,date}  = req.body
         if(!title || !venue || !type || !form || !date) return res.status(400).json("credentials are missing")
         const response = await addEventService(req.body)
         return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const fetchEvent = async(req,res)=>{
    try {
         const events = await fetchEventService()
         return res.status(200).json(events)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports  = {
    addEvent,
    fetchEvent
}