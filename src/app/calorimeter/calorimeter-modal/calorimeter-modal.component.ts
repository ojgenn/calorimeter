import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { calorimeterPurposeLabels } from '../commons/models/calorimeter-purpose-labels.model';
import { CalorimeterPurpose } from '../commons/enums/calorimeter-purpose.enum';
import { FormControl, FormGroup } from '@angular/forms';

interface CalorimeterModalData {
    mode: CalorimeterPurpose;
}

@Component({
    selector: 'app-calorimeter-modal',
    templateUrl: './calorimeter-modal.component.html',
    styleUrls: ['./calorimeter-modal.component.scss'],
})
export class CalorimeterModalComponent implements OnInit {

    @Input() data: CalorimeterModalData;

    listLabel = calorimeterPurposeLabels.map;
    calorimeterForm = new FormGroup({
        name: new FormControl(''),
        quantity: new FormControl(''),
    });

    constructor(private _modalCtrl: ModalController) { }

    ngOnInit() {}

    close(): void {
        this._modalCtrl.dismiss().catch();
    }

    save() {

    }
}
