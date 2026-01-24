package swe.utin.foodiesapi.io;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class OrderResponse {

    private String id;
    private String userId;
    private String userAddress;
    private String phoneNumber;
    private String email;
    private double amount;
    private String paymentStatus;
    private String orderStatus;
    private String paymentOrderId;

    // Payment Gateway Information
    private String paymentGateway;
    private String paymentMethod;
    private String paymentUrl;           // URL to redirect for payment
    private String sessionKey;           // Session key for payment


}
