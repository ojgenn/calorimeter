// ToDo: разобраться с неймингом. никаких item  и т.д. ['06.05.2019']

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { safe } from '../../../../shared/utils';
import { SingleRecipeItem } from '../../../../recipes-page/commons/interfaces/single-recipe-item.interface';
import { RecipesSegments } from '../../../../recipes-page/commons/enums/recipes-segments.enum';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-calorimeter-single-item',
    templateUrl: './calorimeter-single-item.component.html',
    styleUrls: ['./calorimeter-single-item.component.scss'],
})
export class CalorimeterSingleItemComponent implements OnInit {
    @Input() set singleItem(item) {
        if (item) {
            this.item = this._prepareItem(item);
        }
    }

    @Output() deleteItem: EventEmitter<string> = new EventEmitter();

    id: string;
    item: { name: string, calories: number }; // ToDo: типизировать

    constructor(private _afs: AngularFirestore) { }

    static getCalories(quantity: number, recipe: SingleRecipeItem) {
        if (!recipe) {
            return quantity;
        }
        switch (recipe.type) {
            case RecipesSegments.Products:
                return (Number(quantity) * Number(recipe.calories)) / 100;
            case RecipesSegments.Sport:
                return Number(quantity) * Number(recipe.calories);
        }
    }

    ngOnInit() {}

    delete() {
        this.deleteItem.emit(this.id);
    }

    private _prepareItem(currentItem) {
        this.id = currentItem.id;
        if (safe(() => currentItem.item.recipe.id)) {
            const currentRecipe = currentItem.recipes.find(recipe => {
                return recipe.id === currentItem.item.recipe.id;
            });
            if (currentRecipe) {
                currentItem.item.recipe = currentRecipe;
            }
        }
        return {
            name: safe(() => currentItem.item.recipe.name) ? currentItem.item.recipe.name : 'Без названия',
            calories: Math.round(CalorimeterSingleItemComponent.getCalories(currentItem.item.quantity, currentItem.item.recipe)),
        };
    }

}
