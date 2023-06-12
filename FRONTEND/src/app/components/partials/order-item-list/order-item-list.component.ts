import { Component, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.css']
})
export class OrderItemListComponent {
  @Input()
  order:any;
  constructor() { 

    setTimeout(() => {
      console.log(this.order,this.order.items[0].food,'test'); 

    }, 5000);
    }
}
