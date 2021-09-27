const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let user;

  try {
    user = await User.findOne({ email: req.body.email }).exec();
    if (user) {
      return res.status(400).send({
        status: "failed",
        message: "please enter diff. mail",
      });
    }

    user = await User.create(req.body);
    if (!user) {
      return res.status(400).send({ status: "failed", message: "wrong input" });
    }

    const token = newToken(user);
    return res.status(201).json({ token });
  } catch (err) {
    return res
      .status(500)
      .send({ status: "failed", message: "something went wrong" });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res
        .status(400)
        .send({ status: "failed", message: "please try later" });
    }
    const match = user.checkPassword(req.body.password);
    if (!match) {
      return res
        .status(400)
        .send({ status: "failed", message: "please try again" });
    }

    const token = newToken(user);
    return res.status(201).json({ token: token });
  } catch (err) {
    return res
      .status(500)
      .send({ status: "failed", message: "please try again" });
  }
};

module.exports = { register, login };
