const multer = require("multer");

const storage = multer.memoryStorage(); // store file in memory (not disk)

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per image
});

module.exports = upload;
