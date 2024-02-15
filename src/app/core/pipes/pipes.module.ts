import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneFormartPipe } from './phone.pipe';

@NgModule({
  declarations: [PhoneFormartPipe],
  imports: [CommonModule],
  exports: [PhoneFormartPipe],
})
export class PipesModule {}
