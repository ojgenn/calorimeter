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
import { map } from 'rxjs/operators';
import { SingleRecipeItem } from './commons/interfaces/single-recipe-item.interface';
import { RecipeModalMode } from './commons/enums/recipe-modal-mode.enum';

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
    items: Array<SingleRecipeItem> = [];
    showSpinner = false;

    private _items$$;

    private _user$$ = new ObservableHandler(
        this._store.select(user),
        this._initCollection.bind(this),
        this._cdr,
    );

    private _itemsCollection: AngularFirestoreCollection<any>;

    constructor(public _modalController: ModalController,
                private _store: Store<any>,
                private _cdr: ChangeDetectorRef,
                private _afs: AngularFirestore) {}

    ngOnInit(): void {
    }

    segmentChanged(ev: any): void {
        this.activeSegment = ev.detail.value as RecipesSegments;
        this._initCollection(this._user$$.latestValue);
    }

    editItem(item: SingleRecipeItem): void {
        this.presentModal(RecipeModalMode.Edit, item).catch();
    }

    deleteItem(id: SingleRecipeItem['id']): void {
        this._itemsCollection.doc(id).delete().catch();
    }

    showItem(item: SingleRecipeItem): void {
        this.presentModal(RecipeModalMode.Show, item).catch();
    }

    async presentModal(recipeModalMode: RecipeModalMode = RecipeModalMode.Create, recipe?: SingleRecipeItem): Promise<void> {
        const modal: HTMLIonModalElement = await this._modalController.create({
            component: RecipesModalComponent,
            componentProps: {
                data: {
                    activeSegment: this.activeSegment,
                    uid: this._user$$.latestValue.uid,
                    recipeModalMode,
                    recipe,
                }
            },
        });
        modal.onDidDismiss()
            .then((result) => {
                if (result.data.id) {
                    this._itemsCollection.doc(result.data.id).update(result.data.collection).catch();
                }
            });

        return await modal.present();
    }

    private _initCollection(userFromStore: User): void {
        if (!!userFromStore) {
            this.showSpinner = true;
            this._itemsCollection = this._afs.collection(userFromStore.uid).doc('my_products').collection(this.activeSegment);
            this._items$$ = new ObservableHandler(this._itemsCollection.snapshotChanges()
                .pipe(
                    map(item => item.map(recipe => {
                            const data = recipe.payload.doc.data();
                            const id = recipe.payload.doc.id;
                            return { id, ...data };
                        },
                        ),
                    )),
                    this._prepareItems.bind(this),
                this._cdr);
        }
    }

    private _prepareItems(item) {
        this.items = item;
        this.showSpinner = false;
    }

    ngOnDestroy(): void {}
}
