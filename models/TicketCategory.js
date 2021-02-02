const mongoose = require("mongoose");
const ticketCategory = new mongoose.Schema(
  {
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", ticketCategory);
