// middlewares/upload.ts
import multer from "multer";

const storage = multer.diskStorage({
  destination: "public/uploads",
  filename(req, file, callback) {
    const parts = file.originalname.split(".");
    const ext = parts[parts.length - 1];
    const fileName = `${file.originalname}-${Date.now()}.${ext}`;
    console.log(file.originalname);
    callback(null, fileName);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
});
