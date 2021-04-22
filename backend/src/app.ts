import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import indexroutes from './routes/router'
import path from 'path'

import { mongoURL, PORT } from './config/config'

const app = express();

//database
mongoose.connect(mongoURL(), {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Mongo connect");
})
.catch(err => {
    console.log(err);
});

//settings
app.set("port", PORT());

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded( {extended: true}));
app.use(express.json());

//routes
app.use("/api", indexroutes);

//static
app.use('/uploads', express.static(path.resolve("uploads")));

export default app;