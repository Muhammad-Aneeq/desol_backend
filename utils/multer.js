import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory where files will be stored temporarily
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original file name
  },
});

const upload = multer({ storage: storage });

export default upload;
