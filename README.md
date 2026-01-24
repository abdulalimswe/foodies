# 🍔 FOODIES - Online Food Delivery Platform

<div align="center">

![Foodies Logo](./img/Home.png)

**A Complete Full-Stack Food Delivery Application with Integrated Payment Gateways**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Features](#features) • [Tech Stack](#tech-stack) • [Architecture](#architecture) • [Getting Started](#getting-started) • [Payment Integration](#payment-integration) • [Screenshots](#screenshots)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Admin Panel Setup](#admin-panel-setup)
- [Payment Integration](#payment-integration)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## 🎯 Overview

**FOODIES** is a modern, production-ready online food delivery platform built with cutting-edge technologies. It provides a seamless experience for customers to browse food items, place orders, and make payments through multiple payment gateways. The platform includes a comprehensive admin panel for managing food items, orders, and monitoring business operations.

### Key Highlights

- 🔐 **Secure Authentication** - JWT-based authentication with Spring Security
- 💳 **Multi-Payment Gateway** - SSLCommerz (Bangladesh) & Razorpay (International) integration
- 📱 **Responsive Design** - Works flawlessly on all devices
- ☁️ **Cloud Storage** - AWS S3 integration for image uploads
- 🛒 **Real-time Cart** - Dynamic shopping cart with instant updates
- 📦 **Order Tracking** - Complete order management and tracking system
- 👨‍💼 **Admin Dashboard** - Comprehensive admin panel for business management
- 🚀 **Production Ready** - Scalable architecture with best practices

---

## ✨ Features

### Customer Features

- ✅ **User Authentication**
  - Secure registration and login
  - JWT token-based authentication
  - Password encryption with BCrypt
  - Profile management

- 🍕 **Food Browsing & Discovery**
  - Browse food items by categories
  - Search functionality
  - Detailed food item pages
  - High-quality food images

- 🛒 **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Real-time price calculation
  - Persistent cart across sessions

- 📦 **Order Management**
  - Place orders with multiple items
  - Choose delivery address
  - Select payment method
  - Order history tracking
  - Order status updates

- 💳 **Payment Integration**
  - **SSLCommerz** for Bangladesh
    - bKash (Mobile Financial Service)
    - Rocket (Mobile Financial Service)
    - Nagad (Mobile Financial Service)
    - Credit/Debit Cards (Visa, Mastercard, Amex)
  - **Razorpay** for International Payments
    - Cards, UPI, Net Banking, Wallets
  - **Cash on Delivery (COD)**

- 📱 **Responsive UI**
  - Mobile-first design
  - Bootstrap 5 components
  - Smooth animations
  - Toast notifications

### Admin Features

- 📊 **Dashboard**
  - Overview of orders and revenue
  - Statistics and analytics
  
- 🍔 **Food Management**
  - Add new food items
  - Update existing items
  - Delete items
  - Upload food images to AWS S3
  - Manage categories and pricing

- 📦 **Order Management**
  - View all orders
  - Update order status
  - Track payments
  - Manage deliveries

---

## 🛠️ Tech Stack

### Backend (foodiesapi)

| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 21 | Programming Language |
| Spring Boot | 3.5.6 | Application Framework |
| Spring Security | Latest | Authentication & Authorization |
| Spring Data MongoDB | Latest | Database Access |
| JWT | 0.11.5 | Token Authentication |
| MongoDB | Latest | NoSQL Database |
| AWS S3 SDK | 2.34.6 | Cloud Storage |
| SSLCommerz | Latest | Bangladesh Payment Gateway |
| Razorpay | Latest | International Payment Gateway |
| Lombok | 1.18.42 | Code Generation |
| Maven | Latest | Build Tool |

### Frontend (foodies)

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.1 | UI Library |
| React Router | 7.9.4 | Routing |
| Axios | 1.13.0 | HTTP Client |
| Bootstrap | 5.3.8 | CSS Framework |
| React Toastify | 11.0.5 | Notifications |
| Vite | 7.1.7 | Build Tool |

### Admin Panel (adminpanel)

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.1 | UI Library |
| React Router | 7.9.3 | Routing |
| Axios | 1.12.2 | HTTP Client |
| Bootstrap | 5.3.8 | CSS Framework |
| React Toastify | 11.0.5 | Notifications |
| Vite | 7.1.7 | Build Tool |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FOODIES Platform                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│    Client     │    │  Admin Panel  │    │   Backend     │
│   (React)     │    │    (React)    │    │  (Spring      │
│   Port: 5173  │    │   Port: 5174  │    │   Boot)       │
│               │    │               │    │  Port: 8080   │
└───────┬───────┘    └───────┬───────┘    └───────┬───────┘
        │                    │                    │
        └────────────────────┴────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
        ┌───────────┐  ┌──────────┐  ┌──────────┐
        │  MongoDB  │  │  AWS S3  │  │ Payment  │
        │  Database │  │  Storage │  │ Gateways │
        └───────────┘  └──────────┘  └──────────┘
                                            │
                                ┌───────────┴───────────┐
                                │                       │
                                ▼                       ▼
                        ┌──────────────┐      ┌──────────────┐
                        │  SSLCommerz  │      │  Razorpay    │
                        │  (Bangladesh)│      │ (International)│
                        └──────────────┘      └──────────────┘
```

### Payment Flow

```
User → Select Items → Add to Cart → Checkout → Select Payment Method
                                                        │
                        ┌───────────────────────────────┼───────────────────────────────┐
                        │                               │                               │
                        ▼                               ▼                               ▼
                ┌───────────────┐             ┌───────────────┐              ┌───────────────┐
                │  SSLCommerz   │             │   Razorpay    │              │      COD      │
                │    Gateway    │             │    Gateway    │              │  Confirmation │
                └───────┬───────┘             └───────┬───────┘              └───────┬───────┘
                        │                             │                              │
        ┌───────────────┼───────────────┐            │                              │
        │               │               │            │                              │
        ▼               ▼               ▼            ▼                              │
    ┌───────┐      ┌───────┐      ┌───────┐    ┌───────┐                          │
    │ bKash │      │Rocket │      │ Nagad │    │ Card/ │                          │
    │       │      │       │      │       │    │  UPI  │                          │
    └───┬───┘      └───┬───┘      └───┬───┘    └───┬───┘                          │
        │              │              │            │                               │
        └──────────────┴──────────────┴────────────┴───────────────────────────────┘
                                      │
                                      ▼
                            ┌───────────────────┐
                            │  Payment Success/ │
                            │  Failure/Cancel   │
                            └─────────┬─────────┘
                                      │
                                      ▼
                            ┌───────────────────┐
                            │  Update Order     │
                            │  Status & Notify  │
                            │  User             │
                            └───────────────────┘
```

---

## 📁 Project Structure

```
FOODIES/
├── 📂 foodiesapi/              # Spring Boot Backend API
│   ├── src/main/java/
│   │   └── swe/utin/foodiesapi/
│   │       ├── config/         # Configuration classes
│   │       ├── controller/     # REST Controllers
│   │       ├── entity/         # MongoDB Entities
│   │       ├── enums/          # Enumerations
│   │       ├── io/             # Input/Output DTOs
│   │       ├── repository/     # MongoDB Repositories
│   │       ├── security/       # Security & JWT
│   │       └── service/        # Business Logic
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   └── README.md
│
├── 📂 foodies/                 # Customer Frontend (React)
│   ├── src/
│   │   ├── assets/            # Images & static files
│   │   ├── components/        # React Components
│   │   │   ├── ExploreMenu/
│   │   │   ├── FoodDisplay/
│   │   │   ├── FoodItem/
│   │   │   ├── Header/
│   │   │   ├── Login/
│   │   │   ├── Menubar/
│   │   │   └── Register/
│   │   ├── pages/             # Page Components
│   │   │   ├── Cart/
│   │   │   ├── ContactUs/
│   │   │   ├── ExploreFood/
│   │   │   ├── FoodDetails/
│   │   │   ├── Home/
│   │   │   ├── PlaceOrder/
│   │   │   ├── PaymentSuccess/
│   │   │   ├── PaymentFailure/
│   │   │   └── PaymentCancel/
│   │   ├── context/           # React Context
│   │   ├── service/           # API Services
│   │   └── util/              # Utility Functions
│   ├── package.json
│   └── README.md
│
├── 📂 adminpanel/              # Admin Dashboard (React)
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── menubar/
│   │   │   └── sidebar/
│   │   ├── pages/
│   │   │   ├── AddFood/
│   │   │   ├── ListFood/
│   │   │   └── Orders/
│   │   └── services/
│   ├── package.json
│   └── README.md
│
├── 📂 img/                     # Documentation Images
│   ├── Home.png
│   ├── Food_Category.png
│   ├── Explore Food.png
│   ├── Cart.png
│   └── Payment.png
│
├── .gitignore
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK) 21** or higher
- **Node.js** (v18 or higher) and **npm**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Maven** (for building Java application)
- **AWS Account** (for S3 image storage)
- **SSLCommerz Account** (for Bangladesh payments)
- **Razorpay Account** (for international payments)
- **Git** (for version control)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd foodiesapi
   ```

2. **Configure application properties:**
   
   Copy the template and create `application.properties`:
   ```bash
   cp application.properties.template src/main/resources/application.properties
   ```

   Edit `src/main/resources/application.properties`:
   ```properties
   # Server Configuration
   server.port=8080

   # MongoDB Configuration
   spring.data.mongodb.uri=mongodb://localhost:27017/foodiesdb
   # OR for MongoDB Atlas:
   # spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/foodiesdb

   # JWT Configuration
   jwt.secret.key=your-secret-key-here-minimum-256-bits-long
   jwt.expiration.time=86400000

   # AWS S3 Configuration
   aws.s3.region=us-east-1
   aws.s3.bucket.name=your-bucket-name
   aws.access.key.id=YOUR_AWS_ACCESS_KEY
   aws.secret.access.key=YOUR_AWS_SECRET_KEY

   # SSLCommerz Configuration (Bangladesh Payments)
   sslcommerz.store.id=your-store-id
   sslcommerz.store.password=your-store-password
   sslcommerz.api.url=https://sandbox.sslcommerz.com/gwprocess/v4/api.php
   sslcommerz.validation.url=https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php
   # For production:
   # sslcommerz.api.url=https://securepay.sslcommerz.com/gwprocess/v4/api.php
   # sslcommerz.validation.url=https://securepay.sslcommerz.com/validator/api/validationserverAPI.php

   # Razorpay Configuration (International Payments)
   payment_key=your-razorpay-key-id
   payment_secret_key=your-razorpay-key-secret

   # Application URLs
   app.frontend.url=http://localhost:5173
   app.backend.url=http://localhost:8080
   ```

3. **Build the project:**
   ```bash
   ./mvnw clean install
   ```

4. **Run the application:**
   ```bash
   ./mvnw spring-boot:run
   ```

   The API will be available at `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd foodies
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API endpoint:**
   
   Create a `.env` file (if needed) or update the API base URL in service files:
   ```javascript
   // src/service/authService.js, foodService.js, etc.
   const API_BASE_URL = 'http://localhost:8080/api';
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

### Admin Panel Setup

1. **Navigate to admin panel directory:**
   ```bash
   cd adminpanel
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API endpoint:**
   
   Update the API base URL in service files:
   ```javascript
   // src/services/foodService.js, etc.
   const API_BASE_URL = 'http://localhost:8080/api';
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   The admin panel will be available at `http://localhost:5174`

---

## 💳 Payment Integration

FOODIES supports multiple payment gateways to provide flexibility for customers worldwide.

### SSLCommerz (Bangladesh)

**Supported Payment Methods:**
- 📱 **bKash** - Mobile Financial Service
- 📱 **Rocket** - Mobile Financial Service  
- 📱 **Nagad** - Mobile Financial Service
- 💳 **Credit/Debit Cards** - Visa, Mastercard, American Express

**Integration Details:**
- Sandbox URL: `https://sandbox.sslcommerz.com`
- Production URL: `https://securepay.sslcommerz.com`
- Payment flow: Initialize → Redirect to Gateway → Payment → Callback → Validation

**Order Request Example:**
```json
{
  "orderedItems": [
    {
      "foodId": "123",
      "foodName": "Chicken Burger",
      "quantity": 2,
      "price": 500
    }
  ],
  "userAddress": "House 23, Road 5, Dhanmondi, Dhaka-1205",
  "amount": 1000,
  "phoneNumber": "01712345678",
  "email": "customer@example.com",
  "customerName": "Ahmed Hassan",
  "paymentGateway": "SSLCOMMERZ",
  "paymentMethod": "bkash"
}
```

### Razorpay (International)

**Supported Payment Methods:**
- 💳 **Cards** - Visa, Mastercard, Amex, Discover
- 🏦 **Net Banking** - All major banks
- 📱 **UPI** - Google Pay, PhonePe, etc.
- 💰 **Wallets** - Paytm, PhonePe, etc.

**Integration Details:**
- API Endpoint: `https://api.razorpay.com/v1/`
- Payment flow: Create Order → Initialize Payment → Verify Signature → Confirm

**Order Request Example:**
```json
{
  "orderedItems": [...],
  "userAddress": "123 Street, City, Country",
  "amount": 2500,
  "phoneNumber": "+1234567890",
  "email": "customer@example.com",
  "customerName": "John Doe",
  "paymentGateway": "RAZORPAY",
  "paymentMethod": "card"
}
```

### Cash on Delivery (COD)

Simple and straightforward - pay when you receive your order.

**Order Request Example:**
```json
{
  "orderedItems": [...],
  "userAddress": "Complete Delivery Address",
  "amount": 1500,
  "phoneNumber": "01712345678",
  "email": "customer@example.com",
  "customerName": "Customer Name",
  "paymentGateway": "COD",
  "paymentMethod": "cod"
}
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login and get JWT token | No |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users/profile` | Get current user profile | Yes |
| PUT | `/users/profile` | Update user profile | Yes |

### Food Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/foods` | Get all food items | No |
| GET | `/foods/{id}` | Get food by ID | No |
| GET | `/foods/category/{category}` | Get foods by category | No |
| POST | `/foods` | Create new food item | Yes (Admin) |
| PUT | `/foods/{id}` | Update food item | Yes (Admin) |
| DELETE | `/foods/{id}` | Delete food item | Yes (Admin) |

### Cart Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/cart` | Get user's cart | Yes |
| POST | `/cart` | Add item to cart | Yes |
| PUT | `/cart/{id}` | Update cart item | Yes |
| DELETE | `/cart/{id}` | Remove item from cart | Yes |
| DELETE | `/cart/clear` | Clear entire cart | Yes |

### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/orders/create` | Create order with payment | Yes |
| GET | `/orders` | Get user's orders | Yes |
| GET | `/orders/{id}` | Get order details | Yes |
| GET | `/orders/all` | Get all orders | Yes (Admin) |
| PUT | `/orders/{id}/status` | Update order status | Yes (Admin) |

### Payment Callback Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/payment/success` | Payment success callback | No |
| POST | `/payment/failure` | Payment failure callback | No |
| POST | `/payment/cancel` | Payment cancel callback | No |

**Authentication Header:**
```
Authorization: Bearer <JWT_TOKEN>
```

For complete API documentation, import the Postman collection:
```
foodiesapi/Foodies_Payment_API.postman_collection.json
```

---

## 📸 Screenshots

### Home Page
![Home Page](./img/Home.png)
*Browse and explore delicious food items*

### Food Categories
![Food Categories](./img/Food_Category.png)
*Filter food by categories*

### Explore Food
![Explore Food](./img/Explore%20Food.png)
*View detailed food information*

### Shopping Cart
![Shopping Cart](./img/Cart.png)
*Manage your cart items*

### Payment Gateway
![Payment](./img/Payment.png)
*Secure payment with multiple options*

---

## 🔐 Environment Variables

### Backend (Production)

Create a `.env` file or set environment variables:

```bash
# MongoDB
SPRING_DATA_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foodiesdb

# JWT
JWT_SECRET_KEY=your-production-secret-key-minimum-256-bits
JWT_EXPIRATION_TIME=86400000

# AWS S3
AWS_S3_REGION=us-east-1
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# SSLCommerz
SSLCOMMERZ_STORE_ID=your-store-id
SSLCOMMERZ_STORE_PASSWORD=your-store-password

# Razorpay
PAYMENT_KEY=your-razorpay-key
PAYMENT_SECRET_KEY=your-razorpay-secret

# URLs
APP_FRONTEND_URL=https://your-domain.com
APP_BACKEND_URL=https://api.your-domain.com
```

### Frontend & Admin Panel (Production)

Create `.env.production`:

```bash
VITE_API_BASE_URL=https://api.your-domain.com/api
```

---

## 🚢 Deployment

### Backend Deployment

**Option 1: Traditional JAR Deployment**

```bash
cd foodiesapi
./mvnw clean package -DskipTests
java -jar target/foodiesapi-0.0.1-SNAPSHOT.jar
```

**Option 2: Docker Deployment**

Create `Dockerfile` in `foodiesapi/`:
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
docker run -p 8080:8080 --env-file .env foodiesapi
```

**Option 3: Cloud Platforms**
- AWS Elastic Beanstalk
- Google Cloud Run
- Heroku
- Azure App Service

### Frontend Deployment

```bash
cd foodies
npm run build
# Deploy 'dist' folder to:
# - Vercel
# - Netlify
# - AWS S3 + CloudFront
# - GitHub Pages
```

### Admin Panel Deployment

```bash
cd adminpanel
npm run build
# Deploy 'dist' folder to hosting service
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features
- Test thoroughly before submitting PR

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

Need help? We're here for you!

- 📧 **Email:** abdulalimswe@gmail.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/abdulalimswe/foodies/issues)
- 📖 **Documentation:** Check individual README files in each directory
- 💼 **LinkedIn:** Connect with the developer

---

## 🙏 Acknowledgments

- **Spring Boot Team** - For the amazing framework
- **React Team** - For the powerful UI library
- **MongoDB** - For the flexible database
- **SSLCommerz** - For Bangladesh payment gateway
- **Razorpay** - For international payment solutions
- **AWS** - For cloud infrastructure
- **Bootstrap** - For responsive UI components
- **Vite** - For lightning-fast build tool

---

## 📊 Project Status

- ✅ Backend API - Complete
- ✅ Frontend Application - Complete
- ✅ Admin Panel - Complete
- ✅ Payment Integration - Complete
- ✅ Authentication & Authorization - Complete
- ✅ Image Upload (AWS S3) - Complete
- ✅ Responsive Design - Complete
- 🔄 Mobile Application - Planned
- 🔄 Real-time Order Tracking - Planned
- 🔄 Push Notifications - Planned

---

## 👨‍💻 Authors

- **Md Abdul Alim** - *Full Stack Developer* - [@abdulalimswe](https://github.com/abdulalimswe)

---

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

<div align="center">

**Built with ❤️ by the FOODIES Team**

[⬆ Back to Top](#-foodies---online-food-delivery-platform)

</div>
