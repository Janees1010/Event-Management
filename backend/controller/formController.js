const {
  addFormService,
  findForms,
  findFormById,
} = require("../services/formService");

const addForm = async (req, res) => {
  try {
    console.log(req.body, "req");
    const { form, formName } = req.body;
    if (!form || !formName)
      return res.status(400).json("form is required to add form");
    const response = await addFormService(form, formName);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const fetchForm = async (req, res) => {
  try {
    const response = await findForms();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const findOneForm = async (req, res) => {
  try {
    const { formId } = req.query;
    if (!formId)
      return res.status(400).json("formId is required to fetch FomDetails");
    const form = await findFormById(formId);
    return res.status(200).json(form);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  addForm,
  fetchForm,
  findOneForm,
};
