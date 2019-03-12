import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { TestRoutes } from './test.routing';

@NgModule({
  imports: [
    CommonModule, TestRoutes
  ],
  declarations: [TestComponent]
})
export class TestModule { }
