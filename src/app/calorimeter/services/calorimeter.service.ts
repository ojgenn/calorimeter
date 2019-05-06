import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from 'firebase';
import { map } from 'rxjs/operators';
import { SubjectHandler } from '../../shared/models/subject-handler';
import { CalorimeterPurpose } from '../commons/enums/calorimeter-purpose.enum';
import { objectCopy } from '../../shared/utils';

@Injectable({
    providedIn: 'root',
})
export class CalorimeterService {

    static readonly instance: CalorimeterService;

    calorimeterSum = new SubjectHandler({
        [CalorimeterPurpose.Breakfast]: 0,
        [CalorimeterPurpose.Lunch]: 0,
        [CalorimeterPurpose.Dinner]: 0,
        [CalorimeterPurpose.Activity]: 0,
    });

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

    setSum(purpose: CalorimeterPurpose, sum: number) {
        const calorimeterSum = objectCopy(this.calorimeterSum.value);
        calorimeterSum[purpose] = sum;
        this.calorimeterSum.emit(calorimeterSum);
    }

}
