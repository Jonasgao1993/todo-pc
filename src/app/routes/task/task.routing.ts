import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task.component';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent
  }
];

export const TaskRoutes = RouterModule.forChild(routes);
