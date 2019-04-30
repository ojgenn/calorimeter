import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { isLoggedIn } from '../reducer';
import { AuthService } from './services/auth.service';
import { ObservableHandler } from '../shared/models/observable-handler';
import { User } from 'firebase';
import { isNullOrUndefined } from '../shared/utils';
import * as ProfileActions from './reducer/actions';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
    isLoggedIn$: Observable<boolean> = this._store.select(isLoggedIn);
    private _getUser$$ = new ObservableHandler(
        this._authService.getUser(),
        this._prepareUser.bind(this),
        this._cdr,
    );

    constructor(private _authService: AuthService,
                private _cdr: ChangeDetectorRef,
                private _store: Store<any>) { }

    signOut() {
        this._authService.signOut();
    }

    private _prepareUser(user: User): void {
        if (isNullOrUndefined(user)) {
            this._store.dispatch(new ProfileActions.SignInFailure());
            return;
        }
        this._store.dispatch(new ProfileActions.SignInSuccess(user));
    }
}
