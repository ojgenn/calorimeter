import * as fromProfile from '../profile/reducer/reducers/profile.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getProfileState = createFeatureSelector<fromProfile.State>('profile');

export const isLoggedIn = createSelector(
    getProfileState,
    (state: fromProfile.State) => state.isLoggedIn
);
