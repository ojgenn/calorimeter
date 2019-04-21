import { Action } from '@ngrx/store';

export enum ActionTypes {
    Test = '[Profile] Test',
}

export class Test implements Action {
    readonly type = ActionTypes.Test;
}

export type ProfileActions =
    | Test;
