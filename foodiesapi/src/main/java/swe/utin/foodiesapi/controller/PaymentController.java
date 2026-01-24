package swe.utin.foodiesapi.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import swe.utin.foodiesapi.io.OrderResponse;
import swe.utin.foodiesapi.service.OrderService;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@AllArgsConstructor
public class PaymentController {

    private final OrderService orderService;

    // Frontend URL (update this for production)
    private static final String FRONTEND_URL = "http://localhost:5173";

    /**
     * SSLCommerz Success Callback
     * This endpoint will be called by SSLCommerz when payment is successful
     */
    @PostMapping("/sslcommerz/success")
    public RedirectView handleSSLCommerzSuccess(@RequestParam Map<String, String> params) {
        try {
            String transactionId = params.get("tran_id");
            String bankTransactionId = params.get("bank_tran_id");
            String amount = params.get("amount");
            String status = params.get("status");

            OrderResponse response = orderService.updatePaymentStatus(transactionId, "PAID", bankTransactionId);

            // Redirect to frontend success page with parameters
            String redirectUrl = String.format("%s/payment/success?tran_id=%s&amount=%s&status=%s",
                    FRONTEND_URL, transactionId, amount, status);

            return new RedirectView(redirectUrl);
        } catch (Exception e) {
            // Redirect to failure page in case of error
            String redirectUrl = String.format("%s/payment/failure?error=%s",
                    FRONTEND_URL, e.getMessage());
            return new RedirectView(redirectUrl);
        }
    }

    /**
     * SSLCommerz Fail Callback
     */
    @PostMapping("/sslcommerz/fail")
    public RedirectView handleSSLCommerzFail(@RequestParam Map<String, String> params) {
        try {
            String transactionId = params.get("tran_id");
            String failedReason = params.get("error");
            String status = params.get("status");

            OrderResponse response = orderService.updatePaymentStatus(transactionId, "FAILED", null);

            // Redirect to frontend failure page with parameters
            String redirectUrl = String.format("%s/payment/failure?tran_id=%s&error=%s&status=%s",
                    FRONTEND_URL, transactionId, failedReason != null ? failedReason : "Payment processing failed", status);

            return new RedirectView(redirectUrl);
        } catch (Exception e) {
            String redirectUrl = String.format("%s/payment/failure?error=%s",
                    FRONTEND_URL, e.getMessage());
            return new RedirectView(redirectUrl);
        }
    }

    /**
     * SSLCommerz Cancel Callback
     */
    @PostMapping("/sslcommerz/cancel")
    public RedirectView handleSSLCommerzCancel(@RequestParam Map<String, String> params) {
        try {
            String transactionId = params.get("tran_id");
            String status = params.get("status");

            OrderResponse response = orderService.updatePaymentStatus(transactionId, "CANCELLED", null);

            // Redirect to frontend cancel page with parameters
            String redirectUrl = String.format("%s/payment/cancel?tran_id=%s&status=%s",
                    FRONTEND_URL, transactionId, status);

            return new RedirectView(redirectUrl);
        } catch (Exception e) {
            String redirectUrl = String.format("%s/payment/cancel?error=%s",
                    FRONTEND_URL, e.getMessage());
            return new RedirectView(redirectUrl);
        }
    }

    /**
     * SSLCommerz IPN (Instant Payment Notification) Callback
     * This is called by SSLCommerz server-to-server for payment confirmation
     */
    @PostMapping("/sslcommerz/ipn")
    public ResponseEntity<?> handleSSLCommerzIPN(@RequestParam Map<String, String> params) {
        try {
            String transactionId = params.get("tran_id");
            String status = params.get("status");
            String bankTransactionId = params.get("bank_tran_id");

            if ("VALID".equalsIgnoreCase(status) || "VALIDATED".equalsIgnoreCase(status)) {
                orderService.updatePaymentStatus(transactionId, "PAID", bankTransactionId);
            }

            return ResponseEntity.ok("IPN processed");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("IPN processing failed");
        }
    }

    /**
     * Validate payment manually (for verification)
     */
    @GetMapping("/validate/{transactionId}")
    public ResponseEntity<?> validatePayment(@PathVariable String transactionId) {
        try {
            OrderResponse response = orderService.updatePaymentStatus(transactionId, null, null);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("status", "error", "message", e.getMessage()));
        }
    }
}
