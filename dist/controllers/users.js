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
exports.deleteUser = exports.putUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
// calls to the database
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        // using the {} it returns an array
        res.json({ users });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Talk to an admin.'
        });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // find the user by the primary id
    try {
        const users = yield user_1.default.findByPk(id);
        if (users) {
            res.json({ users });
        }
        else {
            res.status(404).json({
                msg: `Non existing user with id ${id}.`
            });
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Talk to an admin.'
        });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        // duplicate check
        const mailExist = yield user_1.default.findOne({
            where: {
                email: body.email
            }
        });
        // error message
        if (mailExist) {
            return res.status(400).json({
                msg: body.email + ' is being use.'
            });
        }
        const user = new user_1.default(body);
        yield user.save();
        res.json({ user });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Talk to an admin.'
        });
    }
});
exports.createUser = createUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        // find the user by id for updates
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: 'Non existing user with id: ' + id
            });
        }
        yield user.update(body);
        res.json(user);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Talk to an admin.'
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // find the user by id for delete
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: 'Non existing user with id: ' + id
            });
        }
        // set the state: false to prevent lost reference. False means 0
        yield user.update({ state: false });
        yield user.destroy();
        res.json({ msg: 'User deleted.' });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Talk to an admin.'
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map