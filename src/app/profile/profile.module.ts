import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';

import {profileReducer} from './reducer/reducers/profile.reducer';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule,
        ProfileRoutingModule,
        StoreModule.forFeature('profile', profileReducer),
        RouterModule.forChild([{ path: '', component: ProfileComponent }]),
    ],
})
export class ProfileModule {
}
