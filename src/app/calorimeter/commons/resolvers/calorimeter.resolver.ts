import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import * as RecipesActions from '../../../recipes-page/reducer/actions';

import { AutoUnsubscribe } from '../../../shared/decorators';

@AutoUnsubscribe
@Injectable()
export class CalorimeterResolver implements Resolve<boolean> {
    constructor(private _store: Store<any>) {}


    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean {
        this._store.dispatch(new RecipesActions.AddRecipes());
        return true;
    }
}
