const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const AppError = require("./AppError");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileFilter = (req, file, cb) => {
  const acceptExtensions = ["jpeg", "png", "jpg"];
  const [type, extension] = file.mimetype.split("/");
  if (extension && acceptExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        400,
        "File Type not acceptable please choose file type 'jpeg','png','jpg'"
      ),
      false
    );
  }
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Destinations",
  },
});

module.exports = { storage, cloudinary, fileFilter };
