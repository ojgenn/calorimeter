import { Action } from '@ngrx/store';

import { User } from 'firebase';

export class GetDailyCalories implements Action {
    readonly type = ActionTypes.GetDailyCalories;

    constructor(public payload: {uid: User['uid'], date: string}) {}
}

export class GetDailyCaloriesSuccess implements Action {
    readonly type = ActionTypes.GetDailyCaloriesSuccess;

    constructor(public payload) {}
}

export enum ActionTypes {
    GetDailyCalories = '[Calorimeter] Get Daily Calories',
    GetDailyCaloriesSuccess = '[Calorimeter] Get Daily Calories Success',
}

export type CalorimeterActions =
    | GetDailyCalories
    | GetDailyCaloriesSuccess;
