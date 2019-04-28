import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { isLoggedIn } from '../reducer';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    isLoggedIn$: Observable<boolean> = this._store.select(isLoggedIn);

    constructor(private _authService: AuthService,
                private _store: Store<any>,
                public afAuth: AngularFireAuth) { }

    ngOnInit() {
    }

    login() {
        this._authService.signIn();
    }

    logout() {
        this._authService.signOut();
    }
}
