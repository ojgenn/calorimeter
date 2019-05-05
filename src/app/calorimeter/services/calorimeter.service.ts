import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CalorimeterService {

    static readonly instance: CalorimeterService;

    constructor(private _store: Store<any>,
                private _afs: AngularFirestore) {
        // @ts-ignore
        // noinspection TypeScriptUnresolvedVariable
        CalorimeterService.instance = this;
    }

    getDailyCalories(uid: User['uid'], date: string): Observable<any> {
        return this._afs.collection(uid).doc('calorimeter').collection(date.slice(0, 10))
            .snapshotChanges()
            .pipe(
                map(values => values.map(value => {
                        const data = value.payload.doc.data();
                        data.id = value.payload.doc.id;
                        return { ...data };
                    }),
                ),
            );
    }

}
