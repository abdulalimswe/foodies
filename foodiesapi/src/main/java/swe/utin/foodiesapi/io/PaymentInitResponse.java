package swe.utin.foodiesapi.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentInitResponse {
    private String status;
    private String message;
    private String gatewayPageURL;
    private String transactionId;
    private String sessionKey;
}
