import mongoose from 'mongoose';
import RecipeModel from './recipe.model.js';
import UserModel from './user.model.js';
import AllerModel from './allergies.model.js';

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

    static async getAller(email, password, alergias) {
        console.log(email)
        try {
            const user = await UserModel.findOne({ email });
            console.log(user.alergias)
            return user.alergias;
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

    static async deleteRecipes(email, recipeName) {
        console.log("deleteRecipes")
        try {
            const userRecipe = await RecipeModel.findOne({ email });
            const recipeIndex = userRecipe.recipes.findIndex(recipe => recipe.name === recipeName);
            userRecipe.recipes.splice(recipeIndex, 1);
            return await userRecipe.save();
        } catch (error) {
            throw error;
        }
    }

    static async getAllergiesObj() {
        console.log("getAllergiesObj")
        try {
            const aller = await AllerModel.findOne({ id: "a" });
            return aller.alergias
        } catch (error) {
            return false
        }
    }

    static async addAllerObj(aller) {
        console.log("addAllerObj")
        try {
            const allergies = await AllerModel.findOne({ id: "a" });
            for (var i = 0; i < allergies.alergias.length; i++) {
                console.log(aller)
                console.log(allergies.alergias[i])

                if (allergies.alergias[i].includes(aller)) {
                    console.log("the same")
                    return true;
                }
            }
            allergies.alergias.push(aller)
            return await allergies.save()
        } catch (error) {
            return false
        }
    }
    static async addAllergies(email, alergias) {
        try {
            const user = await UserModel.findOne({ email });
            const aller = user.alergias
            for (var i = 0; i < alergias.length; i++) {
                for (var j = 0; j < aller.length; j++) {
                    if (aller[j] == alergias[i]) {
                        alergias.splice(i, 1);
                    }
                }
            }
            for (var i = 0; i < alergias.length; i++) {
                user.alergias.push(alergias[i])
            }
            return await user.save();
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
