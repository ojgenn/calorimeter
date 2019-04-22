import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { auth } from 'firebase/app';

import { isLoggedIn } from '../reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = this._store.select(isLoggedIn);
  constructor(private _store: Store<any>,
              public afAuth: AngularFireAuth) { }

  ngOnInit() {}

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(res => console.log(res));
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
