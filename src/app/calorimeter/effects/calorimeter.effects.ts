import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as Calorimeter from '../reducer/actions';

import { CalorimeterService } from '../services/calorimeter.service';
import { Dictionary } from '../../shared/interfaces/dictionary.interface';
import { DailyCalorie } from '../commons/interfaces/daily-calorie.interface';

@Injectable()
export class CalorimeterEffects {

    constructor(
        private _actions$: Actions,
        private _calorimeterService: CalorimeterService,
    ) {}

    @Effect()
    loadDailyCalories$ = this._actions$
        .pipe(
            ofType(Calorimeter.ActionTypes.GetDailyCalories),
            switchMap((action: Calorimeter.GetDailyCalories) => this._calorimeterService
                .getDailyCalories(action.payload.uid, action.payload.date)
                .pipe(
                    map((dailyCalories: Array<Dictionary<DailyCalorie>>) => new Calorimeter.GetDailyCaloriesSuccess(dailyCalories)),
                    catchError(() => EMPTY),
                )),
        );


}
