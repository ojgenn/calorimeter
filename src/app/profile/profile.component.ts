import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { isLoggedIn } from '../reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = this._store.select(isLoggedIn);
  constructor(private _store: Store<any>) { }

  ngOnInit() {}

}
