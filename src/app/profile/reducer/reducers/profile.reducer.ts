import { User } from 'firebase';
import { PendingStatuses } from '../../../shared/enums/pending-statuses.enum';
import { fuse } from '../../../shared/utils';
import { ActionTypes, ProfileActions } from '../actions/types';
import { UserData } from '../../profile.component';

export interface State {
    isLoggedIn: boolean;
    user: User;
    authPending: PendingStatuses;
    userData?: UserData;
}

export const initialState: State = {
    isLoggedIn: false,
    user: null,
    authPending: null,
    userData: null,
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
            return fuse<State>(initialState, {
                authPending: PendingStatuses.Error,
            });
        case ActionTypes.SignOut:
            return fuse<State>(state, {
                authPending: PendingStatuses.Pending,
            });
        case ActionTypes.SignOutSuccess:
            return fuse<State>(initialState, {
                authPending: PendingStatuses.Success,
            });
        case ActionTypes.SignOutFailure:
            return fuse<State>(state, {
                authPending: PendingStatuses.Error,
            });
        case ActionTypes.SaveUserData:
            return fuse<State>(state, {
                userData: action.payload,
            });
        default: {
            return state;
        }
    }
}

export const selectIsLoggedIn = (state: State) => state.isLoggedIn;
export const authPending = (state: State) => state.authPending;
export const user = (state: State) => state.user;
