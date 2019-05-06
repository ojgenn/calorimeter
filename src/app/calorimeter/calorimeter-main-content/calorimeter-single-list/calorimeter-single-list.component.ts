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
import { objectCopy, safeDetectChanges } from '../../../shared/utils';
import { ObservableHandler } from '../../../shared/models/observable-handler';
import { CalorimeterService } from '../../services/calorimeter.service';
import { CalorimeterSingleItemComponent } from './calorimeter-single-item/calorimeter-single-item.component';
import { Dictionary } from '../../../shared/interfaces/dictionary.interface';
import { DailyCalorie } from '../../commons/interfaces/daily-calorie.interface';

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

    @Input() set date(date: string) {
        this.currentDate = date;
        const timeZoneOffset = (new Date()).getTimezoneOffset() * 60000;
        const todayDate = (new Date(Date.now() - timeZoneOffset)).toISOString().slice(0, -1);
        this.enableEditItems = todayDate.slice(0, 10) === date.slice(0, 10);
        safeDetectChanges(this._cdr);
    }

    @Input() uid: User['uid'];

    listLabel = calorimeterPurposeLabels.map;
    purpose: CalorimeterPurpose;
    enableEditItems: boolean;
    currentDate: string;
    dailyCalories$$: ObservableHandler<Array<Dictionary<DailyCalorie>>>;
    sum: number;

    constructor(public _modalController: ModalController,
                private _cdr: ChangeDetectorRef,
                private _afs: AngularFirestore,
                private _calorimeterService: CalorimeterService,
                private _store: Store<any>) {}

    ngOnInit() {
    }

    async presentModal(): Promise<void> {
        const modal: HTMLIonModalElement = await this._modalController.create({
            component: CalorimeterModalComponent,
            componentProps: {
                data: {
                    mode: this.purpose,
                    recipes: this.recipes,
                    date: this.currentDate,
                    uid: this.uid,
                },
            },
        });

        return await modal.present();
    }

    private _prepareDailyCalories(dailyCalories: Array<Dictionary<DailyCalorie>>): void {
        if (!dailyCalories) {
            return;
        }
        this.sum = dailyCalories.reduce((sum, dailyCalorie) => {
            const dailyCalorieFromPurpose = objectCopy(dailyCalorie[this.purpose]);
            const recipe = dailyCalorieFromPurpose.recipe;
            if (!recipe) {
                return sum + Number(dailyCalorieFromPurpose.quantity);
            }

            if (this.recipes) {
                const recipeFromRecipes = this.recipes.find(item => item.id === recipe.id);
                if (recipeFromRecipes) {
                    dailyCalorieFromPurpose.recipe = recipeFromRecipes;
                }
            }
            const calories = CalorimeterSingleItemComponent.getCalories(dailyCalorieFromPurpose.quantity, dailyCalorieFromPurpose.recipe);
            return Math.round(sum + calories);
        }, 0);
        this._calorimeterService.setSum(this.purpose, this.sum);
    }

    trackByFn(index, item): string {
        return item.id;
    }

    deleteItem(id: string): void {
        this._afs.collection(this.uid)
            .doc('calorimeter')
            .collection(this.currentDate.slice(0, 10))
            .doc(id)
            .delete().catch();
    }
}
