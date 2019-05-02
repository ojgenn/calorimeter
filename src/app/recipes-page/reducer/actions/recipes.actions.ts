import { Action } from '@ngrx/store';

import { ActionTypes } from './types';

export class Test implements Action {
    readonly type = ActionTypes.Test;

    constructor(public payload) {}
}
