import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { User } from 'firebase';

import { RecipesModalComponent } from './recipes-modal/recipes-modal.component';
import { RecipesSegments } from './commons/enums/recipes-segments.enum';
import { ObservableHandler } from '../shared/models/observable-handler';
import { user } from '../reducer';
import { AutoUnsubscribe } from '../shared/decorators';
import { Subscription } from 'rxjs';
import { safeDetectChanges } from '../shared/utils';

@AutoUnsubscribe
@Component({
    selector: 'app-recipes-page',
    templateUrl: 'recipes.page.component.html',
    styleUrls: ['recipes.page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RecipesPageComponent implements OnInit, OnDestroy {
    recipesSegments = {
        [RecipesSegments.Products]: 'PAGES.RECIPES.SEGMENTS.PRODUCTS',
        [RecipesSegments.Sport]: 'PAGES.RECIPES.SEGMENTS.SPORT',
    };
    segments = RecipesSegments;
    activeSegment: RecipesSegments = RecipesSegments.Products;

    // удалить, когда начнем качать реальные данные с сервера
    items = Array.from(Array(1000).keys());
    showSpinner = false;

    private _user$$ = new ObservableHandler(
        this._store.select(user),
        this._initCollection.bind(this),
        this._cdr,
    );

    private _items: AngularFirestoreCollection<any>;
    private _itemsSubscription$: Subscription;

    constructor(public _modalController: ModalController,
                private _store: Store<any>,
                private _cdr: ChangeDetectorRef,
                private _afs: AngularFirestore) {}

    ngOnInit(): void {
        this._itemsSubscription$ = this._subscribeItems();
    }

    segmentChanged(ev: any): void {
        this.activeSegment = ev.detail.value as RecipesSegments;
        this._initCollection(this._user$$.latestValue);
    }

    async presentModal(): Promise<void> {
        const modal: HTMLIonModalElement = await this._modalController.create({
            component: RecipesModalComponent,
            componentProps: {
                activeSegment: this.activeSegment,
                uid: this._user$$.latestValue.uid,
            },
        });
        return await modal.present();
    }

    private _initCollection(userFromStore: User): void {
        if (!!userFromStore) {
            this.showSpinner = true;
            this._items = this._afs.collection(userFromStore.uid).doc('my_products').collection(this.activeSegment);
            this._unsubscribeItemsSubscription();
            this._itemsSubscription$ = this._subscribeItems();
        }
    }

    private _subscribeItems(): Subscription {
        return this._items
            .valueChanges()
            .subscribe(res => {
                console.log(res);
                this.showSpinner = false;
                safeDetectChanges(this._cdr);
            });
    }

    private _unsubscribeItemsSubscription(): void {
        if (this._itemsSubscription$) {
            this._itemsSubscription$.unsubscribe();
        }
    }

    ngOnDestroy(): void {}
}
