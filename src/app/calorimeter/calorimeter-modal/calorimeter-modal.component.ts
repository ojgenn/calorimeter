import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calorimeter-modal',
  templateUrl: './calorimeter-modal.component.html',
  styleUrls: ['./calorimeter-modal.component.scss'],
})
export class CalorimeterModalComponent implements OnInit {

  constructor(private _modalCtrl: ModalController) { }

  ngOnInit() {}

  close(): void {
    this._modalCtrl.dismiss().catch();
  }
}
