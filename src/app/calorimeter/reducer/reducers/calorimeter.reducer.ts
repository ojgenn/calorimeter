import { ActionTypes, CalorimeterActions } from '../actions';
import { fuse } from '../../../shared/utils';

export interface State {
    dailyCalories: Array<any>; // ToDo: типизировать ['06/05/19']
}

export const initialState: State = {
    dailyCalories: [],
};

export function calorimeterReducer(
    state = initialState,
    action: CalorimeterActions,
): State {
    switch (action.type) {
        case ActionTypes.GetDailyCaloriesSuccess:
            console.log(action.payload);
            return fuse<State>(state, {
                dailyCalories: action.payload,
            });
        case ActionTypes.GetDailyCalories:
        default: {
            return state;
        }
    }
}

