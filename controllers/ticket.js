const { Ticket, Ticket_comment } = require("../models/Ticket");
const TicketCategory = require("../models/TicketCategory");
const User = require("../models/User");

exports.createTicket = async (req, res, next) => {
  const categoryType = await TicketCategory.findOne({
    category: req.body.category,
  });
  if (!categoryType) {
    return res
      .status(404)
      .json({ message: "category not found", status: false });
  }
  await Ticket.create({
    ...req.body,
    userId: req._id,
    category: categoryType._id,
    status: "NEW",
  });
  return res.status(201).json({ message: "Ticket created", status: true });
};

exports.replyTicket = async (req, res, next) => {
  //Check for an existing ticket
  try {
    const getTicket = await Ticket.findOne({
      _id: req.body.ticketId,
      $or: [{ status: "NEW" }, { status: "IN_PROGRESS" }],
    });
    if (!getTicket) {
      return res.status(404).json({ message: "Error fetching ticket" });
    }

    const checkUserOrSupport = await User.findOne({ _id: req._id });
    const ticketReply = await Ticket_comment.create({
      senderId: checkUserOrSupport._id,
      ticketId: getTicket._id,
      message: req.body.message,
      isUser: checkUserOrSupport.accountType === "user",
      isSupport: checkUserOrSupport.accountType === "support",
    });

    await Ticket.updateOne(
      { _id: getTicket._id },
      {
        $push: {
          replies: ticketReply._id,
        },
        $set: {
          status: "IN_PROGRESS",
        },
      }
    );
    return res
      .status(200)
      .json({ message: "ticket reply sent successfully", success: true });
  } catch (error) {
    console.log(error.message);
  }
};

exports.closeTicket = async (req, res, next) => {
  const getTicket = await Ticket.findOne({ _id: req.params.ticketId });
  if (!getTicket) {
    return res
      .status(404)
      .json({ message: "ticket not found", success: false });
  }
  getTicket.status = "CLOSE";
  await Ticket.save();
  return res
    .status(200)
    .json({ message: "ticket closed successfully", success: true });
};

exports.getTicketReplies = async (req, res, next) => {
  const ticket = await Ticket_comment.find({ticketId: req.params.ticketId})
  console.log(ticket)
  res.status(200).json({data: ticket})
};
