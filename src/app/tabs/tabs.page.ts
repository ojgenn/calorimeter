import { Component } from '@angular/core';

import {Store} from '@ngrx/store';

import { isLoggedIn } from '../reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isLoggedIn$: Observable<boolean> = this._store.select(isLoggedIn);
  constructor(private _store: Store<any>) {}
}
