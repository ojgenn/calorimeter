import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'firebase';
import { products, sport, user } from '../reducer';
import { ObservableHandler } from '../shared/models/observable-handler';
import { SingleRecipeItem } from '../recipes-page/commons/interfaces/single-recipe-item.interface';
import { safeDetectChanges } from '../shared/utils';

export interface CalorimeterUserData {
    products: Array<SingleRecipeItem>;
    sport: Array<SingleRecipeItem>;
    uid: User['uid'];
}
@Component({
    selector: 'app-tab3',
    templateUrl: 'calorimeter.page.component.html',
    styleUrls: ['calorimeter.page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalorimeterPageComponent {

    statesData = new ObservableHandler(
        combineLatest([
                this._store.select(products),
                this._store.select(sport),
                this._store.select(user),
            ],
        ).pipe(
            map(([userProducts, userSport, userData]) => ({products: userProducts, sport: userSport, uid: userData.uid}))
        ),
        this._prepareStateData.bind(this),
        this._cdr,
    );
    date = new Date().toISOString();

    userData: CalorimeterUserData = {products: [], sport: [], uid: null};

    constructor(private _store: Store<any>,
                private _cdr: ChangeDetectorRef) {}

    dateChanged(e) {
        console.log(e);
    }

    private _prepareStateData(userData: CalorimeterUserData): void {
        this.userData = userData;
        safeDetectChanges(this._cdr);
    }
}
