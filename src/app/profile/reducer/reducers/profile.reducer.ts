import { ActionTypes, ProfileActions } from '../actions/profile.actions';

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
        case ActionTypes.SignIn:
            return state;
        case ActionTypes.SignInSuccess:
            console.log(action.payload);
            return state;
        case ActionTypes.SignInFailure:
        default: {
            return state;
        }
    }
}

export const selectIsLoggedIn = (state: State) => state.isLoggedIn;
