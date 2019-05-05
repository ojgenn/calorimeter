import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { User } from 'firebase';
import { Store } from '@ngrx/store';

import { CalorimeterPurpose } from '../../commons/enums/calorimeter-purpose.enum';
import { calorimeterPurposeLabels } from '../../commons/models/calorimeter-purpose-labels.model';
import { CalorimeterModalComponent } from '../../calorimeter-modal/calorimeter-modal.component';
import { SingleRecipeItem } from '../../../recipes-page/commons/interfaces/single-recipe-item.interface';
import { safeDetectChanges } from '../../../shared/utils';
import { ObservableHandler } from '../../../shared/models/observable-handler';
import * as FromRoot from '../../../reducer';

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
            this._store.select(FromRoot.dailyCalories, {purpose: mode}),
            null,
            this._cdr,
        );
        safeDetectChanges(this._cdr);
    }

    @Input() recipes: Array<SingleRecipeItem>;
    @Input() date: string;
    @Input() uid: User['uid'];

    listLabel = calorimeterPurposeLabels.map;
    purpose: CalorimeterPurpose;

    dailyCalories$$;

    constructor(public _modalController: ModalController,
                private _cdr: ChangeDetectorRef,
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

}
