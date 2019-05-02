import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';

import { CalorimeterPageComponent } from './calorimeter.page.component';
import { calorimeterReducer } from './reducer/reducers/calorimeter.reducer';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        StoreModule.forFeature('calorimeter', calorimeterReducer),
        RouterModule.forChild([{ path: '', component: CalorimeterPageComponent }]),
    ],
    declarations: [CalorimeterPageComponent],
})
export class CalorimeterModule {
}
