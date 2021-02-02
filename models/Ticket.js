const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    messageBody: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["DONE", "IN_PROGRESS", "NEW"],
      default: "NEW",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ticket", ticketSchema);
