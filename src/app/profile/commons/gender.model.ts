import { FlatMap } from '../../shared/utils';

export enum Gender {
    Male,
    Female,
}

export const gender = new FlatMap([
    { key: Gender.Male, name: 'PAGES.PROFILE.FORM.GENDERS.MALE' },
    { key: Gender.Female, name: 'PAGES.PROFILE.FORM.GENDERS.FEMALE' },
], 'key');
