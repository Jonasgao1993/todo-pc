import { Component, OnInit, NgZone } from '@angular/core';
import { ElectronService } from '../../core/service/electron/electron.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.less']
})
export class TitlebarComponent implements OnInit {
  isMaximized = false;
  constructor(private electronService: ElectronService) { }

  ngOnInit() {
  }
  max() {
    if (this.electronService.remote.getCurrentWindow().isMaximized()) {
      this.electronService.adjustWin('UNMAX');
    } else {
      this.electronService.adjustWin('MAX');
    }
  }
  min() {
    this.electronService.adjustWin('MIN');
  }
  close() {
    this.electronService.adjustWin('CLOSE');
  }
}
