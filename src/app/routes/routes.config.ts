import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from './external/login/login.component';
import { SessionCheckComponent } from './external/session-check/session-check.component';


export const routes = [
    {
        path: '',
        component: LayoutComponent,
        // canActivate: [TokenService],
        // canActivateChild: [TokenService],
        // resolve: { connection: ConnectionResolver },
        children: [
            // 布局
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'test', loadChildren: './test/test.module#TestModule' },
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'session-check', component: SessionCheckComponent }
    //   { path: 'registered', component: RegisterComponent },
    // { path: '', redirectTo: 'login', pathMatch: 'full' },
];

