import { Action } from '@ngrx/store';

import { ActionTypes } from './types';
import { SingleRecipeItem } from '../../commons/interfaces/single-recipe-item.interface';

export class AddRecipesSuccess {
    readonly type = ActionTypes.AddRecipesSuccess;

    constructor(public payload: Array<SingleRecipeItem>) {}
}

export class AddRecipes implements Action {
    readonly type = ActionTypes.AddRecipes;
}
