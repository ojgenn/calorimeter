import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromProfile from '../profile/reducer/reducers/profile.reducer';
import * as fromRecipes from '../recipes-page/reducer/reducers/recipes.reducer';

export const getProfileState = createFeatureSelector<fromProfile.State>('profile');
export const getRecipesState = createFeatureSelector<fromRecipes.State>('recipes');

export const isLoggedIn = createSelector(
    getProfileState,
    (state: fromProfile.State) => state.isLoggedIn,
);

export const authPending = createSelector(
    getProfileState,
    (state: fromProfile.State) => state.authPending,
);

export const user = createSelector(
    getProfileState,
    (state: fromProfile.State) => state.user,
);

export const products = createSelector(
    getRecipesState,
    (state: fromRecipes.State) => state.products,
);

export const sport = createSelector(
    getRecipesState,
    (state: fromRecipes.State) => state.sport,
);



