"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAll = exports.deleteOne = exports.updatePhoto = exports.createPhoto = exports.getPhoto = exports.getPhotos = void 0;
const photo_db_1 = __importDefault(require("../database/photo.db"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
async function getPhotos(req, res) {
    try {
        const photos = await photo_db_1.default.find({});
        return res.status(200).json({
            message: "Photos",
            photos
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error",
            error: err
        });
    }
}
exports.getPhotos = getPhotos;
async function getPhoto(req, res) {
    try {
        const { id } = req.params;
        const response = await photo_db_1.default.findById(id);
        return res.status(200).json({
            message: "Photo",
            response
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error",
            error: err
        });
    }
}
exports.getPhoto = getPhoto;
async function createPhoto(req, res) {
    try {
        const photo = {
            title: req.body.title,
            description: req.body.description,
            imagePath: req.file.path
        };
        const item = await photo_db_1.default.create(photo);
        return res.status(200).json({ message: "Image Saved", item });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error",
            error: err
        });
    }
}
exports.createPhoto = createPhoto;
async function updatePhoto(req, res) {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        console.log(req.body);
        const response = await photo_db_1.default.findByIdAndUpdate(id, {
            title,
            description
        }, { new: true });
        return res.status(200).json({
            message: "Photo Updated",
            response
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error",
            error: err
        });
    }
}
exports.updatePhoto = updatePhoto;
async function deleteOne(req, res) {
    try {
        const { id } = req.params;
        const response = await photo_db_1.default.findByIdAndRemove(id);
        if (response) {
            await fs_extra_1.default.unlink(path_1.default.resolve(response.imagePath));
        }
        return res.status(200).json({
            message: "Photo Delete",
            response
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error",
            error: err
        });
    }
}
exports.deleteOne = deleteOne;
async function deleteAll(req, res) {
    try {
        const response = await photo_db_1.default.deleteMany({});
        if (response) {
            await fs_extra_1.default.rmdirSync(path_1.default.resolve("uploads"), { recursive: true });
        }
        return res.status(200).json({
            message: "Photos Delete",
            response
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error",
            error: err
        });
    }
}
exports.deleteAll = deleteAll;
