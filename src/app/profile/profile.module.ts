import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';

import {ProfileComponent} from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
    ProfileRoutingModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }])
  ]
})
export class ProfileModule { }
