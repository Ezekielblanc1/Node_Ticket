const TicketCategory = require("../models/TicketCategory");


// @desc      Create ticket category
// @route     POST /category/create
// @access    Private
exports.createCategory = async (req, res, next) => {
  await TicketCategory.create({ ...req.body });
  res.status(201).json({ message: "ticket category created", success: true });
};

