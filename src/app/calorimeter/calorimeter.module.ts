import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';

import { CalorimeterPageComponent } from './calorimeter.page.component';
import { calorimeterReducer } from './reducer/reducers/calorimeter.reducer';
import { CalorimeterHeaderComponent } from './calorimeter-header/calorimeter-header.component';
import { CalorimeterMainContentComponent } from './calorimeter-main-content/calorimeter-main-content.component';
import { CalorimeterSingleListComponent } from './calorimeter-main-content/calorimeter-single-list/calorimeter-single-list.component';
import {
    CalorimeterSingleItemComponent,
} from './calorimeter-main-content/calorimeter-single-list/calorimeter-single-item/calorimeter-single-item.component';
import { CalorimeterModalComponent } from './calorimeter-modal/calorimeter-modal.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { EffectsModule } from '@ngrx/effects';
import { CalorimeterEffects } from './effects/calorimeter.effects';
import { CalorimeterService } from './services/calorimeter.service';

const COMPONENTS = [
    CalorimeterPageComponent,
    CalorimeterHeaderComponent,
    CalorimeterMainContentComponent,
    CalorimeterSingleListComponent,
    CalorimeterSingleItemComponent,
    CalorimeterModalComponent,
];

const IMPORTS = [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicSelectableModule,
    EffectsModule.forRoot([CalorimeterEffects]),
    StoreModule.forFeature('calorimeter', calorimeterReducer),
    RouterModule.forChild([{ path: '', component: CalorimeterPageComponent }]),
];

@NgModule({
    imports: [IMPORTS],
    declarations: [COMPONENTS],
    entryComponents: [CalorimeterModalComponent],
    providers: [CalorimeterService]
})

export class CalorimeterModule {
    constructor(private _calorimeterService: CalorimeterService) {}
}
