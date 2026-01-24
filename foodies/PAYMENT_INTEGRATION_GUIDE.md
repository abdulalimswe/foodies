# Payment Gateway Integration Guide - Foodies Client

This document describes the complete payment gateway integration for the Foodies client application.

## Overview

The Foodies client application now supports multiple payment gateways for Bangladesh through SSLCommerz and Cash on Delivery (COD).

### Supported Payment Methods

1. **SSLCommerz Gateway**
   - bKash (Mobile Financial Service)
   - Rocket (Mobile Financial Service)
   - Nagad (Mobile Financial Service)
   - Credit/Debit Cards (Visa, Mastercard, Amex)

2. **Cash on Delivery (COD)**

## Architecture

### Flow Diagram

```
User → Cart → Place Order → Select Payment Method → 
Backend API → SSLCommerz Gateway → Payment Processing → 
Callback to Backend → Redirect to Frontend (Success/Failure/Cancel)
```

## Implementation Details

### 1. Services

#### Order Service (`/src/service/orderService.js`)

Handles all order-related API calls:

- `createOrderWithPayment(orderData, token)` - Creates an order with payment
- `getOrderById(orderId, token)` - Retrieves order details
- `getUserOrders(token)` - Gets all orders for the current user

**API Endpoint:** `http://localhost:8080/api/orders/create`

**Request Format:**
```javascript
{
  orderedItems: [
    {
      foodId: "123",
      foodName: "Burger",
      quantity: 2,
      price: 500
    }
  ],
  userAddress: "Full Address",
  amount: 1000,
  phoneNumber: "01712345678",
  email: "user@example.com",
  customerName: "John Doe",
  paymentGateway: "SSLCOMMERZ", // or "COD"
  paymentMethod: "bkash" // or "rocket", "nagad", "card", "cod"
}
```

**Response Format:**
```javascript
{
  id: "order_id",
  paymentUrl: "https://sandbox.sslcommerz.com/...",
  paymentStatus: "PENDING",
  paymentGateway: "SSLCOMMERZ",
  paymentMethod: "bkash"
}
```

### 2. Pages

#### Place Order Page (`/src/pages/PlaceOrder/PlaceOrder.jsx`)

**Features:**
- Billing address form
- Payment method selection
- Order summary with cart items
- Integration with payment gateway
- Form validation
- Loading states and error handling

**Payment Flow:**
1. User fills in billing details
2. Selects payment gateway (SSLCommerz or COD)
3. If SSLCommerz, selects payment method (bKash, Rocket, Nagad, Card)
4. Submits the form
5. Backend creates order and returns payment URL
6. User is redirected to payment gateway
7. After payment, user is redirected back to frontend

#### Payment Success Page (`/src/pages/PaymentSuccess/PaymentSuccess.jsx`)

Displays success message after successful payment with:
- Transaction ID
- Amount paid
- Payment status
- Links to home and orders page

**Route:** `/payment/success`

#### Payment Failure Page (`/src/pages/PaymentFailure/PaymentFailure.jsx`)

Displays error message when payment fails with:
- Transaction ID
- Error details
- Common failure reasons
- Retry option

**Route:** `/payment/failure`

#### Payment Cancel Page (`/src/pages/PaymentCancel/PaymentCancel.jsx`)

Displays message when user cancels payment with:
- Transaction ID
- Information message
- Options to retry or return to cart

**Route:** `/payment/cancel`

### 3. Routes

Updated routes in `App.jsx`:
```javascript
<Route path='/order' element={<PlaceOrder />} />
<Route path='/payment/success' element={<PaymentSuccess />} />
<Route path='/payment/failure' element={<PaymentFailure />} />
<Route path='/payment/cancel' element={<PaymentCancel />} />
```

## Backend Integration

### Payment Controller

The backend payment controller handles callbacks from SSLCommerz and redirects to appropriate frontend pages:

**Endpoints:**
- `POST /api/payment/sslcommerz/success` → Redirects to `/payment/success`
- `POST /api/payment/sslcommerz/fail` → Redirects to `/payment/failure`
- `POST /api/payment/sslcommerz/cancel` → Redirects to `/payment/cancel`
- `POST /api/payment/sslcommerz/ipn` → Server-to-server notification

**Frontend URL Configuration:**
The backend is configured to redirect to `http://localhost:5173` (Vite default port).

For production, update the `FRONTEND_URL` constant in `PaymentController.java`:
```java
private static final String FRONTEND_URL = "https://your-production-domain.com";
```

## Testing

### Prerequisites

1. **Start Backend Server:**
```bash
cd foodiesapi
./mvnw spring-boot:run
```

2. **Start Frontend Development Server:**
```bash
cd foodies
npm run dev
```

### Test Payment Flow

1. **Add items to cart:**
   - Browse food items
   - Click "Add to Cart"
   - View cart at `/cart`

2. **Proceed to Checkout:**
   - Click "Proceed to Checkout"
   - Fill in billing details
   - Select payment method

3. **Test SSLCommerz (Sandbox):**
   - Select "SSLCommerz" as payment gateway
   - Choose payment method (bKash, Rocket, Nagad, or Card)
   - Click "Place Order"
   - You'll be redirected to SSLCommerz sandbox
   - Use test credentials (provided by SSLCommerz)
   - Complete payment
   - You'll be redirected back to success page

4. **Test Cash on Delivery:**
   - Select "Cash on Delivery" as payment gateway
   - Click "Place Order"
   - You'll see success message immediately

### SSLCommerz Test Credentials

The backend is configured with sandbox credentials:
- **Store ID:** testbox
- **Store Password:** qwerty

For test transactions, SSLCommerz provides test card numbers and mobile wallets in their sandbox environment.

## Configuration

### Environment Variables

#### Backend (`application.properties`)

```properties
# SSLCommerz Configuration
sslcommerz.store.id=${SSLCOMMERZ_STORE_ID:testbox}
sslcommerz.store.password=${SSLCOMMERZ_STORE_PASSWORD:qwerty}
sslcommerz.api.url=https://sandbox.sslcommerz.com/gwprocess/v4/api.php
```

#### Frontend (`orderService.js`)

```javascript
const API_URL = 'http://localhost:8080/api/orders';
```

For production, update this to your production API URL.

## Production Deployment

### Backend Changes

1. **Update SSLCommerz Credentials:**
   - Get production credentials from SSLCommerz
   - Set environment variables:
     ```bash
     export SSLCOMMERZ_STORE_ID=your_production_store_id
     export SSLCOMMERZ_STORE_PASSWORD=your_production_password
     ```

2. **Update SSLCommerz API URLs:**
   - Uncomment production URLs in `application.properties`:
     ```properties
     sslcommerz.api.url=https://securepay.sslcommerz.com/gwprocess/v4/api.php
     sslcommerz.validation.url=https://securepay.sslcommerz.com/validator/api/validationserverAPI.php
     ```

3. **Update Frontend URL:**
   - In `PaymentController.java`, change:
     ```java
     private static final String FRONTEND_URL = "https://your-domain.com";
     ```

### Frontend Changes

1. **Update API URL:**
   - In `orderService.js`, change:
     ```javascript
     const API_URL = 'https://your-api-domain.com/api/orders';
     ```

2. **Build for Production:**
   ```bash
   npm run build
   ```

## Security Considerations

1. **HTTPS Required:** Always use HTTPS in production for payment processing
2. **CORS Configuration:** Ensure backend CORS settings allow frontend domain
3. **Token Authentication:** Payment APIs require JWT token authentication
4. **Payment Validation:** Backend validates all payments with SSLCommerz before confirming orders
5. **IPN Handling:** Backend handles Instant Payment Notifications from SSLCommerz for additional security

## Troubleshooting

### Payment URL Not Generated

**Issue:** No payment URL received after creating order

**Solution:**
- Check backend logs for API errors
- Verify SSLCommerz credentials
- Ensure backend can reach SSLCommerz API
- Check network connectivity

### Redirect Not Working

**Issue:** After payment, not redirected to frontend

**Solution:**
- Verify `FRONTEND_URL` in `PaymentController.java`
- Check browser console for CORS errors
- Ensure frontend routes are properly configured

### Payment Status Not Updating

**Issue:** Payment completed but order status not updated

**Solution:**
- Check backend IPN endpoint logs
- Verify SSLCommerz can reach your IPN URL
- For local development, use ngrok or similar tool for public URL

## Files Created/Modified

### New Files
- `/foodies/src/service/orderService.js`
- `/foodies/src/pages/PaymentSuccess/PaymentSuccess.jsx`
- `/foodies/src/pages/PaymentSuccess/PaymentSuccess.css`
- `/foodies/src/pages/PaymentFailure/PaymentFailure.jsx`
- `/foodies/src/pages/PaymentFailure/PaymentFailure.css`
- `/foodies/src/pages/PaymentCancel/PaymentCancel.jsx`
- `/foodies/src/pages/PaymentCancel/PaymentCancel.css`

### Modified Files
- `/foodies/src/pages/PlaceOrder/PlaceOrder.jsx` - Added payment gateway integration
- `/foodies/src/App.jsx` - Added payment callback routes
- `/foodiesapi/src/main/java/swe/utin/foodiesapi/controller/PaymentController.java` - Added redirect logic

## Support

For issues or questions:
- Check backend documentation: `/foodiesapi/PAYMENT_INTEGRATION.md`
- Review quick start guide: `/foodiesapi/QUICKSTART_PAYMENT.md`
- Contact SSLCommerz support for payment gateway issues

## Future Enhancements

Potential improvements:
1. Order tracking page
2. Payment history
3. Saved payment methods
4. Multiple addresses
5. Guest checkout
6. Email notifications
7. Invoice generation
8. Refund processing
