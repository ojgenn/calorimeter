import { Component, OnInit } from '@angular/core';
import { CalorimeterPurpose } from '../commons/enums/calorimeter-purpose.enum';

@Component({
  selector: 'app-calorimeter-main-content',
  templateUrl: './calorimeter-main-content.component.html',
  styleUrls: ['./calorimeter-main-content.component.scss'],
})
export class CalorimeterMainContentComponent implements OnInit {

  calorimeterPurpose = CalorimeterPurpose;
  constructor() { }

  ngOnInit() {}

}
