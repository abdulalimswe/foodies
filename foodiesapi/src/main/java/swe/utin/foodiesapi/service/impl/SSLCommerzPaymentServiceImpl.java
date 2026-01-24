package swe.utin.foodiesapi.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import swe.utin.foodiesapi.io.PaymentInitRequest;
import swe.utin.foodiesapi.io.PaymentInitResponse;
import swe.utin.foodiesapi.io.PaymentValidationResponse;
import swe.utin.foodiesapi.service.SSLCommerzPaymentService;

import java.util.ArrayList;
import java.util.List;

@Service
public class SSLCommerzPaymentServiceImpl implements SSLCommerzPaymentService {

    @Value("${sslcommerz.store.id}")
    private String storeId;

    @Value("${sslcommerz.store.password}")
    private String storePassword;

    @Value("${sslcommerz.api.url}")
    private String sslCommerzApiUrl;

    @Value("${sslcommerz.validation.url}")
    private String validationUrl;

    @Value("${sslcommerz.success.url}")
    private String successUrl;

    @Value("${sslcommerz.fail.url}")
    private String failUrl;

    @Value("${sslcommerz.cancel.url}")
    private String cancelUrl;

    @Value("${sslcommerz.ipn.url:}")
    private String ipnUrl;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClients.createDefault();

    @Override
    public PaymentInitResponse initiatePayment(PaymentInitRequest request) throws Exception {
        HttpPost httpPost = new HttpPost(sslCommerzApiUrl);

        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("store_id", storeId));
        params.add(new BasicNameValuePair("store_passwd", storePassword));
        params.add(new BasicNameValuePair("total_amount", String.valueOf(request.getAmount())));
        params.add(new BasicNameValuePair("currency", request.getCurrency()));
        params.add(new BasicNameValuePair("tran_id", request.getTransactionId()));
        params.add(new BasicNameValuePair("success_url", successUrl));
        params.add(new BasicNameValuePair("fail_url", failUrl));
        params.add(new BasicNameValuePair("cancel_url", cancelUrl));

        // IPN URL for instant payment notification
        if (ipnUrl != null && !ipnUrl.isEmpty()) {
            params.add(new BasicNameValuePair("ipn_url", ipnUrl));
        }

        // Product Information
        params.add(new BasicNameValuePair("product_name", request.getProductName()));
        params.add(new BasicNameValuePair("product_category", request.getProductCategory()));
        params.add(new BasicNameValuePair("product_profile", "general"));

        // Customer Information
        params.add(new BasicNameValuePair("cus_name", request.getCustomerName()));
        params.add(new BasicNameValuePair("cus_email", request.getCustomerEmail()));
        params.add(new BasicNameValuePair("cus_add1", request.getCustomerAddress()));
        params.add(new BasicNameValuePair("cus_city", "Dhaka")); // Default
        params.add(new BasicNameValuePair("cus_country", "Bangladesh"));
        params.add(new BasicNameValuePair("cus_phone", request.getCustomerPhone()));

        // Shipping Information (same as customer for food delivery)
        params.add(new BasicNameValuePair("shipping_method", "NO"));
        params.add(new BasicNameValuePair("num_of_item", "1"));

        // Payment Method specific (optional - remove if you want all methods)
        if (request.getPaymentMethod() != null && !request.getPaymentMethod().isEmpty()) {
            String paymentMethod = request.getPaymentMethod().toLowerCase();

            // Map payment methods to SSLCommerz allowed methods
            switch (paymentMethod) {
                case "bkash":
                    params.add(new BasicNameValuePair("allowed_bin", "bkash"));
                    break;
                case "rocket":
                    params.add(new BasicNameValuePair("allowed_bin", "rocket"));
                    break;
                case "nagad":
                    params.add(new BasicNameValuePair("allowed_bin", "nagad"));
                    break;
                case "visa":
                case "mastercard":
                case "card":
                    // For card payments, no specific allowed_bin needed
                    break;
            }
        }

        httpPost.setEntity(new UrlEncodedFormEntity(params));

        HttpResponse response = httpClient.execute(httpPost);
        String responseString = EntityUtils.toString(response.getEntity());

        JsonNode jsonNode = objectMapper.readTree(responseString);

        return PaymentInitResponse.builder()
                .status(jsonNode.get("status").asText())
                .message(jsonNode.has("failedreason") ? jsonNode.get("failedreason").asText() : "Success")
                .gatewayPageURL(jsonNode.has("GatewayPageURL") ? jsonNode.get("GatewayPageURL").asText() : null)
                .transactionId(request.getTransactionId())
                .sessionKey(jsonNode.has("sessionkey") ? jsonNode.get("sessionkey").asText() : null)
                .build();
    }

    @Override
    public PaymentValidationResponse validatePayment(String transactionId) throws Exception {
        HttpPost httpPost = new HttpPost(validationUrl);

        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("store_id", storeId));
        params.add(new BasicNameValuePair("store_passwd", storePassword));
        params.add(new BasicNameValuePair("val_id", transactionId));

        httpPost.setEntity(new UrlEncodedFormEntity(params));

        HttpResponse response = httpClient.execute(httpPost);
        String responseString = EntityUtils.toString(response.getEntity());

        JsonNode jsonNode = objectMapper.readTree(responseString);

        boolean isValid = "VALID".equalsIgnoreCase(jsonNode.get("status").asText()) ||
                         "VALIDATED".equalsIgnoreCase(jsonNode.get("status").asText());

        return PaymentValidationResponse.builder()
                .status(jsonNode.get("status").asText())
                .transactionId(jsonNode.has("tran_id") ? jsonNode.get("tran_id").asText() : null)
                .amount(jsonNode.has("amount") ? jsonNode.get("amount").asText() : null)
                .currency(jsonNode.has("currency") ? jsonNode.get("currency").asText() : null)
                .bankTransactionId(jsonNode.has("bank_tran_id") ? jsonNode.get("bank_tran_id").asText() : null)
                .cardType(jsonNode.has("card_type") ? jsonNode.get("card_type").asText() : null)
                .cardNo(jsonNode.has("card_no") ? jsonNode.get("card_no").asText() : null)
                .validated(isValid)
                .build();
    }

    @Override
    public boolean refundTransaction(String bankTransactionId, double amount, String refundReason) throws Exception {
        String refundUrl = sslCommerzApiUrl.replace("/gwprocess/v4/api.php", "/validator/api/merchantTransIDvalidationAPI.php");

        HttpPost httpPost = new HttpPost(refundUrl);

        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("store_id", storeId));
        params.add(new BasicNameValuePair("store_passwd", storePassword));
        params.add(new BasicNameValuePair("bank_tran_id", bankTransactionId));
        params.add(new BasicNameValuePair("refund_amount", String.valueOf(amount)));
        params.add(new BasicNameValuePair("refund_remarks", refundReason));

        httpPost.setEntity(new UrlEncodedFormEntity(params));

        HttpResponse response = httpClient.execute(httpPost);
        String responseString = EntityUtils.toString(response.getEntity());

        JsonNode jsonNode = objectMapper.readTree(responseString);

        return "success".equalsIgnoreCase(jsonNode.get("status").asText());
    }
}
