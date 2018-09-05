import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from '@shared/interceptors/loaderInterceptor';
import { LoaderModule } from '@shared/loader';
import { LoaderComponent } from '../loader/component/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    LoaderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
  declarations: [],
  exports: [
    LoaderModule,
  ],
  entryComponents: [
    LoaderComponent
  ]
})
export class InterceptorsModule { }
