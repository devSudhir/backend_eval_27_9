const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destinstion: function (req, file, callback) {
    callback(null, path.join(__dirname, "/upload"));
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + "-" + Math.rount(Math.random() * 1e9);
    callback(null, uniqueSuffix + file.originalname);
  },
});

const fileFilter = function (req, file, callback) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: fileFilter,
});

module.exports = upload;
