import mongoose from 'mongoose'
import db from './db.js';

const { Schema } = mongoose;

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

const RecipeModel = db.model('recipe', recipeShcema)
export default RecipeModel;

