import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-checkoutmodal',
  templateUrl: './checkoutmodal.page.html',
  styleUrls: ['./checkoutmodal.page.scss'],
})
export class CheckoutmodalPage implements OnInit {
    // Data passed in by componentProps
    @Input() firstName: string;
    @Input() lastName: string;
    @Input() middleInitial: string;
  constructor() { }

  ngOnInit() {
  }

}
