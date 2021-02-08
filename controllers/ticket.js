const { Ticket, Ticket_comment } = require("../models/Ticket");
const TicketCategory = require("../models/TicketCategory");
const User = require("../models/User");

exports.createTicket = async (req, res, next) => {
  const categoryType = await TicketCategory({ name: req.body.name });
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
  const getTicket = await Ticket.findOne({
    _id: req.body.ticketId,
    $or: [{ status: "NEW" }, { status: "IN_PROGRESS" }],
  }).populate("replies");

  if (!getTicket) {
    return res.status(404).json({ message: "Error fetching ticket" });
  }

  //Checks if the poster of the first comment is an admin
  const isSupportCheck = getTicket.replies.map((reply) => reply.sender)[0];
  const supportAdmin = await User.findOne({ _id: isSupportCheck._id });

  if (supportAdmin.accountType !== "support") {
    return res.status(401).json({
      message: "You cannot comment on this ticket unless an admin does",
      status: false,
    });
  }
  const checkUserOrSupport = await User.findOne({ _id: req._id });
  const ticketReply = await Ticket_comment.create({
    sender: checkUserOrSupport._id,
    ticketId: getTicket._id,
    message: req.body.message,
    isUser: checkUserOrSupport.accountType === "user",
    isSupport: checkUserOrSupport.accountType === "support",
  });

  getTicket.replies = getTicket.push(ticketReply._id);
  getTicket.status = "IN_PROGRESS";
  await getTicket.save();
  return res
    .status(200)
    .json({ message: "ticket reply sent successfully", success: true });
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
  // const ticketRepl
};
