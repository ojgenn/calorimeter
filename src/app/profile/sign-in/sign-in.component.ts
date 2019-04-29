import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../services/auth.service';
import { authPending } from '../../reducer';
import { PendingStatuses } from '../../shared/enums/pending-statuses.enum';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  authPending$: Observable<PendingStatuses> = this._store.select(authPending);
  pendingStatuses = PendingStatuses;

  constructor(private _store: Store<any>, private _authService: AuthService) {}

  signIn() {
    this._authService.signIn();
  }
}
