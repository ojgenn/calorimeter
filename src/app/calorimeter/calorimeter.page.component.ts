import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'calorimeter.page.component.html',
  styleUrls: ['calorimeter.page.component.scss']
})
export class CalorimeterPageComponent {

  date = new Date().toISOString();

  dateChanged(e) {
    console.log(e);
  }
}
