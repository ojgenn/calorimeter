import { CalorimeterActions } from '../actions/types';

export interface State {
    test: boolean;
}

export const initialState: State = {
    test: null
};

export function calorimeterReducer(
    state = initialState,
    action: CalorimeterActions,
): State {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

