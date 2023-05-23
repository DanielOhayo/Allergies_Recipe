import mongoose from 'mongoose';
import RecipeModel from './user.model.js';

class UserService {
    // static async registerUser(email, password) {
    //     try {
    //         const createUser = new UserModel({ email, password });
    //         return await createUser.save();
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // static async checkUser(email) {
    //     try {
    //         return await UserModel.findOne({ email });
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // static async editUserAudioFile(email, audioFile) {
    //     try {
    //         console.log(email + " " + audioFile)
    //         const user = UserModel.findOne({ email })
    //         await user.updateOne({ $set: { audioFile } });
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    static async checkRecipe(email) {
        try {
            return await RecipeModel.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    static async addRecipePerUser(email, recipes) {
        try {
            const createRecipe = new RecipeModel({ email, recipes });
            return await createRecipe.save();
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
