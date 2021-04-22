import {Router} from 'express'
import multer from '../libs/multer'
import {createPhoto, getPhotos, getPhoto, updatePhoto, deleteOne, deleteAll} from '../controller/photo.controller'

const router = Router();

router.route("/")
.get(getPhotos)
.post(multer.single('image'), createPhoto)
.delete(deleteAll);

router.route("/:id")
.get(getPhoto)
.put(updatePhoto)
.delete(deleteOne);

export default router;
