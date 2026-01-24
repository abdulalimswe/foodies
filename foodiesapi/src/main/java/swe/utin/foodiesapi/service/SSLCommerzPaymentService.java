package swe.utin.foodiesapi.service;

import swe.utin.foodiesapi.io.PaymentInitRequest;
import swe.utin.foodiesapi.io.PaymentInitResponse;
import swe.utin.foodiesapi.io.PaymentValidationResponse;

public interface SSLCommerzPaymentService {

    /**
     * Initialize payment session with SSLCommerz
     * Supports: bKash, Rocket, Nagad, Visa, Mastercard, etc.
     */
    PaymentInitResponse initiatePayment(PaymentInitRequest request) throws Exception;

    /**
     * Validate payment after successful transaction
     */
    PaymentValidationResponse validatePayment(String transactionId) throws Exception;

    /**
     * Refund a transaction
     */
    boolean refundTransaction(String bankTransactionId, double amount, String refundReason) throws Exception;
}
