import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { safe } from '../../../../shared/utils';
import { SingleRecipeItem } from '../../../../recipes-page/commons/interfaces/single-recipe-item.interface';
import { RecipesSegments } from '../../../../recipes-page/commons/enums/recipes-segments.enum';
import { AngularFirestore } from '@angular/fire/firestore';
import { DailyCalorie } from '../../../commons/interfaces/daily-calorie.interface';

interface SingleDailyCalorie {
    item: DailyCalorie;
    recipes: Array<SingleRecipeItem>;
    enableEditItems: boolean;
}

@Component({
    selector: 'app-calorimeter-single-item',
    templateUrl: './calorimeter-single-item.component.html',
    styleUrls: ['./calorimeter-single-item.component.scss'],
})
export class CalorimeterSingleItemComponent {
    @ViewChild('slidingItem') private _slidingItem;
    @Input() set singleItem(currentItem: SingleDailyCalorie) {
        if (currentItem) {
            this.id = currentItem.item.id;
            this.item = this._prepareItem(currentItem);
            this.enableEditItems = currentItem.enableEditItems;
        }
    }

    @Output() deleteItem: EventEmitter<string> = new EventEmitter();

    id: string;
    item: { name: string, calories: number };
    enableEditItems = false;

    constructor(private _afs: AngularFirestore) { }

    static getCalories(quantity: number, recipe: SingleRecipeItem) {
        if (!recipe) {
            return Number(quantity);
        }
        switch (recipe.type) {
            case RecipesSegments.Products:
                return (Number(quantity) * Number(recipe.calories)) / 100;
            case RecipesSegments.Sport:
                return Number(quantity) * Number(recipe.calories);
        }
    }

    delete(): void {
        this.deleteItem.emit(this.id);
        setTimeout(() => this._slidingItem.close(), 200);
    }

    private _prepareItem(currentItem: SingleDailyCalorie): { name: string, calories: number } {
        if (safe(() => currentItem.item.recipe.id)) {
            const currentRecipe = currentItem.recipes.find(recipe => {
                return recipe.id === currentItem.item.recipe.id;
            });
            if (currentRecipe) {
                currentItem.item.recipe = currentRecipe;
            }
        }
        return {
            name: safe(() => currentItem.item.recipe.name) ? currentItem.item.recipe.name : null,
            calories: Math.round(CalorimeterSingleItemComponent.getCalories(currentItem.item.quantity, currentItem.item.recipe)),
        };
    }

}
