const { Ticket, Ticket_comment } = require("../models/Ticket");
const TicketCategory = require("../models/TicketCategory");
const User = require("../models/User");

// @desc      Add support ticket
// @route     POST /ticket
// @access    Private
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

// @desc      Reply support ticket
// @route     POST /ticket/reply_ticket
// @access    Private
exports.replyTicket = async (req, res, next) => {
  //Check for an existing ticket
  try {
    const getTicket = await Ticket.findOne({
      _id: req.body.ticketId,
      $or: [{ status: "NEW" }, { status: "IN_PROGRESS" }],
    });
    if (!getTicket) {
      return res.status(404).json({ message: "Ticket not available" });
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
    return res.status(400).json({ message: "An error occured", error });
  }
};

// @desc      Close support ticket
// @route     POST /ticket/:ticketId
// @access    Private
exports.closeTicket = async (req, res, next) => {
  await Ticket.updateOne(
    { _id: req.params.ticketId },
    {
      $set: {
        status: "CLOSE",
      },
    }
  );
  return res
    .status(200)
    .json({ message: "ticket closed successfully", success: true });
};

// @desc      View all support ticket comments
// @route     Get /ticket/:ticketId/replies
// @access    Private
exports.getTicketReplies = async (req, res, next) => {
  try {
    const ticket = await Ticket_comment.find({ ticketId: req.params.ticketId });
    if (ticket) {
      return res.status(200).json({ data: ticket });
    }
  } catch (error) {
    return res.status(400).json({ message: "An error occured", error });
  }
};

// @desc      View all open support ticket
// @route     Get /ticket/open
// @access    Private
exports.getOpenTickets = async (req, res, next) => {
  try {
    const openTickets = await Ticket.find({
      $or: [{ status: "NEW" }, { status: "IN_PROGRESS" }],
    });
    return res.json(openTickets);
  } catch (error) {
    return res.status(400).json({ message: "An error occured", error });
  }
};

// @desc      View all closed support ticket
// @route     Get /ticket/closed
// @access    Private
exports.getClosedTickets = async (req, res, next) => {
  try {
    const closedTickets = await Ticket.find({ status: "CLOSED" });
    return res.json(closedTickets);
  } catch (error) {
    return res.status(400).json({ message: "An error occured", error });
  }
};

// @desc      View all user support ticket
// @route     Get /userId
// @access    Private
exports.getUserTicket = async (req, res, next) => {
  try {
    const getUserTickets = await Ticket.find({ userId: req._id });
    return res.json(getUserTickets);
  } catch (error) {
    return res.status(400).json({ message: "An error occured", error });
  }
};



// @desc      View all closed support ticket for last month
// @route    Get /ticket/support/closed
// @access    Private
exports.getClosedTicketForLastMonth = async (req, res, next) => {
  let getDate = new Date();
  getDate.setMonth(d.getMonth() - 1);
  const closedTickets = await Ticket.find({
    $and: [{ status: "CLOSED" }, { createdAt: { $gte: getDate } }],
  });
  if (!closedTickets) {
    return res
      .status(404)
      .json({ message: "An error occured while fetching ticket" });
  }
  return res.json(closedTickets);
};
