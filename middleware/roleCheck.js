const User = require("../models/User");
const Role = require("../models/Role");

const isAdmin = (req, res, next) => {
  try {
    //Get user data
    const user = await User.findById(req._id);

    //Check for roles associated with user
    const roles = await Role.find({
      _id: { $in: user.roles },
    });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
      return res.status(403).send({ message: "Require Admin Role!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "An error occured", error });
  }

};


const isSupport = async (req, res, next) => {
  try {
    //Get user data
    const user = await User.findById(req._id);

    //Check for roles associated with user
    const roles = await Role.find({
      _id: { $in: user.roles },
    });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "support") {
        return next();
      }
      return res.status(403).send({ message: "Require Support Role!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "An error occured", error });
  }
};

const roleFunc = {
  isAdmin,
  isSupport,
};

module.exports = roleFunc;
