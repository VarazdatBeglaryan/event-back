import mongoose from "mongoose";
import express from 'express';
import router from './API/api.js';

const app = express();
app.use(express.json());

const uri = "mongodb+srv://admin:admin@clusterforeventapp.wcivm6z.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then(result => {
        console.log('Connected to DB');
        app.use('/', router);
        app.listen(3000, () => {
            console.log('Listening on port: 3000');
        });
    })
    .catch(err => console.log('Some Error in DB'));
