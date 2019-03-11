import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
