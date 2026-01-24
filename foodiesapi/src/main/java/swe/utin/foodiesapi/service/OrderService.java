package swe.utin.foodiesapi.service;

import com.razorpay.RazorpayException;
import swe.utin.foodiesapi.io.OrderRequest;
import swe.utin.foodiesapi.io.OrderResponse;

public interface OrderService {
    OrderResponse createOrderWithPayment(OrderRequest request) throws Exception;

    OrderResponse updatePaymentStatus(String transactionId, String status, String bankTransactionId) throws Exception;
}
