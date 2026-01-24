package swe.utin.foodiesapi.service.impl;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import swe.utin.foodiesapi.Entity.OrderEntity;
import swe.utin.foodiesapi.io.*;
import swe.utin.foodiesapi.repository.OrderRepository;
import swe.utin.foodiesapi.service.OrderService;
import swe.utin.foodiesapi.service.SSLCommerzPaymentService;
import swe.utin.foodiesapi.service.UserService;

import java.util.Optional;
import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private SSLCommerzPaymentService sslCommerzPaymentService;

    @Value("${payment_key}")
    private String PAYMENT_KEY;

    @Value("${payment_secret_key}")
    private String PAYMENT_SECRET_KEY;

    @Override
    public OrderResponse createOrderWithPayment(OrderRequest request) throws Exception {
        OrderEntity newOrder = convertToEntity(request);

        String loggedInUserId = userService.findByUserId();
        newOrder.setUserId(loggedInUserId);

        // Generate unique transaction ID
        String transactionId = "FOOD-" + UUID.randomUUID().toString();
        newOrder.setPaymentOrderId(transactionId);

        // Set payment gateway and method
        String paymentGateway = request.getPaymentGateway() != null ?
                               request.getPaymentGateway().toUpperCase() : "SSLCOMMERZ";
        String paymentMethod = request.getPaymentMethod() != null ?
                              request.getPaymentMethod().toLowerCase() : "bkash";

        newOrder.setPaymentGateway(paymentGateway);
        newOrder.setPaymentMethod(paymentMethod);
        newOrder.setPaymentStatus("PENDING");

        // Save initial order
        newOrder = orderRepository.save(newOrder);

        String paymentUrl = null;
        String sessionKey = null;

        // Process based on payment gateway
        switch (paymentGateway) {
            case "SSLCOMMERZ":
                // SSLCommerz supports: bKash, Rocket, Nagad, Visa, Mastercard, etc.
                PaymentInitRequest paymentInitRequest = PaymentInitRequest.builder()
                        .transactionId(transactionId)
                        .amount(newOrder.getAmount())
                        .currency("BDT")
                        .productName("Food Order #" + newOrder.getId())
                        .productCategory("Food")
                        .customerName(request.getCustomerName() != null ? request.getCustomerName() : "Customer")
                        .customerEmail(newOrder.getEmail())
                        .customerPhone(newOrder.getPhoneNumber())
                        .customerAddress(newOrder.getUserAddress())
                        .paymentMethod(paymentMethod)
                        .build();

                PaymentInitResponse paymentResponse = sslCommerzPaymentService.initiatePayment(paymentInitRequest);

                if ("SUCCESS".equalsIgnoreCase(paymentResponse.getStatus())) {
                    paymentUrl = paymentResponse.getGatewayPageURL();
                    sessionKey = paymentResponse.getSessionKey();
                    newOrder.setSessionKey(sessionKey);
                    newOrder = orderRepository.save(newOrder);
                } else {
                    throw new Exception("Payment initialization failed: " + paymentResponse.getMessage());
                }
                break;

            case "RAZORPAY":
                // Razorpay payment gateway
                RazorpayClient razorpayClient = new RazorpayClient(PAYMENT_KEY, PAYMENT_SECRET_KEY);
                JSONObject orderRequest = new JSONObject();
                orderRequest.put("amount", (int)(newOrder.getAmount() * 100)); // Convert to paisa
                orderRequest.put("currency", "INR");
                orderRequest.put("payment_capture", 1);

                Order razorpayOrder = razorpayClient.orders.create(orderRequest);
                newOrder.setPaymentOrderId(razorpayOrder.get("id"));
                newOrder = orderRepository.save(newOrder);
                break;

            case "COD":
                // Cash on Delivery - no payment gateway needed
                newOrder.setPaymentStatus("COD");
                newOrder = orderRepository.save(newOrder);
                break;

            default:
                throw new Exception("Unsupported payment gateway: " + paymentGateway);
        }

        return convertToResponse(newOrder, paymentUrl, sessionKey);
    }

    @Override
    public OrderResponse updatePaymentStatus(String transactionId, String status, String bankTransactionId) throws Exception {
        Optional<OrderEntity> orderOpt = orderRepository.findByPaymentOrderId(transactionId);

        if (orderOpt.isEmpty()) {
            throw new Exception("Order not found for transaction: " + transactionId);
        }

        OrderEntity order = orderOpt.get();

        // Validate payment with SSLCommerz
        if ("SSLCOMMERZ".equalsIgnoreCase(order.getPaymentGateway())) {
            PaymentValidationResponse validation = sslCommerzPaymentService.validatePayment(transactionId);

            if (validation.isValidated()) {
                order.setPaymentStatus("PAID");
                order.setBankTransactionId(validation.getBankTransactionId());
                order.setCardType(validation.getCardType());
                order.setOrderStatus("CONFIRMED");
            } else {
                order.setPaymentStatus("FAILED");
                order.setOrderStatus("CANCELLED");
            }
        } else {
            // For other gateways
            order.setPaymentStatus(status);
            order.setBankTransactionId(bankTransactionId);
            if ("PAID".equalsIgnoreCase(status)) {
                order.setOrderStatus("CONFIRMED");
            }
        }

        order = orderRepository.save(order);
        return convertToResponse(order, null, null);
    }

    private OrderResponse convertToResponse(OrderEntity order, String paymentUrl, String sessionKey) {
        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .userAddress(order.getUserAddress())
                .amount(order.getAmount())
                .paymentOrderId(order.getPaymentOrderId())
                .paymentStatus(order.getPaymentStatus())
                .orderStatus(order.getOrderStatus())
                .email(order.getEmail())
                .phoneNumber(order.getPhoneNumber())
                .paymentGateway(order.getPaymentGateway())
                .paymentMethod(order.getPaymentMethod())
                .paymentUrl(paymentUrl)
                .sessionKey(sessionKey)
                .build();
    }

    private OrderEntity convertToEntity(OrderRequest request) {
        return OrderEntity.builder()
                .userAddress(request.getUserAddress())
                .amount(request.getAmount())
                .orderedItems(request.getOrderedItems())
                .phoneNumber(request.getPhoneNumber())
                .orderStatus(request.getOrderStatus() != null ? request.getOrderStatus() : "PENDING")
                .email(request.getEmail())
                .build();
    }
}
