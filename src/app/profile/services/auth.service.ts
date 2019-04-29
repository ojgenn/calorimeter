import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Store } from '@ngrx/store';
import { auth } from 'firebase';

import * as AuthActions from '../reducer/actions/profile.actions';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    static readonly instance: AuthService;

    constructor(public afAuth: AngularFireAuth, private _store: Store<any>) {
        // @ts-ignore
        // noinspection TypeScriptUnresolvedVariable
        AuthService.instance = this;
    }

    signOut(): void {
        this._store.dispatch(new AuthActions.SignOut());
        this.afAuth.auth.signOut()
            .then(res => this._store.dispatch(new AuthActions.SignOutSuccess()))
            .catch(error => this._store.dispatch(new AuthActions.SignOutFailure()));
    }

    signIn(): void {
        this._store.dispatch(new AuthActions.SignIn());
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
            .then(res => this._store.dispatch(new AuthActions.SignInSuccess(res.user)))
            .catch(error => this._store.dispatch(new AuthActions.SignInFailure()));
    }
}
