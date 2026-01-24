package swe.utin.foodiesapi.io;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class OrderRequest {

    private List<OrderItem> orderedItems;
    private String userAddress;
    private double amount;
    private String phoneNumber;
    private String email;
    private String orderStatus;

    // Payment Information
    private String paymentGateway;  // SSLCOMMERZ, RAZORPAY, COD
    private String paymentMethod;   // bkash, rocket, nagad, visa, mastercard, razorpay, cod
    private String customerName;    // Required for SSLCommerz
}
