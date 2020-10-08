import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutmodalPageRoutingModule } from './checkoutmodal-routing.module';

import { CheckoutmodalPage } from './checkoutmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutmodalPageRoutingModule
  ],
  declarations: [CheckoutmodalPage]
})
export class CheckoutmodalPageModule {}
