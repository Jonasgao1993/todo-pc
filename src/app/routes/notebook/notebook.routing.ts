import { Routes, RouterModule } from '@angular/router';
import { NotebookComponent } from './notebook.component';

const routes: Routes = [
  {
    path: '',
    component: NotebookComponent
  }
];

export const NotebookRoutes = RouterModule.forChild(routes);
