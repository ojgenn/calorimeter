import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../profile/services/auth-guard.service';

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
                path: 'tab3',
                canActivate: [AuthGuard],
                children: [
                    {
                        path: '',
                        loadChildren: '../tab3/tab3.module#Tab3PageModule',
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
    exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
