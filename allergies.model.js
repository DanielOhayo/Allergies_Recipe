import mongoose from 'mongoose'
import db from './db.js';

const { Schema } = mongoose;

const allergiesSchema = new Schema({
    id: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    alergias: {
        type: [],
        required: true
    }
})

const AllerModel = db.model('allergies', allergiesSchema)
export default AllerModel;

