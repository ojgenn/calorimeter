import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'firebase';

import { products, sport, user } from '../reducer';
import { ObservableHandler } from '../shared/models/observable-handler';
import { SingleRecipeItem } from '../recipes-page/commons/interfaces/single-recipe-item.interface';
import { objectCopy, safeDetectChanges } from '../shared/utils';
import * as CalorimeterActions from './reducer/actions';

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
export class CalorimeterPageComponent implements OnInit {

    private _statesData$$ = new ObservableHandler(
        combineLatest([
                this._store.select(products),
                this._store.select(sport),
                this._store.select(user),
            ],
        ).pipe(
            map(([userProducts, userSport, userData]) => ({ products: userProducts, sport: userSport, uid: userData.uid })),
        ),
        this._prepareStateData.bind(this),
        this._cdr,
    );
    date;

    uid: User['uid'];

    userData: CalorimeterUserData;

    constructor(private _store: Store<any>,
                private _cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        const timeZoneOffset = (new Date()).getTimezoneOffset() * 60000;
        this.date = (new Date(Date.now() - timeZoneOffset)).toISOString().slice(0, -1);
    }

    dateChanged(e) {
        this.date = e.detail.value;
        this._store.dispatch(new CalorimeterActions.GetDailyCalories({uid: this.userData.uid, date: this.date}));
        safeDetectChanges(this._cdr);
    }

    private _prepareStateData(userData: CalorimeterUserData): void {
        this.userData = objectCopy(userData);
        if (this.date) {
            this._store.dispatch(new CalorimeterActions.GetDailyCalories({uid: userData.uid, date: this.date}));
        }
        safeDetectChanges(this._cdr);
    }
}
