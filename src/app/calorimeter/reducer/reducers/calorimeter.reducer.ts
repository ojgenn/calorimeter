import { ActionTypes, CalorimeterActions } from '../actions';
import { fuse } from '../../../shared/utils';
import { CalorimeterPurpose } from '../../commons/enums/calorimeter-purpose.enum';

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
            if (!action.payload) {
                return state;
            }
            return fuse<State>(state, {
                dailyCalories: action.payload,
            });
        case ActionTypes.GetDailyCalories:
        default: {
            return state;
        }
    }
}

export const getDailyCalories = (state: State) => state.dailyCalories;
