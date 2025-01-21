const Form = require("../model/formModel");

const addFormService = async (form, formName) => {
  try {
    const dataToInsert = {
      formName,
      form,
    };
    console.log(dataToInsert,"hh");
    
    await Form.create(dataToInsert);
  } catch (error) {
    throw new Error(`error adding form : ${error.message}`);
  }
};

const findForms = async()=>{
   try {
       const forms  = await Form.find()
       return forms
   } catch (error) {
      throw new Error(`error fetching form : ${error.message}`);
   }
}
const findFormById = async(id)=>{
    try { 
        const form = await Form.findById(id)
        return form
    } catch (error) {
        throw new Error(`error fetching form by id : ${error.message}`);
    }
}

module.exports = {
  addFormService,
  findForms,
  findFormById
};
