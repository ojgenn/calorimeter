import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'firebase';
import { RecipeModalMode } from '../commons/enums/recipe-modal-mode.enum';
import { SingleRecipeItem } from '../commons/interfaces/single-recipe-item.interface';
import { RecipesSegments } from '../commons/enums/recipes-segments.enum';

interface RecipesModalData {
    activeSegment: RecipesSegments;
    uid: User['uid'];
    recipeModalMode: RecipeModalMode;
    recipe: SingleRecipeItem;
}

@Component({
    selector: 'app-recipes-modal',
    templateUrl: './recipes-modal.component.html',
    styleUrls: ['./recipes-modal.component.scss'],
})
export class RecipesModalComponent {

    @Input() set data(data: RecipesModalData) {
        this.recipe = data.recipe;
        this.recipeModalMode = data.recipeModalMode;
        this._itemsCollection = this._afs.collection(data.uid);
        this.recipeSegment = data.activeSegment;
        this.recipeModalForm = this._initRecipeModalForm();
    }

    recipesSegments = RecipesSegments;
    recipeModalForm: FormGroup;
    recipeSegment: RecipesSegments;
    recipeModals = RecipeModalMode;
    recipeModalMode: RecipeModalMode;
    recipe: SingleRecipeItem;

    private _itemsCollection: AngularFirestoreCollection;

    constructor(private _modalCtrl: ModalController,
                private _afs: AngularFirestore) { }

    close(): void {
        this._modalCtrl.dismiss().catch();
    }

    save(): void {
        const collection = {
            type: this.recipeModalForm.controls['type'].value,
            name: this.recipeModalForm.controls['name'].value,
            calories: this.recipeModalForm.controls['calories'].value,
        };

        if (this.recipeModalMode === RecipeModalMode.Create) {
            this._itemsCollection
                .doc('my_products')
                .collection(this.recipeSegment)
                .add(collection)
                .then(res => this.close())
                .catch(); // ToDo: Добавить вывод ошибки ['01.05.2019']
            return;
        }
        this._modalCtrl.dismiss({ collection, id: this.recipe.id }).catch();
    }

    private _initRecipeModalForm(): FormGroup {
        return new FormGroup({
            type: new FormControl(this.recipe ? this.recipe.type : this.recipeSegment),
            name: new FormControl({
                value: this.recipe ? this.recipe.name : '',
                disabled: this.recipeModalMode === RecipeModalMode.Show,
            }, [Validators.required]),
            calories: new FormControl({
                value: this.recipe ? this.recipe.calories : '',
                disabled: this.recipeModalMode === RecipeModalMode.Show,
            }, [Validators.required, Validators.pattern('^[0-9]*$')]),
        });
    }
}
