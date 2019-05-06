import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromProfile from '../profile/reducer/reducers/profile.reducer';
import * as fromRecipes from '../recipes-page/reducer/reducers/recipes.reducer';
import * as fromCalories from '../calorimeter/reducer/reducers/calorimeter.reducer';
import { CalorimeterPurpose } from '../calorimeter/commons/enums/calorimeter-purpose.enum';
import { getDailyCalories } from '../calorimeter/reducer/reducers/calorimeter.reducer';

export const getProfileState = createFeatureSelector<fromProfile.State>('profile');
export const getRecipesState = createFeatureSelector<fromRecipes.State>('recipes');
export const getCaloriesState = createFeatureSelector<fromCalories.State>('calorimeter');

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

export const consumption = createSelector(
    getProfileState,
    (state: fromProfile.State) => state.userData.consumption,
);

export const products = createSelector(
    getRecipesState,
    (state: fromRecipes.State) => state.products,
);

export const sport = createSelector(
    getRecipesState,
    (state: fromRecipes.State) => state.sport,
);

export const dailyCalories = createSelector(
    getCaloriesState,
    (state: fromCalories.State, props: {purpose: CalorimeterPurpose}) => state.dailyCalories
        .filter(item => Object.keys(item).includes(props.purpose)),
);




