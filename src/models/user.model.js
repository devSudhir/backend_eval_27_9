const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, reqiuied: true },
    profile_photo: { type: String, required: true },
    roles: [{ typw: String, required: true }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hash = await bcryptjs.hash(this.password, 8);
  this.password = hash;
  next();
});

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return bcryptjs.compareSync(password, passwordHash);
};
const User = mongoosemodel("user", userSchema);
module.exports = User;
