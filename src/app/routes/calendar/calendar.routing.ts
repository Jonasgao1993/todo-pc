import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent
  },
];

export const CalendarRoutes = RouterModule.forChild(routes);
