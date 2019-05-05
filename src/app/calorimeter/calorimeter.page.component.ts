import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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
                private _afs: AngularFirestore,
                private _cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.date = new Date().toISOString();
    }

    dateChanged(e) {
        console.log(e);
    }

    private _prepareStateData(userData: CalorimeterUserData): void {
        this.userData = objectCopy(userData);
        if (this.date) {
            // const collection = this._afs.collection(userData.uid).doc('calorimeter').collection(this.date.slice(0, 10))
            //     .snapshotChanges()
            //     .pipe(
            //         map(values => values.map(value => {
            //                 const data = value.payload.doc.data();
            //                 const id = value.payload.doc.id;
            //                 return { [id]: {...data} };
            //             }),
            //         ),
            //     ).subscribe(res => console.log(res));
            this._store.dispatch(new CalorimeterActions.GetDailyCalories({uid: userData.uid, date: this.date}));
        }
        safeDetectChanges(this._cdr);
    }
}
