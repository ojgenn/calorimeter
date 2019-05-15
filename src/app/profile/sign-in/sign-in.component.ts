import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { authPending } from '../../reducer';
import { PendingStatuses } from '../../shared/enums/pending-statuses.enum';

enum authPurposeEnum {
  Auth = 'auth',
  Register = 'register',
}

function confirmPasswordValidation(
    control: FormGroup
): { [key: string]: any } | null {
  if (!control.get('confirmPassword')) {
    return null;
  }
  const valid = control.get('password').value === control.get('confirmPassword').value;
  return valid
      ? null
      : { invalidConfirmPassword: { valid: false, value: control.value } };
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  authPending$: Observable<PendingStatuses> = this._store.select(authPending);
  pendingStatuses = PendingStatuses;
  authForm: FormGroup = this._initAuthFormGroup();
  authPurpose = authPurposeEnum;
  signInChecker: authPurposeEnum = this.authPurpose.Auth;

  constructor(private _store: Store<any>,
              private _authService: AuthService,
              private _formBuilder: FormBuilder) {}

  signIn() {
    switch (this.signInChecker) {
      case authPurposeEnum.Auth:
        console.log('sign-in')
        break;
      case authPurposeEnum.Register:
        this._authService.signUp({
          email: this.authForm.controls.email.value,
          password: this.authForm.controls.password.value,
        }).subscribe(res => console.log(res));
        break;
    }
  }

  segmentChanged(ev: any): void {
    switch (ev.detail.value) {
      case this.authPurpose.Auth:
        this.signInChecker = this.authPurpose.Auth;
        if (this.authForm.controls.confirmPassword) {
          this.authForm.removeControl('confirmPassword');
        }
        break;
      case this.authPurpose.Register:
        this.signInChecker = this.authPurpose.Register;
        if (!this.authForm.controls.confirmPassword) {
          this.authForm.addControl('confirmPassword',
              new FormControl('',
                  [Validators.required, Validators.minLength(5)]));
        }
        break;
    }
  }

  private _initAuthFormGroup(): FormGroup {
    return this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    }, {validators: confirmPasswordValidation});
  }
}

