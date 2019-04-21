import { ProfileActions } from '../actions/profile.actions';

export interface State {
    isLoggedIn: boolean;
}

export const initialState: State = {
    isLoggedIn: false,
};

export function profileReducer(
    state = initialState,
    action: ProfileActions,
): State {
    switch (action.type) {
        default: {
            return state;
        }
    }
}
