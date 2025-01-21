const Event = require("../model/eventModel");

const addEventService = async (event) => {
  try {
    const response = await Event.create(event);
    return response;
  } catch (error) {
    throw new Error(`error while adding event : ${error.message}`);
  }
};

const fetchEventService = async () => {
  try {
    const events = await Event.find();
    return events
  } catch (error) {
    throw new Error(`error while fetching events : ${error.message}`);
  }
};

module.exports = {
  addEventService,
  fetchEventService
};
