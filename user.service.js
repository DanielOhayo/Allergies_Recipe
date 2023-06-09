import mongoose from 'mongoose';
import RecipeModel from './recipe.model.js';
import UserModel from './user.model.js';


class UserService {

    static async registerUser(email, password, alergias) {
        console.log(email)
        try {
            const createUser = new UserModel({ email, password, alergias });
            return await createUser.save();
        } catch (error) {
            throw error;
        }
    }

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
        console.log(email)
        try {
            const createRecipe = new RecipeModel({ email, recipes });
            return await createRecipe.save();
        } catch (error) {
            throw error;
        }
    }

    static async addNewRecipePerUser(email, recipes) {
        try {
            const userRecipe = await RecipeModel.findOne({ email });
            userRecipe.recipes.push(recipes)
            return await userRecipe.save();
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
