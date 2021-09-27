const express = require("express");

const Student = require("../models/student.model");
const router = express.Router();

router.post("", async (req, res) => {
  const student = await Student.create(req.body);
  return res.status(201).json({ student });
});

router.get("", async (req, res) => {
  const student = await Student.find().populate("user_id").lean().exec();
  return res.status(200).json({ student });
});

module.exports = router;
