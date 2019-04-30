import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { RecipesSegments } from '../commons/enums/recipes-segments.enum';
import { User } from 'firebase';

@Component({
    selector: 'app-recipes-modal',
    templateUrl: './recipes-modal.component.html',
    styleUrls: ['./recipes-modal.component.scss'],
})
export class RecipesModalComponent implements OnInit {

    @Input() activeSegment: RecipesSegments;
    @Input() set uid(id: User['uid']) {
        this._items = this._afs.collection(`test`);
    }

    recipesSegments = RecipesSegments;

    private _items: AngularFirestoreCollection;

    constructor(private _modalCtrl: ModalController,
                private _afs: AngularFirestore) { }

    ngOnInit() {
    }

    close() {
        this._items.doc('last').collection('fest').add({check: 1}).catch();
        this._modalCtrl.dismiss().catch();
    }
}
