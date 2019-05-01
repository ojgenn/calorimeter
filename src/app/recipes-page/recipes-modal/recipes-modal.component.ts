import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'firebase';
import { RecipesSegments } from '../commons/enums/recipes-segments.enum';

@Component({
    selector: 'app-recipes-modal',
    templateUrl: './recipes-modal.component.html',
    styleUrls: ['./recipes-modal.component.scss'],
})
export class RecipesModalComponent implements OnInit {

    @Input() set activeSegment(activeSegment: RecipesSegments) {
        this.recipeSegment = activeSegment;
        this.recipeModalForm = this._initRecipeModalForm();
    }

    @Input() set uid(id: User['uid']) {
        this._items = this._afs.collection(id);
    }

    recipesSegments = RecipesSegments;
    recipeModalForm: FormGroup;
    recipeSegment: RecipesSegments;

    private _items: AngularFirestoreCollection;

    constructor(private _modalCtrl: ModalController,
                private _afs: AngularFirestore) { }

    ngOnInit() {}

    close(): void {
        // this._items.doc('last').collection('fest').add({check: 1}).catch();
        this._modalCtrl.dismiss().catch();
    }

    save(): void {
        this._items
            .doc('my_products')
            .collection(this.recipeSegment)
            .add(
                {
                    type: this.recipeModalForm.controls['type'].value,
                    name: this.recipeModalForm.controls['name'].value,
                    calories: this.recipeModalForm.controls['calories'].value,
                }
            )
            .then(res => this.close())
            .catch(); // ToDo: Добавить вывод ошибки ['01.05.2019']
    }

    private _initRecipeModalForm(): FormGroup {
        return new FormGroup({
            type: new FormControl(this.recipeSegment),
            name: new FormControl('', [Validators.required]),
            calories: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
        });
    }
}
