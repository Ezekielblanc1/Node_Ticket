const TicketCategory = require("../models/TicketCategory");

exports.createCategory = async (req, res, next) => {
  await TicketCategory.create({ ...req.body });
  res.status(201).json({ message: "ticket category created", success: true });
};

