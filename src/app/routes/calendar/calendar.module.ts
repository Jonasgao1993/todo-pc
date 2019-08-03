import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarRoutes } from './calendar.routing';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CalendarRoutes,
    SharedModule
  ],
  declarations: [CalendarComponent]
})
export class CalendarModule { }
