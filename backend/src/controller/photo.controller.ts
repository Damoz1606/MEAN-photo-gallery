import {Request, Response} from 'express'
import Photo from '../database/photo.db'
import path from 'path'
import fs from 'fs-extra'
import photoDb from '../database/photo.db';

export async function getPhotos (req: Request, res: Response): Promise<Response> {
    try{
        const photos = await Photo.find({});
        return res.status(200).json({
            message: "Photos",
            photos
        });
    } catch(err){
        return res.status(500).json({
            message: "Error",
            error: err
        });
    }
}

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    try{
        const { id } = req.params;
        const response = await Photo.findById(id);
        return res.status(200).json({
            message: "Photo",
            response
        });
    } catch(err){
        return res.status(500).json({
            message: "Error",
            error: err
        });
    }
}

export async function createPhoto (req: Request, res: Response): Promise<Response> {
    try{
        const photo = {
            title: req.body.title,
            description: req.body.description,
            imagePath: req.file.path
        }
        const item = await Photo.create(photo);
        return res.status(200).json({message: "Image Saved", item});
    } catch(err){
        return res.status(500).json({
            message: "Error",
            error: err
        });
    }
}

export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const {title, description} = req.body;
        console.log(req.body);
        const response = await Photo.findByIdAndUpdate(id, {
            title,
            description
        }, { new: true });
        return res.status(200).json({
            message: "Photo Updated",
            response
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error",
            error: err
        });
    }
}

export async function deleteOne(req: Request, res: Response): Promise<Response> {
    try{
        const { id } = req.params;
        const response = await Photo.findByIdAndRemove(id);
        if(response) {
            await fs.unlink(path.resolve(response.imagePath));
        }
        return res.status(200).json({
            message: "Photo Delete",
            response
        });
    }catch(err){
        return res.status(500).json({
            message: "Error",
            error: err
        });
    }
}

export async function deleteAll(req: Request, res: Response): Promise<Response> {
    try{
        const response = await Photo.deleteMany({});
        if(response){
            await fs.rmdirSync(path.resolve("uploads"), { recursive: true});
        }
        return res.status(200).json({
            message: "Photos Delete",
            response
        });
    }catch(err){
        return res.status(500).json({
            message: "Error",
            error: err
        });
    }
}