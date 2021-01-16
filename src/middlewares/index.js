import jwt from 'jsonwebtoken'
require('dotenv/config')
import { jwtSecret } from '../config'
import mongoose from "mongoose";
const User = mongoose.model("Users");
module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401).json({ error: 'Invalid User' })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, jwtSecret, (err, payload) => {
        if (err) {
            return res.status(400).json({ error: 'you must be logged in ' })
        }
        const { _id } = payload
        User.findById(_id).then(userdata => {
            req.user = userdata
            next();
        })
    })
}