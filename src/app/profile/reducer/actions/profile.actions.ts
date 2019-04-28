import { Action } from '@ngrx/store';
import { User } from 'firebase';

export enum ActionTypes {
    SignIn = '[Profile] Sign In',
    SignInSuccess = '[Profile] Sign In Success',
    SignInFailure = '[Profile] Sign In Failure',
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

export type ProfileActions =
    | SignIn
    | SignInSuccess
    | SignInFailure;
