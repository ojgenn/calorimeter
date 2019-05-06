import { Languages } from '../app/shared/enums/languages.enum';

export const environment = {
    production: true,
    language: Languages.Ru,
    useNgRxDevTool: false,
    firebase: {
        apiKey: 'AIzaSyDhJygQbGEHRAL0Tj61HaPy3qqL-fKVhww',
        authDomain: 'calorimeter-24409.firebaseapp.com',
        databaseURL: 'https://calorimeter-24409.firebaseio.com',
        projectId: 'calorimeter-24409',
        storageBucket: 'calorimeter-24409.appspot.com',
        messagingSenderId: '483282447747',
    },
};
