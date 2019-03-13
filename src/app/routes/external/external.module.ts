import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SessionCheckComponent } from './session-check/session-check.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent, SessionCheckComponent]
})
export class ExternalModule { }
