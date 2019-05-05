import { Action } from '@ngrx/store';

import { ActionTypes } from './types';
import { SingleRecipeItem } from '../../commons/interfaces/single-recipe-item.interface';

export class GetRecipesSuccess {
    readonly type = ActionTypes.GetRecipesSuccess;

    constructor(public payload: Array<SingleRecipeItem>) {}
}

export class GetRecipes implements Action {
    readonly type = ActionTypes.GetRecipes;
}
