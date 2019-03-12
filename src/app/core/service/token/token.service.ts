import {Injectable, NgZone, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {CanActivate, CanActivateChild, CanDeactivate} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {LocalStorageService} from 'angular-web-storage';


export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService implements CanActivate, CanActivateChild, CanDeactivate<CanComponentDeactivate> {
  session: any;
  accountBook: any;

  constructor(private cookieService: CookieService, private injector: Injector, private localStorageSrv: LocalStorageService) {
  }

  /**
   * 清除token
   */
  public logout() {
    this.setToken(null);
    this.session = null;
    // this.localStorageSrv.set(StorageEnum.Account.toString(), null);
    // window.location.href = '/login';
  }

  /**
   * 设置token
   */
  public setToken(oauthToken: any) {
    if (oauthToken) {
      const expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + 1);
      if (oauthToken) {
        const options = {expires: expiresDate};
        this.setCookie('OAUTH_TOKEN', oauthToken, options);
      } else {
        this.removeCookie('OAUTH_TOKEN');
      }
      this.session = this.getToken();
    } else {
      this.delToken('OAUTH_TOKEN');
    }

  }

  getCurrentCompany() {
    if (this.getToken() && this.getToken().user) {
      return this.getToken().user.currentCompany;
    }
    return null;
  }

  /**
   * 获取token
   */
  public getToken(key?: string) {
    if (!key) {
      key = 'OAUTH_TOKEN';
    }
    const token = this.getCookie(key);
    return token;
  }

  /**
   * 设置Cookie
   */
  private setCookie(key: string, value: Object, options?: any) {
    const cookieValue = JSON.stringify(value);
    options ? this.cookieService.set(key, cookieValue, options) :
      this.cookieService.set(key, cookieValue);
  }

  /**
   * 移除Cookie
   */
  private removeCookie(key: string) {
    this.cookieService.delete(key);
  }

  /**
   * 删除Token
   */
  delToken(key?: string): void {
    if (!key) {
      key = 'OAUTH_TOKEN';
    }
    this.removeCookie(key);
  }

  /**
   * 获取Cookie
   */
  private getCookie(key: string) {
    const cookieData = this.cookieService.get(key);
    /*jshint eqnull:true */
    if (cookieData) {
      return JSON.parse(cookieData);
    } else {
      return null;
    }
  }

  /**
   * 路由守卫 如果没有TOKEN 直接去Login
   *
   */
  canActivate() {
    this.session = this.getToken();
    if (this.session && this.session.user && this.session.access_token) {
    } else {
      this.injector.get(Router).navigate(['/login']);
      return false;
    }
    return true;
  }

  canActivateChild() {
    return this.canActivate();
  }

  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

  /**
   * 超时退出
   */
  public idleOut() {
    const tempSession = this.session;
    tempSession.access_token = undefined;
    this.setToken(tempSession);
    this.session = this.getToken();
  }

}

