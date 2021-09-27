const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const protect = require("../middleware/protection");
const autorize = require("../middleware/authorization.js");
const User = require("../models/user.model");
const authorise = require("../middleware/authorization.js");
const upload = require("../utils/file");
router.post(
  "/",
  body("name").isLength({ min: 1 }).withMessage("Please Enter Your Name"),
  protect,
  authorise(["admin"]),
  upload.single("profile_photo"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profile_photo: req.file.path,
      roles: req.body.roles,
    });
    return res.status(201).json({ user });
  }
);

router.get("/", async (req, res) => {
  if (!req.body.token) {
    return res
      .status(400)
      .json({ status: "failed", message: "User is not logged in" });
  }

  const user = await User.find().lean().exec();
  return res.status(200).json({ user });
});

module.exports = router;
