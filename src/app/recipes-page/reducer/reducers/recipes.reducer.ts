import { ActionTypes, RecipesActions } from '../actions/types';
import { SingleRecipeItem } from '../../commons/interfaces/single-recipe-item.interface';
import { fuse } from '../../../shared/utils';

export interface State {
    products: Array<SingleRecipeItem>;
    sport: Array<SingleRecipeItem>;
}

export const initialState: State = {
    products: [],
    sport: [],
};

export function recipesReducer(
    state = initialState,
    action: RecipesActions,
): State {
    switch (action.type) {
        case ActionTypes.AddRecipesSuccess:
            if (!action.payload || action.payload.length === 0) {
                return state;
            }
            const type = action.payload[0].type;
            return fuse<State>(state, {
                [type]: action.payload,
            });
        case ActionTypes.AddRecipes:
        default: {
            return state;
        }
    }
}

export const products = (state: State) => state.products;
export const sport = (state: State) => state.sport;
