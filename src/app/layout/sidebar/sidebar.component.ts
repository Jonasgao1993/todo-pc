import { Component, TemplateRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent {
  isCollapsed = true;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;
}
