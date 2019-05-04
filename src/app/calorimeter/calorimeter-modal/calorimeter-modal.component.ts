import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { calorimeterPurposeLabels } from '../commons/models/calorimeter-purpose-labels.model';
import { CalorimeterPurpose } from '../commons/enums/calorimeter-purpose.enum';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from '../../shared/decorators';
import { SingleRecipeItem } from '../../recipes-page/commons/interfaces/single-recipe-item.interface';

interface CalorimeterModalData {
    mode: CalorimeterPurpose;
    recipes: Array<SingleRecipeItem>;
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
            [Validators.required, Validators.pattern('^([\\d]+)([,.]?\\d{1,2})$')]),
    });

    private _calorimeterFormSubscription$: Subscription;

    constructor(private _modalCtrl: ModalController,
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
        const result = {
            [this.data.mode]: {
                recipe: this.calorimeterForm.controls.name ? this.calorimeterForm.controls.name.value : null,
                quantity: this.calorimeterForm.controls.quantity.value,
            }
        };
        console.log(result);
    }

    getName(id) {
        return this.data.recipes.find(item => item.id === id).name;
    }

    ngOnDestroy(): void {}
}
