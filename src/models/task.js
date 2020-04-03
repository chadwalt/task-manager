const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  description: {
    type: String,
    description: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = Task
