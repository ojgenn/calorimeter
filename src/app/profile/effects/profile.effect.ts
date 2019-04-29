import { Injectable } from '@angular/core';

import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { pipe } from 'rxjs';

import * as ProfileActions from '../reducer/actions/profile.actions';

import { AuthService } from '../services/auth.service';

@Injectable()
export class ProfileEffects {
    constructor(private _actions: Actions) {}

    @Effect()
    SignIn$ = this._actions.pipe(
        ofType(ProfileActions.ActionTypes.SignIn),
        pipe(
            switchMap(() => AuthService.instance.signIn2()
                .pipe(
                    map(res => {
                        console.log(res); return new ProfileActions.SignInSuccess(res.user);
                    })
                )
            ),
        )
    );
}
