import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DomService } from '@shared/services/DOMService';
import { LoaderComponent } from '@shared/loader/component/loader/loader.component';

@Injectable({
  providedIn: 'root',
})

export class LoaderInterceptorService implements HttpInterceptor {
  private counter : number = 0;

  constructor(private domService: DomService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoader();
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.onEnd();
      }
    },
      (err: any) => {
        this.onEnd();
      }));
  }

  private onEnd(): void {
    this.hideLoader();
  }
  private showLoader(): void {
    if(this.counter === 0){
      this.domService.appendComponentToBody(LoaderComponent);
      this.counter++;
    }
  }
  private hideLoader(): void {
    if(this.counter === 1){
      this.domService.deleteComponentFromBody();
      this.counter--;
    }
  }
}
