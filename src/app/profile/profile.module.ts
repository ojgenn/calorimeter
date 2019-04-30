import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { profileReducer } from './reducer/reducers/profile.reducer';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ProfileComponent, SignInComponent],
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule,
        ProfileRoutingModule,
        StoreModule.forFeature('profile', profileReducer),
        RouterModule.forChild([{ path: '', component: ProfileComponent }]),
        ReactiveFormsModule,
    ],
    providers: [AuthService],
})
export class ProfileModule {
    constructor(private _authService: AuthService) {}
}
