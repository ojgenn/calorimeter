import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CalorimeterPageComponent } from './calorimeter.page.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        RouterModule.forChild([{ path: '', component: CalorimeterPageComponent }]),
    ],
    declarations: [CalorimeterPageComponent],
})
export class CalorimeterModule {
}
