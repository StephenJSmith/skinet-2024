import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../../shared/models/cart';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe, MatIcon, RouterLink],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  item = input.required<CartItem>();
  cartService = inject(CartService);

  incrementQuantity() {
    this.cartService.addItemToCart(this.item());
  }

  decrementQuantity() {
    this.cartService.removeItemFromCart(this.item().productId);
  }

  removeItemFromCart() {
    this.cartService.removeItemFromCart(
      this.item().productId,
      this.item().quantity
    );
  }
}
