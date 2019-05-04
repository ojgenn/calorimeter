import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { calorimeterPurposeLabels } from '../commons/models/calorimeter-purpose-labels.model';
import { CalorimeterPurpose } from '../commons/enums/calorimeter-purpose.enum';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

interface CalorimeterModalData {
    mode: CalorimeterPurpose;
}

@Component({
    selector: 'app-calorimeter-modal',
    templateUrl: './calorimeter-modal.component.html',
    styleUrls: ['./calorimeter-modal.component.scss'],
})
export class CalorimeterModalComponent {

    @Input() data: CalorimeterModalData;

    listLabel = calorimeterPurposeLabels.map;
    calorimeterPurpose = CalorimeterPurpose;
    calorimeterForm = this._formBuilder.group({
        name: new FormControl(''),
        searchByName: new FormControl(true),
        quantity: new FormControl('',
            [Validators.required, Validators.pattern('^([\\d]+)([,.]?\\d{1,2})$')]),
    });

    constructor(private _modalCtrl: ModalController,
                private _formBuilder: FormBuilder) { }

    close(): void {
        this._modalCtrl.dismiss().catch();
    }

    save() {

    }
}
