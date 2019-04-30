import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recipes-modal',
  templateUrl: './recipes-modal.component.html',
  styleUrls: ['./recipes-modal.component.scss'],
})
export class RecipesModalComponent implements OnInit {

  constructor(private _modalCtrl: ModalController) { }

  ngOnInit() {}

  close() {
    this._modalCtrl.dismiss().catch();
  }
}
