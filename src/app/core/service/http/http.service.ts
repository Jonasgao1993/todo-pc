import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpInterceptor, HttpRequest, HttpHandler,
    HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { TokenService } from '../token/token.service';
import { LocalStorageService } from 'angular-web-storage';

/**
 * HTTP拦截器，其注册细节见 `app.module.ts`
 */

@Injectable({
    providedIn: 'root'
})
export class HttpService implements HttpInterceptor {

    constructor(private injector: Injector, private tokenService: TokenService, private localStor: LocalStorageService) { }

    private goLogin() {
        const router = this.injector.get(Router);
        this.injector.get(Router).navigate(['/login']);
    }
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        // 头部参数
        if (!req.url.includes('token')) {
            // const authToken = this.tokenService.getToken();
            // const comp = this.tokenService.getCurrentCompany();
            // // const accountbook = this.localStor.get(StorageEnum.Account.toString());

            // req = req.clone({ headers: req.headers.set('Cache-Control', 'no-cache') });
            // // 设置token
            // if (authToken) {
            //     req = req.clone({ headers: req.headers.set('Authorization', `${authToken.token_type} ${authToken.access_token}`) });
            // }
            // if (comp) {
            //     // 当前所属公司id
            //     req = req.clone({ headers: req.headers.set('company_id', comp.id) });
            // }
            // if (accountbook) {
            //     req = req.clone({ headers: req.headers.set('accountbook_id', accountbook.id) });
            // }

        }
        return next
            .handle(req)
            .pipe(
                mergeMap((event: any) => {
                    // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
                    if (event instanceof HttpResponse && event.status !== 200) {
                        // 业务错误处理
                        // return of(<any>{ status: 1 });
                    }
                    // 若一切都正常，则后续操作
                    return of(event);
                }),
                catchError((res: any) => {
                    // 一些通用操作
                    let error = res;
                    switch (res.status) {
                        case 400:
                            // 参数缺失
                            // return Observable.throw('接口参数错误');
                            error = '参数错误';
                            break;
                        case 401:
                        case 412:
                            // 无权限
                            // return Observable.throw(res.error.errors[0]);
                            error = res.error.errors[0];
                            break;
                        case 403:
                            break;
                        // 业务层级错误处理
                        //  return Observable.throw(res.error.errors[0]);
                        case 404:
                            // 404
                            break;
                        case 500:
                            // 服务端错误
                            // return Observable.throw('系统服务器出错啦');
                            error = '系统服务器出错啦';
                            break;
                        case 503:
                            // 系统更新
                            // return Observable.throw('系统正在更新，请稍后刷新再试');
                            error = '系统正在更新，请稍后刷新再试';
                            break;
                        case 504:
                            // 系统更新
                            // return Observable.throw('服务器网络故障，请稍后再试');
                            error = '服务器网络故障，请稍后再试';
                            break;
                        // default:
                        //    // return Observable.throw('系统升级中，马上回来...');
                    }
                    // console.log('intercept:=:::::::', res);
                    return Observable.throw(error);
                })
            );
    }
}
