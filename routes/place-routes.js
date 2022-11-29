const express = require("express");
const router = express.Router();
const placeValidator = require("../middlewares/validation/place-validator");
const placeControllers = require("../controllers/place-controllers");
const isLoggedIn = require("../middlewares/Authentication/isLoggedIn");

const multer = require("multer");
const { storage, fileFilter } = require("../utils/cloudinary");

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/:pid", placeControllers.getPlaceById);
router.get("/user/:uid", isLoggedIn, placeControllers.getPlaceByUserId);
router.post(
  "/",
  isLoggedIn,
  upload.single("place_image"),
  placeValidator,
  placeControllers.createPlace
);
router.patch("/:pid", isLoggedIn, placeValidator, placeControllers.updatePlace);
router.delete("/:pid", isLoggedIn, placeControllers.deletePlace);

module.exports = router;
