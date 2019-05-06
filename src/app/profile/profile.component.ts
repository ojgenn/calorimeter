import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { User } from 'firebase';
import { Store } from '@ngrx/store';

import * as ProfileActions from './reducer/actions';

import { isLoggedIn } from '../reducer';
import { AuthService } from './services/auth.service';
import { ObservableHandler } from '../shared/models/observable-handler';
import { isNullOrUndefined, safeDetectChanges } from '../shared/utils';
import { gender, Gender } from './commons/gender.model';
import { load, Load } from './commons/load.model';

export interface UserData {
    age: number;
    gender: Gender;
    weight: number;
    height: number;
    load: Load;
    consumption?: number;
}

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
    isLoggedIn$$ = new ObservableHandler(
        this._store.select(isLoggedIn),
        this._initUserData.bind(this),
        this._cdr,
    );

    userDataFormGroup: FormGroup = ProfileComponent.initFormGroup();
    formGender = gender.asArray;
    formLoad = load.asArray;
    showSpinner = false;

    private _getUser$$ = new ObservableHandler(
        this._authService.getUser(),
        this._prepareUser.bind(this),
        this._cdr,
    );

    constructor(private _authService: AuthService,
                private _cdr: ChangeDetectorRef,
                private _storage: Storage,
                private _store: Store<any>) { }

    static initFormGroup(userData?: UserData): FormGroup {
        return new FormGroup(
            {
                age: new FormControl((isNullOrUndefined(userData)) ? '' : userData.age,
                    [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]),
                gender: new FormControl((isNullOrUndefined(userData)) ? Gender.Male : userData.gender,
                    [Validators.required]),
                weight: new FormControl((isNullOrUndefined(userData)) ? '' : userData.weight,
                    [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]),
                height: new FormControl((isNullOrUndefined(userData)) ? '' : userData.height,
                    [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]),
                load: new FormControl((isNullOrUndefined(userData)) ? Load.Base : userData.load,
                    [Validators.required]),
            },
        );
    }

    static getConsumption(userData: UserData): number {
        let BMR;
        if (userData.gender === Gender.Male) {
            BMR = 88.362 + (13.397 * userData.weight) + (4.799 * userData.height) - (5.677 * userData.age);
        } else {
            BMR = 447.593 + (9.247 * userData.weight) + (3.098 * userData.height) - (4.330 * userData.age);
        }

        switch (userData.load) {
            case Load.Base:
                return BMR * 1.2;
            case Load.ThreeDays:
                return BMR * 1.375;
            case Load.FiveDays:
                return BMR * 1.55;
            case Load.FiveDaysIntensive:
                return BMR * 1.6;
            case Load.EveryDay:
                return BMR * 1.725;
            case Load.EveryDayIntensive:
                return BMR * 1.9;
            case Load.EveryDayAndWork:
                return BMR * 2.5;
        }
    }

    signOut() {
        this._authService.signOut();
    }

    save(): void {
        this.showSpinner = true;
        const userData: UserData = {
            age: parseInt(this.userDataFormGroup.controls['age'].value, 10),
            gender: this.userDataFormGroup.controls['gender'].value,
            weight: parseInt(this.userDataFormGroup.controls['weight'].value, 10),
            height: parseInt(this.userDataFormGroup.controls['height'].value, 10),
            load: this.userDataFormGroup.controls['load'].value,
        };
        this._prepareAndStoreUserData(userData);
        this._storage.set('userData', userData)
            .finally(() => {
                setTimeout(() => {
                    this.showSpinner = false;
                    safeDetectChanges(this._cdr);
                }, 500);
            });
    }

    private _prepareUser(user: User): void {
        if (isNullOrUndefined(user)) {
            this._store.dispatch(new ProfileActions.SignInFailure());
            return;
        }
        this._store.dispatch(new ProfileActions.SignInSuccess(user));
    }

    private _initUserData(isUserLogged: boolean): void {
        if (isUserLogged) {
            this._storage.get('userData')
                .then(userData => {
                    if (!!userData) {
                        this._prepareAndStoreUserData(userData);
                        this.userDataFormGroup = ProfileComponent.initFormGroup(userData);
                        safeDetectChanges(this._cdr);
                    }
                });
        }
    }

    private _prepareAndStoreUserData(userData: UserData): UserData {
        userData.consumption = ProfileComponent.getConsumption(userData);
        this._store.dispatch(new ProfileActions.SaveUserData(userData));
        return userData;
    }
}
