import mongoose from 'mongoose'
import db from './db.js';

const { Schema } = mongoose;

const userShcema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    alergias: {
        type: [],
        required: true
    }
})


const UserModel = db.model('user', userShcema)
export default UserModel;
