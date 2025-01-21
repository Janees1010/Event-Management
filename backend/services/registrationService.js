// const Registration =  require("../model/registrationSchema")
const mongoose = require("mongoose")

const registerEventService = async(data,userId)=>{
    try {
         data.userId = userId
         console.log(data);
         const collection = mongoose.connection.collection('registration')
         const response = await collection.insertOne(data)
         return response
    } catch (error) {
        throw new Error(`error while registering: ${error.message}`)
    }   
}

const getregisteredDetails = async()=>{
    try {
        const collection = mongoose.connection.collection('registration')
        const response =  await collection.find()
        return response
    } catch (error) {
        throw new Error(`error while registering: ${error.message}`)
    }
}

module.exports = {   
    registerEventService,
    getregisteredDetails
}   