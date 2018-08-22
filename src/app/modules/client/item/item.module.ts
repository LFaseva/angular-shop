import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './components';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ItemComponent
  ],
  exports: [
    ItemComponent
  ]
})
export class ItemModule { }
