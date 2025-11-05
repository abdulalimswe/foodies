package swe.utin.foodiesapi.service;

import swe.utin.foodiesapi.io.CartRequest;
import swe.utin.foodiesapi.io.CartResponse;

public interface CartService {
    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();
}
