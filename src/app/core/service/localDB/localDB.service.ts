import { Injectable } from '@angular/core';
import { LowdbAsync } from 'lowdb';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';

@Injectable({
  providedIn: 'root'
})
export class LocalDBService {
  private db: LowdbAsync<any>;
  constructor() {
    this.initDatabase();
  }
  async initDatabase() {
    const adapter = new FileAsync('db.json');
    this.db = await lowdb(adapter);
    // this.db.set('user.fullname', '12345678').write();
    this.setValue('name', 'Luke');
  }

  async setValue(key: string, value: any): Promise<any> {
    await this.db.set(key, value).write();
  }
  async getValue(key: string): Promise<any> {
    return await this.db.get(key).value();
  }
  async updateValue(key: string, value: any): Promise<any> {
    return await this.db.update(key, value).write();
  }
}
