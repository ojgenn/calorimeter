import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipesPageComponent } from './recipes.page.component';
import { TranslateModule } from '@ngx-translate/core';
import { RecipesModalComponent } from './recipes-modal/recipes-modal.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{ path: '', component: RecipesPageComponent }]),
        TranslateModule,
    ],
    declarations: [RecipesPageComponent, RecipesModalComponent],
    entryComponents: [RecipesModalComponent],
})
export class RecipesPageModule {
}
