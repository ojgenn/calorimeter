import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CalorimeterPurpose } from '../../commons/enums/calorimeter-purpose.enum';
import { calorimeterPurposeLabels } from '../../commons/models/calorimeter-purpose-labels.model';
import { CalorimeterModalComponent } from '../../calorimeter-modal/calorimeter-modal.component';
import { SingleRecipeItem } from '../../../recipes-page/commons/interfaces/single-recipe-item.interface';
import { User } from 'firebase';

@Component({
    selector: 'app-calorimeter-single-list',
    templateUrl: './calorimeter-single-list.component.html',
    styleUrls: ['./calorimeter-single-list.component.scss'],
})
export class CalorimeterSingleListComponent implements OnInit {
    @Input() mode: CalorimeterPurpose;
    @Input() recipes: Array<SingleRecipeItem>;
    @Input() date: string;
    @Input() uid: User['uid'];

    listLabel = calorimeterPurposeLabels.map;

    constructor(public _modalController: ModalController) {}

    ngOnInit() {
    }

    async presentModal(): Promise<void> {
        const modal: HTMLIonModalElement = await this._modalController.create({
            component: CalorimeterModalComponent,
            componentProps: {
                data: {
                    mode: this.mode,
                    recipes: this.recipes,
                    date: this.date,
                    uid: this.uid,
                }
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
