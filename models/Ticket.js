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
      enum: ["CLOSE", "IN_PROGRESS", "NEW"],
      default: "NEW",
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ticket_comments",
      },
    ],
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
  message: String,
});

const Ticket = mongoose.model("ticket", ticketSchema);
const Ticket_comment = mongoose.model("ticket_comments", ticketCommentSchema);
module.exports = {
  Ticket,
  Ticket_comment,
};
