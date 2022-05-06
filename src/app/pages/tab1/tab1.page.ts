import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

 class Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit  {

  allproducts= [];
  quantity = Array(this.allproducts.length).fill(0);
  // eslint-disable-next-line @typescript-eslint/ban-types
  isError: Boolean = false;
  rowNum: number;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getallproducts();
    this.quantity = Array(this.allproducts.length).fill(0);
  }

  getallproducts() {
    this.cartService.getProducts().subscribe((res: Array<any>) => {
      this.allproducts = res;
      console.log(this.allproducts);
      });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  AddToCart(product: any, quantity: number, row) {
    if(quantity > 0 && quantity != null) {
    product.Quantity = quantity;
    this.cartService.addToCart(product);
    }
    else {
      this.isError = true;
      this.rowNum = row;
    }
   }

}
