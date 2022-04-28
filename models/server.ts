import express, { Application } from 'express';
import userRoutes from '../routes/users';
import cors from 'cors';
import db from '../db/connection';

// server running up
class Server {
    private app = express();
    private port = process.env.PORT || 8000;
    private apiPaths = {
        users: '/api/users'
    };

    constructor() {
        // start methods
        this.app = express();
        this.port = 8000;
        this.dbConnection();
        this.middlewares();
        this.routes();
    };

    // (if the db connection fails it throw an error)
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('The database is online.');
        } catch(e) {
            console.error(e);
        }
    };

    middlewares() {
        // CORS configuration
        this.app.use(cors())
        // Reading body
        this.app.use(express.json())
        // Public folder declaration
        this.app.use(express.static('public'));
    };

    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server is running at port: " + this.port);
        })
    };
};

export default Server;