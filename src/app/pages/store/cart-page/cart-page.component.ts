import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { CartUtil } from 'src/app/utils/cart.util';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit {

  constructor() { }

  public cart: Cart = new Cart();
  @Output() amountItems: number;

  ngOnInit(): void {
    this.loadCart();
  }

  public total() {
    let total = 0;
    this.cart.items.forEach(x => {
      total += (x.price * x.quantity)
    });

    return total;
  }

  public loadCart() {
    this.cart = CartUtil.get();
    this.totalAmount(this.cart.items.length);
  }

  public remove(item: any) {
    let index = this.cart.items.indexOf(item);
    this.cart.items.splice(index, 1);
    CartUtil.update(this.cart);
    this.totalAmount(this.cart.items.length);
  }

  public clear() {
    CartUtil.clear();
    this.loadCart();
    this.totalAmount(this.cart.items.length);
  }

  public totalAmount(value: number) {
    this.amountItems = value;
  }

}
