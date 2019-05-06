import { GetRecipes, GetRecipesSuccess } from './recipes.actions';

export enum ActionTypes {
    GetRecipes = '[Recipes] Get Recipes',
    GetRecipesSuccess = '[Recipes] Get Recipes Success',
}


export type RecipesActions =
    | GetRecipes
    | GetRecipesSuccess;
