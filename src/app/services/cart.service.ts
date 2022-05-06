import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
// eslint-disable-next-line @typescript-eslint/naming-convention
const Url = 'https://localhost:44379/api/';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _storage: Storage | null = null;
constructor(private http: HttpClient, public storage: Storage) { }


//initialize card storage
async init() {
  // If using, define drivers here: await this.storage.defineDriver(/*...*/);
  const storage = await this.storage.create();
  // eslint-disable-next-line no-underscore-dangle
  this._storage = storage;
}

  initializeCart() {
    this.storage.set('cart', []);
  }

//Add to storage arrayi
  async addToCart(product) {
    let cart = [];
    await  this.storage.get('cart').then((result) => {
      console.log(result);
      if (result) {
        cart = result;
      }
      let alreadyInCart = false;
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === product.productId) {
          cart[i].count += 1;
          alreadyInCart = true;
          break;
        }
      }
      if (!alreadyInCart) {
        product.count = 1;
        cart.push(product);
      }
      this.storage.set('cart', cart);
      console.log(this.storage.get('cart'));
    });

  }

  //Remove product from cart storage

  async removeFromCart(product) {
    let cart = [];
    await  this.storage.get('cart').then((result) => {
      if (result) {
        cart = result;
      }
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === product.productId) {
          cart.splice(i, 1);
          break;
        }
      }
      this.storage.set('cart', cart);
    });
  }
  //Clear the cart
  clearCart() {
    this.storage.set('cart', []);
  }

  // get cart from storage
  getCart() {
    return this.storage.get('cart');
  }

//get product list from api

  getProducts() {
    return this.http.get(Url + 'product/getallproducts');
  };

  //get orders from api
  getOrders() {
    return this.http.get(Url + 'order/getOrders');
  } ;

  // create order
  createOrder(order) {
    return this.http.post(Url + 'order/createOrder', order);
  }

}
