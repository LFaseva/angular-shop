import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BaseLayoutModule } from '../modules/shared/base-layout';
import { AppClientComponent } from './app-client.component';

@NgModule({
  declarations: [
    AppClientComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BaseLayoutModule,
  ],
  bootstrap: [AppClientComponent]
})
export class AppModule { }
