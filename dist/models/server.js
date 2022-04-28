"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../routes/users"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
// server running up
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 8000;
        this.apiPaths = {
            users: '/api/users'
        };
        // start methods
        this.app = (0, express_1.default)();
        this.port = 8000;
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    ;
    // (if the db connection fails it throw an error)
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('The database is online.');
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    ;
    middlewares() {
        // CORS configuration
        this.app.use((0, cors_1.default)());
        // Reading body
        this.app.use(express_1.default.json());
        // Public folder declaration
        this.app.use(express_1.default.static('public'));
    }
    ;
    routes() {
        this.app.use(this.apiPaths.users, users_1.default);
    }
    ;
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server is running at port: " + this.port);
        });
    }
    ;
}
;
exports.default = Server;
//# sourceMappingURL=server.js.map