import { Request, Response } from "express"
import User from "../models/user";

// calls to the database
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        // using the {} it returns an array
        res.json({users});
    } catch(e) {
        console.error(e)
        res.status(500).json({
            msg: 'Talk to an admin.'
        })
    }
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    // find the user by the primary id
    try {
        const users = await User.findByPk(id);
        if(users){
            res.json({users});
        } else {
            res.status(404).json({
                msg: `Non existing user with id ${id}.`
            })
        }
    } catch(e) {
        console.error(e)
        res.status(500).json({
            msg: 'Talk to an admin.'
        })
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        // duplicate check
        const mailExist = await User.findOne({
            where: {
                email: body.email
            }
        })
        // error message
        if(mailExist) {
            return res.status(400).json({
                msg: body.email + ' is being use.'
            })
        }
        const user = new User(body);
        await user.save();
        res.json({user})
    } catch(e) {
        console.error(e)
        res.status(500).json({
            msg: 'Talk to an admin.'
        })
    }
};

export const putUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    try {
        // find the user by id for updates
        const user = await User.findByPk(id);
        if(!user) {
            return res.status(404).json({
                msg: 'Non existing user with id: ' + id
            })
        }
        await user.update(body);
        res.json(user);
    } catch(e) {
        console.error(e)
        res.status(500).json({
            msg: 'Talk to an admin.'
        })
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // find the user by id for delete
        const user = await User.findByPk(id);
        if(!user) {
            return res.status(404).json({
                msg: 'Non existing user with id: ' + id
            })
        }
        // set the state: false to prevent lost reference. False means 0
        await user.update({state: false});
        await user.destroy();
        res.json({ msg: 'User deleted.' })
    } catch(e) {
        console.error(e)
        res.status(500).json({
            msg: 'Talk to an admin.'
        })
    }
};