package swe.utin.foodiesapi.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentInitRequest {
    private String transactionId;
    private double amount;
    private String currency;
    private String productName;
    private String productCategory;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String customerAddress;
    private String paymentMethod; // bkash, rocket, nagad, visa, mastercard, etc.
}
