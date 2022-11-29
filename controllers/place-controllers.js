const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAP_BOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const AppError = require("../utils/AppError");
const Place = require("../models/place");

const getPlaceById = async (req, res, next) => {
  const { pid } = req.params;
  try {
    const place = await Place.findById({ _id: pid });
    if (!place) {
      return next(new AppError(404, "Could not find any place"));
    }
    return res.status(200).json(place);
  } catch (error) {
    return next(new AppError(404, "Failed to load place, try again!"));
  }
};

const getPlaceByUserId = async (req, res, next) => {
  const { uid } = req.params;
  try {
    const places = await Place.find({ creator: uid }).populate("creator");
    if (!places || places.length === 0) {
      return next(new AppError(404, "No place exist for this user"));
    }
    return res.status(200).json(places);
  } catch (error) {
    return next(new AppError(404, "No such user exist"));
  }
};

const createPlace = async (req, res, next) => {
  const { title, description, address, creator } = req.body;
  const { path, filename } = req.file;
  let geoData;
  try {
    geoData = await geocoder
      .forwardGeocode({
        query: address,
        limit: 1,
      })
      .send();
  } catch (error) {
    return next(error);
  }

  const newPlace = new Place({
    title,
    description,
    image: path,
    fileName: filename,
    address,
    location: {
      lat: geoData.body.features[0].geometry.coordinates[1],
      lng: geoData.body.features[0].geometry.coordinates[0],
    },
    creator,
  });
  try {
    await newPlace.save();
    return res
      .status(201)
      .json({ message: "New place added", createdPlace: newPlace });
  } catch (error) {
    return next(new AppError(400, "Could't add place, try again!"));
  }
};

const updatePlace = async (req, res, next) => {
  const { title, description } = req.body;
  const { pid } = req.params;
  try {
    await Place.updateOne(
      { _id: pid },
      { $set: { title: title, description: description } }
    );
    return res.status(202).json({ message: "Updated successfully" });
  } catch (error) {
    return next(new AppError(400, "Could't update palace"));
  }
};

const deletePlace = async (req, res, next) => {
  const { pid } = req.params;
  try {
    await Place.deleteOne({ _id: pid });
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return next(new AppError(400, "Could't delete place"));
  }
};

module.exports = {
  getPlaceById,
  createPlace,
  getPlaceByUserId,
  updatePlace,
  deletePlace,
};
