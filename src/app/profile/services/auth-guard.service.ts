import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as ProfileActions from '../reducer/actions/profile.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import { catchError, map } from 'rxjs/operators';
import { User } from 'firebase';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _store: Store<any>,
                private _afAuth: AngularFireAuth,
                private _router: Router) {}

    canActivate(): Observable<boolean> {
        let isLoggedIn = true;

        return this._afAuth.user.pipe(
            map(
                (response: User) => {
                    if (!response) {
                        isLoggedIn = false;

                        this._userInUnauthorized();
                    }
                    return isLoggedIn;
                },
            ),
            catchError(() => {

                this._userInUnauthorized();

                return of(false);
            }),
        );
    }

    private _userInUnauthorized(): void {
        this._store.dispatch(new ProfileActions.SignInFailure());
        this._router.navigate(['tabs', 'profile']).catch();
    }
}
