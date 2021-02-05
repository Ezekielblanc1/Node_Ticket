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
    replies: [mongoose.Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

const ticketCommentSchema = new mongoose.Schema({
  senderId: mongoose.Schema.Types.ObjectId,
  ticketId: mongoose.Schema.Types.ObjectId,
  isUser: Boolean,
  isSupport: Boolean,
  messageBody: String,
});

const Ticket = mongoose.model("ticket", ticketSchema);
const Ticket_comment = mongoose.model("ticket_comments", ticketCommentSchema);
module.exports = {
  Ticket,
  Ticket_comment,
};
