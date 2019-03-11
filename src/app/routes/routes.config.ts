import { LayoutComponent } from '../layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponent } from './test/test.component';


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
            { path: 'dashboard', loadChildren: 'app/routes/dashboard/dashboard.module#DashboardModule' },
            { path: 'test', loadChildren: 'app/routes/test/test.module#TestModule'},
            //   { path: 'main-import', loadChildren: './main-import/main-import.module#MainImportModule' },
            //   { path: 'mapping', loadChildren: './mapping/mapping.module#AccountMappingModule' },
            //   { path: 'generate', loadChildren: './generate-file/generate-file.module#GenerateFileModule' },
            //   { path: 'setting', loadChildren: './setting/setting.module#SettingModule' },
            //   { path: 'auxiliary', loadChildren: './auxiliary-accounting/auxiliary-accounting.module#AuxiliaryAccountingModule' },
            //   { path: 'bank-attachements', loadChildren: './bank-attachment/bank-attachment.module#BankAttachmentModule' },
            //   { path: 'history', loadChildren: './history/history.module#HistoryModule'}
        ]
    },
    //   { path: 'login', component: LoginComponent },
    //   { path: 'registered', component: RegisterComponent },
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

