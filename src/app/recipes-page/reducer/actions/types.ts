import { AddRecipes, AddRecipesSuccess } from './recipes.actions';

export enum ActionTypes {
    AddRecipes = '[Recipes] Add Recipes',
    AddRecipesSuccess = '[Recipes] Add Recipes Success',
}


export type RecipesActions =
    | AddRecipes
    | AddRecipesSuccess;
