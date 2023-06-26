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
            return false
        }
    }

    static async checkRecipe(email) {
        console.log("in checkRecipe")
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

    static async getRecipes(email) {
        try {
            const userRecipe = await RecipeModel.findOne({ email });
            console.log(userRecipe.recipes)
            return userRecipe.recipes
        } catch (error) {
            return []
        }
    }
}

export default UserService;
