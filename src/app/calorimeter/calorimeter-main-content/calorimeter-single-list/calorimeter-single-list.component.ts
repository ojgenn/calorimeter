import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { User } from 'firebase';

import * as FromRoot from '../../../reducer';

import { CalorimeterPurpose } from '../../commons/enums/calorimeter-purpose.enum';
import { calorimeterPurposeLabels } from '../../commons/models/calorimeter-purpose-labels.model';
import { CalorimeterModalComponent } from '../../calorimeter-modal/calorimeter-modal.component';
import { SingleRecipeItem } from '../../../recipes-page/commons/interfaces/single-recipe-item.interface';
import { objectCopy } from '../../../shared/utils';
import { ObservableHandler } from '../../../shared/models/observable-handler';
import { RecipesSegments } from '../../../recipes-page/commons/enums/recipes-segments.enum';
import { CalorimeterService } from '../../services/calorimeter.service';

@Component({
    selector: 'app-calorimeter-single-list',
    templateUrl: './calorimeter-single-list.component.html',
    styleUrls: ['./calorimeter-single-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalorimeterSingleListComponent implements OnInit {
    @Input() set mode(mode: CalorimeterPurpose) {
        this.purpose = mode;
        this.dailyCalories$$ = new ObservableHandler(
            this._store.select(FromRoot.dailyCalories, { purpose: mode }),
            this._prepareDailyCalories.bind(this),
            this._cdr,
        );
    }

    @Input() recipes: Array<SingleRecipeItem>;
    @Input() date: string;
    @Input() uid: User['uid'];

    listLabel = calorimeterPurposeLabels.map;
    purpose: CalorimeterPurpose;

    dailyCalories$$; // todo: типизировать
    sum: number;

    constructor(public _modalController: ModalController,
                private _cdr: ChangeDetectorRef,
                private _afs: AngularFirestore,
                private _calorimeterService: CalorimeterService,
                private _store: Store<any>) {}

    ngOnInit() {}

    async presentModal(): Promise<void> {
        const modal: HTMLIonModalElement = await this._modalController.create({
            component: CalorimeterModalComponent,
            componentProps: {
                data: {
                    mode: this.purpose,
                    recipes: this.recipes,
                    date: this.date,
                    uid: this.uid,
                },
            },
        });
        modal.onDidDismiss()
            .then((result) => {
                if (result.data) {
                    console.log(result.data);
                }
            });

        return await modal.present();
    }

    // Todo: типизировать
    private _prepareDailyCalories(dailyCalories): void {
        if (!dailyCalories) {
            return;
        }
        this.sum = dailyCalories.reduce((sum, dailyCalorie) => {
            dailyCalorie = objectCopy(dailyCalorie[this.purpose]);
            const recipe = dailyCalorie.recipe;
            if (!recipe) {
                return sum + Number(dailyCalorie.quantity);
            }

            if (this.recipes) {
                const recipeFromRecipes = this.recipes.find(item => item.id === recipe.id);
                if (recipeFromRecipes) {
                    dailyCalorie.recipe = recipeFromRecipes;
                }
            }

            switch (dailyCalorie.recipe.type) {
                case RecipesSegments.Sport:
                    return Math.round(sum + Number(dailyCalorie.quantity) * Number(dailyCalorie.recipe.calories));
                case RecipesSegments.Products:
                    return Math.round(sum + Number(dailyCalorie.quantity) * Number(dailyCalorie.recipe.calories) / 100);
            }
        }, 0);
        this._calorimeterService.setSum(this.purpose, this.sum);
    }

    trackByFn(index, item): string {
        return item.id;
    }

    deleteItem(id: string): void {
        this._afs.collection(this.uid)
            .doc('calorimeter')
            .collection(this.date.slice(0, 10))
            .doc(id)
            .delete().catch();
    }
}
