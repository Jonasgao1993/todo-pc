import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent
  }
];

export const TestRoutes = RouterModule.forChild(routes);
