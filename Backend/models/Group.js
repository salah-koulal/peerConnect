const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Group name is required"],
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
  },
  description: {
    type: String,
    default: "",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  location: {
    type: String,
    default: "Online",
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "End date is required"],
  },
  hoursPerDay: {
    type: Number,
    default: 2,
    min: [0, "Hours per day must be positive"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Group", groupSchema);
