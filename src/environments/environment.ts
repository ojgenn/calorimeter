// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Languages } from '../app/shared/enums/languages.enum';

export const environment = {
    production: false,
    language: Languages.Ru,
    useNgRxDevTool: true,
    firebase: {
        apiKey: 'AIzaSyDhJygQbGEHRAL0Tj61HaPy3qqL-fKVhww',
        authDomain: 'calorimeter-24409.firebaseapp.com',
        databaseURL: 'https://calorimeter-24409.firebaseio.com',
        projectId: 'calorimeter-24409',
        storageBucket: 'calorimeter-24409.appspot.com',
        messagingSenderId: '483282447747',
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
