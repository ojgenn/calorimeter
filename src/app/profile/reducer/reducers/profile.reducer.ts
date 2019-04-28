import { User } from 'firebase';

import { ActionTypes, ProfileActions } from '../actions/profile.actions';
import { PendingStatuses } from '../../../shared/enums/pending-statuses.enum';
import { fuse } from '../../../shared/utils';

export interface State {
    isLoggedIn: boolean;
    user: User;
    authPending: PendingStatuses;
}

export const initialState: State = {
    isLoggedIn: false,
    user: null,
    authPending: null,
};

export function profileReducer(
    state = initialState,
    action: ProfileActions,
): State {
    switch (action.type) {
        case ActionTypes.SignIn:
            return fuse<State>(state, {
                authPending: PendingStatuses.Pending,
            });
        case ActionTypes.SignInSuccess:
            return fuse<State>(state, {
                isLoggedIn: true,
                user: action.payload,
                authPending: PendingStatuses.Success,
            });
        case ActionTypes.SignInFailure:
            return fuse<State>(state, {
                isLoggedIn: false,
                user: null,
                authPending: PendingStatuses.Error,
            });
        case ActionTypes.SignOut:
            return fuse<State>(state, {
                authPending: PendingStatuses.Pending,
            });
        case ActionTypes.SignOutSuccess:
            return fuse<State>(state, {
                isLoggedIn: false,
                user: null,
                authPending: PendingStatuses.Success,
            });
        case ActionTypes.SignOutFailure:
            return fuse<State>(state, {
                authPending: PendingStatuses.Error,
            });
        default: {
            return state;
        }
    }
}

export const selectIsLoggedIn = (state: State) => state.isLoggedIn;
