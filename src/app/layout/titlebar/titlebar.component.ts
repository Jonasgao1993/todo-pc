import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../core/service/electron/electron.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.less']
})
export class TitlebarComponent implements OnInit {

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
  }
  min() {
    console.log('dianjidianji ');
    this.electronService.min();
  }
  max() {
    if (this.electronService.isMaximized()) {
      this.electronService.max();
    } else {
      this.electronService.unmax();
    }
  }
  close() {
    this.electronService.close();
  }

}
