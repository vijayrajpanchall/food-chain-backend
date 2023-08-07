import mongoose from 'mongoose';
import { MONGO_URI } from '../config';



export default async () => {
    try {
        //connect to db
        mongoose
            .connect(MONGO_URI, {})
            .then(() => {
                console.log("Connected to MongoDB");
            })
            .catch((err) => {
                console.error("Failed to connect to MongoDB", err);
            });
    } catch (error) {
        console.log(error);
    }

}