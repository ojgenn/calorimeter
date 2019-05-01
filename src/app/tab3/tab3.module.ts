import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { Tab3Page } from './tab3.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        RouterModule.forChild([{ path: '', component: Tab3Page }]),
    ],
    declarations: [Tab3Page],
})
export class Tab3PageModule {
}
