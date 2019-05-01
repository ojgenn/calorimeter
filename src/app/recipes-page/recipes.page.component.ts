import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecipesModalComponent } from './recipes-modal/recipes-modal.component';
import { RecipesSegments } from './commons/enums/recipes-segments.enum';
import { ObservableHandler } from '../shared/models/observable-handler';
import { user } from '../reducer';
import { Store } from '@ngrx/store';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from 'firebase';

@Component({
    selector: 'app-recipes-page',
    templateUrl: 'recipes.page.component.html',
    styleUrls: ['recipes.page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RecipesPageComponent {
    recipesSegments = {
        [RecipesSegments.Products]: 'PAGES.RECIPES.SEGMENTS.PRODUCTS',
        [RecipesSegments.Sport]: 'PAGES.RECIPES.SEGMENTS.SPORT',
    };
    segments = RecipesSegments;
    activeSegment: RecipesSegments = RecipesSegments.Products;

    // удалить, когда начнем качать реальные данные с сервера
    items = Array.from(Array(1000).keys());

    private _user = new ObservableHandler(
        this._store.select(user),
        this._initCollection.bind(this),
        this._cdr,
    );

    private _items: AngularFirestoreCollection<any>;

    constructor(public _modalController: ModalController,
                private _store: Store<any>,
                private _cdr: ChangeDetectorRef,
                private _afs: AngularFirestore) {}

    segmentChanged(ev: any) {
        this.activeSegment = ev.detail.value as RecipesSegments;
    }

    async presentModal() {
        const modal: HTMLIonModalElement = await this._modalController.create({
            component: RecipesModalComponent,
            componentProps: {
                activeSegment: this.activeSegment,
                uid: this._user.latestValue.uid,
            },
        });
        return await modal.present();
    }

    private _initCollection(userFromStore: User): void {
        if (!!userFromStore) {
            this._items = this._afs.collection('test');
        }
    }
}
