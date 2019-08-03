import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { TaskRoutes } from './task.routing';

@NgModule({
  imports: [
    CommonModule,
    TaskRoutes
  ],
  declarations: [TaskComponent]
})
export class TaskModule { }
