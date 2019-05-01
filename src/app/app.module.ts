import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AuthGuard } from './profile/services/auth-guard.service';
import { SharedModule } from './shared/shared.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { IonicStorageModule } from '@ionic/storage';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const REDUX_DEVTOOLS = [
    StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: false,
        features: {
            pause: false,
            lock: true,
            persist: true,
        },
    }),
];

const IMPORTS = [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    SharedModule.forRoot(),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient],
        },
    }),
    StoreModule.forRoot({}),
    ...environment.useNgRxDevTool ? REDUX_DEVTOOLS : [],
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
];

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [IMPORTS],
    providers: [
        StatusBar,
        SplashScreen,
        AuthGuard,
        AngularFireDatabase,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(translate: TranslateService) {
        translate.setDefaultLang(environment.language);
    }
}
