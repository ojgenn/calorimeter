import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';

import { RecipesPageComponent } from './recipes.page.component';
import { RecipesModalComponent } from './recipes-modal/recipes-modal.component';
import { RecipeComponent } from './recipe/recipe.component';
import { recipesReducer } from './reducer/reducers/recipes.reducer';

const COMPONENTS = [RecipesPageComponent, RecipesModalComponent, RecipeComponent];

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('recipes', recipesReducer),
        RouterModule.forChild([{ path: '', component: RecipesPageComponent }]),
        TranslateModule,
    ],
    declarations: [COMPONENTS],
    entryComponents: [RecipesModalComponent],
})
export class RecipesPageModule {
}
