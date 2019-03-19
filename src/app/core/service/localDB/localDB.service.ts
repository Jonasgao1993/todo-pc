import { Injectable } from '@angular/core';
import { LowdbAsync } from 'lowdb';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import * as path from 'path';
import * as fs from 'fs-extra';
import { ElectronService } from '../electron/electron.service';

@Injectable({
  providedIn: 'root'
})
export class LocalDBService {
  db: LowdbAsync<any>;
  STORE_PATH: any;
  constructor(private electronService: ElectronService) {
    this.initDatabase();
  }
  async initDatabase() {
    this.STORE_PATH = this.electronService.getPath();
    if (!fs.pathExistsSync(this.STORE_PATH)) {
      fs.mkdirpSync(this.STORE_PATH);
    }
    const adapter = new FileAsync(path.join(this.STORE_PATH, '/db.json'));
    this.db = await lowdb(adapter);
    if (!this.db.has('setting').value()) { // 先判断该值存不存在
      this.db.defaults({ setting: '123333', user: {}, count: 0 })
        .write();
    }
  }
  public async set(key: string, value: string): Promise<any> {
    return new Promise<any>(resolve => {
      this.db.set(key, value).write();
      resolve(true);
    });
  }
  public async get(key: string): Promise<any> {
    return new Promise<any>(resolve => {
      const value = this.db.get(key).value();
      resolve(value);
    });
  }
  // db.set('user.name', 'typicode').write()
  public async update(key: string, value: string): Promise<any> {
    return new Promise<any>(resolve => {
      this.db.set(key, value).write();
    });
  }
}
