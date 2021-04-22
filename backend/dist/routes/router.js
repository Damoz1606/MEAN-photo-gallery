"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../libs/multer"));
const photo_controller_1 = require("../controller/photo.controller");
const router = express_1.Router();
router.route("/")
    .get(photo_controller_1.getPhotos)
    .post(multer_1.default.single('image'), photo_controller_1.createPhoto)
    .delete(photo_controller_1.deleteAll);
router.route("/:id")
    .get(photo_controller_1.getPhoto)
    .put(photo_controller_1.updatePhoto)
    .delete(photo_controller_1.deleteOne);
exports.default = router;
