import { Action } from '@ngrx/store';
import { User } from 'firebase';

export enum ActionTypes {
    SignIn = '[Profile] Sign In',
    SignInSuccess = '[Profile] Sign In Success',
    SignInFailure = '[Profile] Sign In Failure',
    SignOut = '[Profile] Sign Out',
    SignOutSuccess = '[Profile] Sign Out Success',
    SignOutFailure = '[Profile] Sign Out Failure',
}

export class SignInSuccess implements Action {
    readonly type = ActionTypes.SignInSuccess;

    constructor(public payload: User) {}
}

export class SignInFailure implements Action {
    readonly type = ActionTypes.SignInFailure;
}

export class SignIn implements Action {
    readonly type = ActionTypes.SignIn;
}

export class SignOutSuccess implements Action {
    readonly type = ActionTypes.SignOutSuccess;
}

export class SignOutFailure implements Action {
    readonly type = ActionTypes.SignOutFailure;
}

export class SignOut implements Action {
    readonly type = ActionTypes.SignOut;
}



export type ProfileActions =
    | SignIn
    | SignInSuccess
    | SignInFailure
    | SignOut
    | SignOutFailure
    | SignOutSuccess;
