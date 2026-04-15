import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.uploadFolder || "others";

    const uploadPath = `uploads/${folder}`;

    // auto create folder
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, fileName);
  },
});

export const upload = multer({ storage });