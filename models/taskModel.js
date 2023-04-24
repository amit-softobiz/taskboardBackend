const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define a schema for tasks
const taskSchema = new Schema({
  title: { type: String, require: true },
  status: {
    type: String,
    require: true,
    enum: ["Active", "Inprogress", "Completed"],
    default: "Active",
  },
  description: { type: String, require: true },
  date: { type: Date },
});

// Create a model based on the schema
module.exports = mongoose.model("Task", taskSchema);
