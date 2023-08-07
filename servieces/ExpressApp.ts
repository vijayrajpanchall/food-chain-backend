import express,{ Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { AdminRoute, VandorRoute } from '../routes';

export default async (app: Application) => {    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'images')));
    
    app.use('/admin', AdminRoute);
    app.use('/vandor', VandorRoute);

    return app;
}