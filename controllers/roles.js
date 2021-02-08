const Role = require("../models/Role");

exports.createRole = async (req, res, next) => {
  try {
    await Role.create({name: req.body.name});
    return res.status(201).json({ message: "role created", success: true });
  } catch (error) {
    return res.json({ message: `Error:${error.message}` });
  }
};
