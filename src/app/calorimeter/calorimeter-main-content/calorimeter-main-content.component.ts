import { Component, Input, OnInit } from '@angular/core';
import { calorimeterPurposeLabels } from '../commons/models/calorimeter-purpose-labels.model';
import { CalorimeterUserData } from '../calorimeter.page.component';
import { CalorimeterPurpose } from '../commons/enums/calorimeter-purpose.enum';

@Component({
    selector: 'app-calorimeter-main-content',
    templateUrl: './calorimeter-main-content.component.html',
    styleUrls: ['./calorimeter-main-content.component.scss'],
})
export class CalorimeterMainContentComponent implements OnInit {

    @Input() userData: CalorimeterUserData;
    @Input() date: string;

    calorimeterPurposeLabelsAsArray = calorimeterPurposeLabels.asArray;
    calorimeterPurpose = CalorimeterPurpose;

    constructor() { }

    ngOnInit() {}

}
