import { Injectable, NgZone, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalDBService } from '../localDB/localDB.service';
import { CyptoService } from '../crypto/cypto.service';


export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  session: any;
  accountBook: any;

  constructor(private injector: Injector, private localDBService: LocalDBService,
    private cyptoService: CyptoService) {
  }
  /**
   * 清除token
   */
  public logout() {
    this.setToken('');
    this.session = '';
  }
  /**
   * 设置token
   */
  public setToken(oauthToken: any) {
    if (oauthToken) {
      // const expiresDate = new Date();
      // expiresDate.setDate(expiresDate.getDate() + 1);
      if (oauthToken) {
        this.setCookie('TOKEN', oauthToken);
      } else {
        this.setCookie('TOKEN', '');
      }
    }
  }
  /**
   * 获取token
   */
  public getToken(key?: string): Promise<any> {
    if (!key) {
      key = 'TOKEN';
    }
    return new Promise<any>(resolve => {
      this.getCookie(key).then(
        data => {
          this.session = '';
          if (data && data !== '') {
            this.session = JSON.parse(this.cyptoService.decryptedDES(data));
          }
          console.log(this.session);
          resolve(this.session);
        }
      );
    });
  }
  /**
   * 设置Cookie
   */
  private setCookie(key: string, value: Object) {
    const cookieValue = this.cyptoService.encryptedDES(JSON.stringify(value));
    this.localDBService.update(key, cookieValue).then(
      data => {
      }
    )
  }
  /**
   * 获取Cookie
   */
  private getCookie(key: string): Promise<any> {
    return new Promise<any>(resolve => {
      this.localDBService.get(key).then(
        data => {
          resolve(data);
        }
      );
    });
  }
  // /**
  //  * 路由守卫 如果没有TOKEN 直接去Login
  //  *
  //  */
  // canActivate() {
  //   if (this.session) {
  //   } else {
  //     this.injector.get(Router).navigate(['/login']);
  //     return false;
  //   }
  //   return true;
  // }
  // canActivateChild() {
  //   return this.canActivate();
  // }
  // canDeactivate(component: CanComponentDeactivate): Observable<boolean> | boolean {
  //   return component.canDeactivate ? component.canDeactivate() : true;
  // }
}

