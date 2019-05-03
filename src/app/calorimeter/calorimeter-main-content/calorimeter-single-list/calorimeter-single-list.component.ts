import { Component, Input, OnInit } from '@angular/core';
import { CalorimeterPurpose } from '../../commons/enums/calorimeter-purpose.enum';
import { calorimeterPurposeLabels } from '../../commons/models/calorimeter-purpose-labels.model';

@Component({
    selector: 'app-calorimeter-single-list',
    templateUrl: './calorimeter-single-list.component.html',
    styleUrls: ['./calorimeter-single-list.component.scss'],
})
export class CalorimeterSingleListComponent implements OnInit {
    @Input() mode: CalorimeterPurpose;

    listLabel = calorimeterPurposeLabels.map;

    constructor() { console.log(this.listLabel); }

    ngOnInit() {}

}
