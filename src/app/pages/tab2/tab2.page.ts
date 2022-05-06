import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  allproducts = [];
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getallproducts();
  }

  getallproducts() {
    this.cartService.getCart().then((res: Array<any>) => {
      this.allproducts = res;
      console.log(this.allproducts);
      });
  }

  // Create an order
  createOrder() {
    const order = {
      basketProducts: this.allproducts,
    };
    this.cartService.createOrder(order).subscribe((res: Array<any>) => {
        this.cartService.clearCart();
      });
    }

  //removeFromCart product
 removeFromCart(product: any) {
   this.cartService.removeFromCart(product).then(result => {
     this.getallproducts();
   });
 }
}
