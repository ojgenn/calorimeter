import { SignIn, SignInFailure, SignInSuccess, SignOut, SignOutFailure, SignOutSuccess, SaveUserData } from './profile.actions';

export enum ActionTypes {
    SignIn = '[Profile] Sign In',
    SignInSuccess = '[Profile] Sign In Success',
    SignInFailure = '[Profile] Sign In Failure',
    SignOut = '[Profile] Sign Out',
    SignOutSuccess = '[Profile] Sign Out Success',
    SignOutFailure = '[Profile] Sign Out Failure',
    SaveUserData = '[Profile] Save User Data',
}


export type ProfileActions =
    | SignIn
    | SignInSuccess
    | SignInFailure
    | SignOut
    | SignOutFailure
    | SignOutSuccess
    | SaveUserData;
