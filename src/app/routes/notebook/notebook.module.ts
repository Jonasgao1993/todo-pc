import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotebookComponent } from './notebook.component';
import { NotebookRoutes } from './notebook.routing';

@NgModule({
  imports: [
    CommonModule,
    NotebookRoutes
  ],
  declarations: [NotebookComponent]
})
export class NotebookModule { }
