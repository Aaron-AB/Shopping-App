import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutmodalPage } from './checkoutmodal.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutmodalPageRoutingModule {}
