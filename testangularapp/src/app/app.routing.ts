import {Routes, RouterModule} from "@angular/router";

import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {AuthGuard} from './authguards';

const appRoutes: Routes = [
    {path: '',component:HomeComponent,canActivate: [AuthGuard]},
    {path: 'login',component:LoginComponent},
    {path: '**',redirectTo:''}
];

export const routing = RouterModule.forRoot(appRoutes);