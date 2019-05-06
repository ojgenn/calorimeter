import { ActionTypes, CalorimeterActions } from '../actions';
import { fuse } from '../../../shared/utils';
import { Dictionary } from '../../../shared/interfaces/dictionary.interface';
import { DailyCalorie } from '../../commons/interfaces/daily-calorie.interface';

export interface State {
    dailyCalories: Array<Dictionary<DailyCalorie>>;
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
