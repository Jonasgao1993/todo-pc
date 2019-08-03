import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SessionCheckComponent } from './session-check/session-check.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,SharedModule
  ],
  declarations: [LoginComponent, SessionCheckComponent]
})
export class ExternalModule { }
