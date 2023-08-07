import express from 'express';
import App from './servieces/ExpressApp';
import dbConnection from './servieces/Database';

const StartServer = async () => {
    const app = express();
    await dbConnection();
    const server = await App(app);
    server.listen(3000, () => {
        console.log('Server started on port 3000');
    });
};

StartServer();