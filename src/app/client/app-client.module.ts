import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BaseLayoutModule } from '../modules/shared/base-layout';
import { AppClientComponent } from './app-client.component';
import { InterceptorsModule } from '@shared/interceptors';
import { DomService } from '@shared/services/DOMService';
import { LoaderComponent } from '@shared/loader/component/loader/loader.component';
import { LoaderModule } from '@shared/loader';

@NgModule({
  declarations: [
    AppClientComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BaseLayoutModule,
    LoaderModule,
    InterceptorsModule
  ],
  providers: [
    DomService
  ],
  bootstrap: [AppClientComponent],

})
export class AppModule { }
