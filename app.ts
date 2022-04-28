import dotenv from 'dotenv';
import Server from './models/server';

// dotenv config
dotenv.config();

const server = new Server();

// server instance
server.listen();