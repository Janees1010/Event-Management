const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  formName: {
    type: String,
    required: true,
  },
  form: [
    {
      name: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        required: true,
      },

      placeholder: {
        type: String,
      },

      title: {
        type: String,
      },
    },
  ],
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
