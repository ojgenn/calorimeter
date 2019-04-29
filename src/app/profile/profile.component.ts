import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { isLoggedIn } from '../reducer';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
    isLoggedIn$: Observable<boolean> = this._store.select(isLoggedIn);

    constructor(private _authService: AuthService,
                public afAuth: AngularFireAuth,
                private _store: Store<any>) { }

    signOut() {
        this._authService.signOut();
    }
}
