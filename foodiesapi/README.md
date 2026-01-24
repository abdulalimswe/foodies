# Foodies API

A comprehensive Spring Boot REST API for an online food delivery application with integrated payment gateways for Bangladesh (bKash, Rocket, Nagad, Visa, Mastercard) via SSLCommerz and international payments via Razorpay.

## Features

- 🔐 **Authentication & Authorization** - JWT-based security with Spring Security
- 🍔 **Food Management** - CRUD operations for food items with image upload to AWS S3
- 🛒 **Shopping Cart** - Add, update, and remove items from cart
- 📦 **Order Management** - Create and track orders with payment integration
- 💳 **Payment Integration**:
  - **SSLCommerz** - For Bangladesh (bKash, Rocket, Nagad, Visa, Mastercard)
  - **Razorpay** - For international payments
- 👤 **User Management** - User registration, profile management, and authentication
- 📱 **RESTful API** - Clean API design with proper HTTP methods and status codes

## Tech Stack

- **Java 21**
- **Spring Boot 3.5.6**
- **Spring Security** - JWT Authentication
- **MongoDB** - NoSQL Database
- **AWS S3** - Image storage
- **Lombok** - Code generation
- **Maven** - Dependency management

## Prerequisites

- Java 21 or higher
- MongoDB (local or cloud instance like MongoDB Atlas)
- AWS Account (for S3 image storage)
- SSLCommerz Account (for Bangladesh payments)
- Razorpay Account (for international payments)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd foodiesapi
```

2. Configure application properties:
Create `application.properties` in `src/main/resources/`:

```properties
# Server Configuration
server.port=8080

# MongoDB Configuration
spring.data.mongodb.uri=mongodb://localhost:27017/foodiesdb
# OR for MongoDB Atlas:
# spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster.mongodb.net/foodiesdb

# JWT Configuration
jwt.secret=your-secret-key-here-minimum-256-bits
jwt.expiration=86400000

# AWS S3 Configuration
aws.s3.region=us-east-1
aws.s3.bucket-name=your-bucket-name
aws.access-key-id=YOUR_ACCESS_KEY
aws.secret-access-key=YOUR_SECRET_KEY

# SSLCommerz Configuration (Bangladesh Payments)
sslcommerz.store-id=your-store-id
sslcommerz.store-password=your-store-password
sslcommerz.api-url=https://sandbox.sslcommerz.com/gwprocess/v4/api.php
# For production: https://securepay.sslcommerz.com/gwprocess/v4/api.php

# Razorpay Configuration (International Payments)
razorpay.key-id=your-razorpay-key-id
razorpay.key-secret=your-razorpay-key-secret

# Application URLs
app.frontend.url=http://localhost:3000
app.backend.url=http://localhost:8080
```

3. Build the project:
```bash
./mvnw clean install
```

4. Run the application:
```bash
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile

### Food
- `GET /api/foods` - Get all food items
- `GET /api/foods/{id}` - Get food by ID
- `POST /api/foods` - Create new food item (Admin)
- `PUT /api/foods/{id}` - Update food item (Admin)
- `DELETE /api/foods/{id}` - Delete food item (Admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/{id}` - Update cart item quantity
- `DELETE /api/cart/{id}` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Orders
- `POST /api/orders/create` - Create new order with payment
- `GET /api/orders` - Get user's orders
- `GET /api/orders/{id}` - Get order details
- `POST /api/orders/payment/callback` - Payment gateway callback

### Payment
- `POST /api/payment/init` - Initialize payment
- `POST /api/payment/validate` - Validate payment status

## Payment Integration

### SSLCommerz (Bangladesh)

Supported payment methods:
- bKash
- Rocket
- Nagad
- Visa/Mastercard
- Other cards

Example order request with bKash:
```json
{
  "orderedItems": [
    {
      "foodId": "food123",
      "foodName": "Chicken Burger",
      "quantity": 2,
      "price": 350
    }
  ],
  "userAddress": "House 23, Road 5, Dhanmondi, Dhaka-1205",
  "amount": 700,
  "phoneNumber": "01712345678",
  "email": "customer@example.com",
  "customerName": "Ahmed Hassan",
  "paymentGateway": "SSLCOMMERZ",
  "paymentMethod": "bkash"
}
```

### Razorpay (International)

Supported payment methods:
- Credit/Debit Cards
- Net Banking
- UPI
- Wallets

Example order request:
```json
{
  "orderedItems": [...],
  "userAddress": "123 Street, City, Country",
  "amount": 1500,
  "phoneNumber": "+1234567890",
  "email": "customer@example.com",
  "customerName": "John Doe",
  "paymentGateway": "RAZORPAY",
  "paymentMethod": "card"
}
```

## Security

- All endpoints except `/api/auth/**` require JWT authentication
- Add JWT token in Authorization header: `Bearer <token>`
- Passwords are encrypted using BCrypt
- Sensitive configuration values should be stored in environment variables

## Development

### Running Tests
```bash
./mvnw test
```

### Building for Production
```bash
./mvnw clean package -DskipTests
java -jar target/foodiesapi-0.0.1-SNAPSHOT.jar
```

### Docker Deployment (Optional)
Create a `Dockerfile`:
```dockerfile
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/foodiesapi-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Build and run:
```bash
docker build -t foodiesapi .
docker run -p 8080:8080 foodiesapi
```

## Environment Variables (Production)

For production deployment, use environment variables instead of hardcoded values:

```bash
export SPRING_DATA_MONGODB_URI=mongodb+srv://...
export JWT_SECRET=your-production-secret
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
export SSLCOMMERZ_STORE_ID=...
export SSLCOMMERZ_STORE_PASSWORD=...
export RAZORPAY_KEY_ID=...
export RAZORPAY_KEY_SECRET=...
```

## API Documentation

Import the Postman collection (`Foodies_Payment_API.postman_collection.json`) for testing and documentation.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@foodies.com or open an issue in the repository.

## Acknowledgments

- Spring Boot Team
- SSLCommerz
- Razorpay
- AWS S3
- MongoDB

---

Built with ❤️ for the Foodies community
