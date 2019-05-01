import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesPageComponent } from './recipes.page.component';
import { TranslateModule } from '@ngx-translate/core';
import { RecipesModalComponent } from './recipes-modal/recipes-modal.component';
import { RecipeComponent } from './recipe/recipe.component';

const COMPONENTS = [RecipesPageComponent, RecipesModalComponent, RecipeComponent];

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([{ path: '', component: RecipesPageComponent }]),
        TranslateModule,
    ],
    declarations: [COMPONENTS],
    entryComponents: [RecipesModalComponent],
})
export class RecipesPageModule {
}
