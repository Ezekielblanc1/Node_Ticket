const Ticket = require("../models/Ticket");
const TicketCategory = require("../models/TicketCategory");

exports.createTicket = async (req, res, next) => {
  const categoryType = await TicketCategory({ name: req.body.name });
  if (!categoryType) {
    return res
      .status(404)
      .json({ message: " category not found", status: false });
  }
  await Ticket.create({
    ...req.body,
    userId: req._id,
    category: categoryType._id,
    status: "NEW",
  });
  return res.status(201).json({ message: "Ticket created", status: true });
};
