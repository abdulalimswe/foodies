package swe.utin.foodiesapi.Entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import swe.utin.foodiesapi.io.OrderItem;

import java.util.List;

@Document(collection = "orders")
@Data
@Builder
public class OrderEntity {
    @Id
    private String id;
    private String userId;
    private String userAddress;
    private String phoneNumber;
    private String email;
    private List<OrderItem> orderedItems;
    private double amount;
    private String paymentStatus;
    private String paymentOrderId;
    private String paymentSignature;
    private String orderStatus;

    // Payment Gateway Information
    private String paymentGateway;      // SSLCOMMERZ, RAZORPAY, COD
    private String paymentMethod;       // bkash, rocket, nagad, visa, mastercard, etc.
    private String bankTransactionId;   // Bank transaction ID from payment gateway
    private String cardType;            // Card type if card payment
    private String sessionKey;          // Session key from payment gateway



}
