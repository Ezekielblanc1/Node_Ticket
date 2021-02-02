const User = require("../models/User");
const Role = require("../models/Role");

const isAdmin = (req, res, next) => {
  User.findById(req._id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};
const isSupport = (req, res, next) => {
  User.findById(req._id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "support") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Support Role!" });
        return;
      }
    );
  });
};


const roleFunc = {
    isAdmin,
    isSupport
}

module.exports = roleFunc