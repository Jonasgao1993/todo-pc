import { Component, OnInit, NgZone } from '@angular/core';
import { ElectronService } from '../../core/service/electron/electron.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.less']
})
export class TitlebarComponent implements OnInit {
  isMaximized = false;
  display: Boolean = false;
  constructor(public electronService: ElectronService) { }

  ngOnInit() {
    // 判断是不是
    if (process.platform !== 'darwin') {
      this.display = true;
    } else {
      this.display = false;
    }
  }
  max() {
    if (this.electronService.remote.getCurrentWindow().isMaximized()) {
      this.electronService.unMaxWin();
    } else {
      this.electronService.maxWin();
    }
  }
  min() {
    this.electronService.minWin();
  }
  close() {
    this.electronService.closeWin();
  }
}

