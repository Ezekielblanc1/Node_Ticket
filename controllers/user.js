const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require("../models/Role");


exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(12));
    const user = await User.create({ ...req.body, password: hashedPassword });
    if (req.body.roles) {
      const roles = await Role.find({
        name: { $in: req.body.roles },
      });
      user.roles = roles.map((role) => role._id);
      await user.save();
      return res.status(200).json({
        message: "User created successfully",
        success: true,
      });
    } else {
      const role = await Role.findOne({ name: "user" });
      user.roles = [role._id];
      await user.save();
      return res.status(200).json({
        message: "User created successfully",
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Failed",
      message: error.message,
    });
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(404)
        .json({ message: "Incorrect password", success: false });
    }
    const token = await jwt.sign(
      { email: user.email, _id: user._id, accountType: user.accountType },
      process.env.SECRET,
      { expiresIn: "1hr" }
    );
    return res.status(200).send({ _id: user._id, token });
  } catch (error) {
    console.log(error);
  }
};
