const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    rollno: { type: Number, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Student = mongoose.model("student", studentSchema);
module.exports = Student;
