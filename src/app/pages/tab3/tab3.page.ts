import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{


  orderList= [];


  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getOrderList();
  }

  getOrderList() {
    this.cartService.getOrders().subscribe((res: Array<any>) => {
      this.orderList = res;
      console.log(this.orderList);
      });
  }

}
