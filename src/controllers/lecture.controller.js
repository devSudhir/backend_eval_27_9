const express = require("express");

const Lecture = require("../models/lecture.model");
const router = express.Router();

router.post("", async (req, res) => {
  const lecture = await Lecture.create(req.body);
  return res.status(201).json({ lecture });
});

router.get("", async (req, res) => {
  const lecture = await Lecture.find().populate("user_id").lean().exec();
  return res.status(200).json({ lecture });
});

router.get("/:id", async (req, res) => {
  const lecture = await Lecture.findById(req.params.id)
    .populate("user_id")
    .lean()
    .exec();
  return res.status(200).json({ post });
});

router.patch("/:id", async (req, res) => {
  const lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(200).json({ post });
});

router.delete("/:id", async (req, res) => {
  const lecture = await Lecture.findByIdAndDelete(req.params.id);
  return res.status(200).json({ post });
});
module.exports = router;
