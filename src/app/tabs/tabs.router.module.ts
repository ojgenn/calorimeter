import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../profile/services/auth-guard.service';
import { CalorimeterResolver } from '../calorimeter/resolvers/calorimeter.resolver';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: '../profile/profile.module#ProfileModule',
                    },
                ],
            },
            {
                path: 'recipes-page',
                canActivate: [AuthGuard],
                children: [
                    {
                        path: '',
                        loadChildren: '../recipes-page/recipes-page.module#RecipesPageModule',
                    },
                ],
            },
            {
                path: 'calorimeter',
                canActivate: [AuthGuard],
                resolve: {
                    calorimeter: CalorimeterResolver,
                },
                children: [
                    {
                        path: '',
                        loadChildren: '../calorimeter/calorimeter.module#CalorimeterModule',
                    },
                ],
            },
            {
                path: '',
                redirectTo: '/tabs/profile',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        redirectTo: '/tabs/profile',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    providers: [CalorimeterResolver],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
