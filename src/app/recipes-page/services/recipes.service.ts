import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { map, mergeMap, pluck } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';

import { user } from '../../reducer';
import { RecipesSegments } from '../commons/enums/recipes-segments.enum';

@Injectable({
    providedIn: 'root',
})
export class RecipesService {

    static readonly instance: RecipesService;

    constructor(private _store: Store<any>,
                private _afs: AngularFirestore) {
        // @ts-ignore
        // noinspection TypeScriptUnresolvedVariable
        RecipesService.instance = this;
    }

    getRecipes(): Observable<any> {
        return this._store.select(user)
            .pipe(
                pluck('uid'),
                mergeMap(uid => merge(
                    this._afs
                        .collection(uid)
                        .doc('my_products')
                        .collection(RecipesSegments.Products, ref => ref.orderBy('name'))
                        .snapshotChanges()
                        .pipe(
                            map(values => values.map(value => {
                                    const data = value.payload.doc.data();
                                    const id = value.payload.doc.id;
                                    return { id, ...data };
                                }),
                            ),
                        ),
                    this._afs
                        .collection(uid)
                        .doc('my_products')
                        .collection(RecipesSegments.Sport)
                        .snapshotChanges()
                        .pipe(
                            map(values => values.map(value => {
                                    const data = value.payload.doc.data();
                                    const id = value.payload.doc.id;
                                    return { id, ...data };
                                }),
                            ),
                        ),
                    ),
                ),
            );
    }

}
