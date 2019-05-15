import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Store } from '@ngrx/store';
import { auth, User } from 'firebase';

import * as ProfileActions from '../reducer/actions/index';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    static readonly instance: AuthService;

    constructor(public afAuth: AngularFireAuth, private _store: Store<any>, private _http: HttpClient) {
        // @ts-ignore
        // noinspection TypeScriptUnresolvedVariable
        AuthService.instance = this;
    }

    signOut(): void {
        this._store.dispatch(new ProfileActions.SignOut());
        this.afAuth.auth.signOut()
            .then(res => this._store.dispatch(new ProfileActions.SignOutSuccess()))
            .catch(error => this._store.dispatch(new ProfileActions.SignOutFailure()));
    }

    // signIn(): void {
    //     this._store.dispatch(new ProfileActions.SignIn());
    //     this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    //         .then(res => this._store.dispatch(new ProfileActions.SignInSuccess(res.user)))
    //         .catch(error => this._store.dispatch(new ProfileActions.SignInFailure()));
    // }

    signUp(body): Observable<any> {
        return this._http.post('http://localhost:8080/auth/sign-up', body);
    }

    getUser(): Observable<User> {
        this._store.dispatch(new ProfileActions.SignIn());
        return this.afAuth.user;
    }
}
