
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { routes } from './routes.config';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
// import { ConnectionResolver } from './route.resolver';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes, { useHash: true }),
    CoreModule,
    DashboardModule
  ],
  declarations: [
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class RoutesModule { }
