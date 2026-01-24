package swe.utin.foodiesapi.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentValidationResponse {
    private String status;
    private String transactionId;
    private String amount;
    private String currency;
    private String bankTransactionId;
    private String cardType;
    private String cardNo;
    private boolean validated;
}
