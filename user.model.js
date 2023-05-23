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
    }
})

const recipeShcema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    recipes: {
        type: [
            {
                name: String,
                text: String
            }
        ],
        required: true
    }
})

// const UserModel = db.model('user', userShcema)
const RecipeModel = db.model('recipe', recipeShcema)
export default RecipeModel;
// module.exports = UserModel;
