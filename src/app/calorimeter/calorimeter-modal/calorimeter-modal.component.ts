import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

import { Subscription } from 'rxjs';

import { calorimeterPurposeLabels } from '../commons/models/calorimeter-purpose-labels.model';
import { CalorimeterPurpose } from '../commons/enums/calorimeter-purpose.enum';
import { AutoUnsubscribe } from '../../shared/decorators';
import { SingleRecipeItem } from '../../recipes-page/commons/interfaces/single-recipe-item.interface';
import { User } from 'firebase';

interface CalorimeterModalData {
    mode: CalorimeterPurpose;
    recipes: Array<SingleRecipeItem>;
    date: string;
    uid: User['uid'];
}

@AutoUnsubscribe
@Component({
    selector: 'app-calorimeter-modal',
    templateUrl: './calorimeter-modal.component.html',
    styleUrls: ['./calorimeter-modal.component.scss'],
})
export class CalorimeterModalComponent implements OnInit, OnDestroy {

    @Input() data: CalorimeterModalData;

    listLabel = calorimeterPurposeLabels.map;
    calorimeterPurpose = CalorimeterPurpose;

    calorimeterForm = this._formBuilder.group({
        name: new FormControl('', [Validators.required]),
        searchByNameCheckBox: new FormControl(true),
        quantity: new FormControl('',
            [Validators.required, Validators.pattern('^([\\d]+)([,.]?[\\d]?)$')]),
    });

    private _calorimeterFormSubscription$: Subscription;

    constructor(private _modalCtrl: ModalController,
                private _afs: AngularFirestore,
                private _formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this._calorimeterFormSubscription$ = this.calorimeterForm.controls.searchByNameCheckBox.valueChanges.subscribe(res => {
            if (!!this.calorimeterForm.controls.searchByNameCheckBox.value) {
                this.calorimeterForm
                    .addControl('name',
                        new FormControl('', [Validators.required]));
            } else {
                this.calorimeterForm.removeControl('name');
            }
        });
    }

    close(): void {
        this._modalCtrl.dismiss().catch();
    }

    save(): void {
        if (!this.data.uid) {
            this.close();
        }
        const quantity = this.calorimeterForm.controls.quantity.value.replace(',', '.');
        const collection = {
            [this.data.mode]: {
                recipe: this.calorimeterForm.controls.name ? this.calorimeterForm.controls.name.value : null,
                quantity,
            },
        };
        this._afs.collection(this.data.uid)
            .doc('calorimeter')
            .collection(this.data.date.slice(0, 10))
            .add(collection)
            .then(res => this.close())
            .catch(); // ToDo: Добавить вывод ошибки ['05.05.2019']
    }

    ngOnDestroy(): void {}
}
