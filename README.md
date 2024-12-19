# 🛍️ E-Commerce Store

Welcome to the **E-Commerce Store**! This project is a modern, full-featured e-commerce platform built with React, Zustand, Express.js, and MongoDB. It includes robust authentication, a rich product catalog, and a smooth user experience. 🚀

---

## 🌟 Features

### **Frontend**
- 📋 **Landing Page**: Browse products with search and filter capabilities.
- 📦 **Single Product Page**: View product details, reviews, and add items to the cart.
- ❤️ **Wishlist**: Save favorite items for later.
- 🛒 **Cart**: Manage items, apply coupon codes, and see a summary.
- ✍️ **Reviews**: Post reviews with images, edit/delete reviews, and rich-text support.
- 🚚 **Order Tracking**: View order history, track orders, and cancel them.
- 📍 **Address Management**: Add, edit, or remove shipping addresses.
- 🔑 **Authentication**: Login/signup with phone, email, password, and Google OAuth.

### **Backend**
- 🔒 **Auth Service**: JWT-based authentication with refresh tokens.
- 🛍️ **Product Service**: Manage products, rich descriptions, and user reviews.
- 🛒 **Cart Service**: Synchronize cart state for logged-in and guest users.
- 📦 **Order Service**: Handle order placement, cancellations, and tracking.
- 💰 **Coupon Service**: Validate and calculate discounts on orders.
- 📍 **Address Service**: Manage user addresses.

---

## 🚀 Technologies Used

- **Frontend**:
  - React
  - Zustand
  - Axios
  - TailwindCSS
- **Backend**:
  - Express.js
  - MongoDB
  - JWT for Authentication
  - Google OAuth

---

## 🛠️ API Endpoints

### **Auth Service**
| Endpoint               | Method | Description                          |
|------------------------|--------|--------------------------------------|
| `/auth/signup`         | POST   | Create a new user.                   |
| `/auth/login`          | POST   | Login with email/phone and password. |
| `/auth/google-login`   | POST   | Login with Google OAuth.             |
| `/auth/logout`         | POST   | Logout user.                         |
| `/auth/me`             | GET    | Get logged-in user details.          |

### **Product Service**
| Endpoint                     | Method | Description                           |
|------------------------------|--------|---------------------------------------|
| `/products`                  | GET    | Fetch all products.                   |
| `/products/:id`              | GET    | Fetch single product details.         |
| `/products/:id/reviews`      | GET    | Fetch reviews for a product.          |
| `/products/:id/reviews`      | POST   | Add a review.                         |
| `/reviews/:reviewId`         | PUT    | Edit a review.                        |
| `/reviews/:reviewId`         | DELETE | Delete a review.                      |

### **Cart Service**
| Endpoint       | Method | Description                           |
|----------------|--------|---------------------------------------|
| `/cart`        | GET    | Fetch user’s cart.                   |
| `/cart`        | POST   | Add item to cart.                     |
| `/cart/:itemId`| PUT    | Update item quantity in cart.         |
| `/cart/:itemId`| DELETE | Remove item from cart.                |

### **Order Service**
| Endpoint             | Method | Description                           |
|----------------------|--------|---------------------------------------|
| `/orders`            | GET    | Fetch all user orders.               |
| `/orders/:id`        | GET    | Fetch order details.                 |
| `/orders`            | POST   | Place a new order.                   |
| `/orders/:id/cancel` | POST   | Cancel an order.                     |
| `/orders/:id/track`  | GET    | Track order status.                  |

### **Address Service**
| Endpoint          | Method | Description                           |
|-------------------|--------|---------------------------------------|
| `/addresses`      | GET    | Fetch all user addresses.            |
| `/addresses`      | POST   | Add a new address.                   |
| `/addresses/:id`  | PUT    | Edit an address.                     |
| `/addresses/:id`  | DELETE | Remove an address.                   |

### **Coupon Service**
| Endpoint               | Method | Description                           |
|------------------------|--------|---------------------------------------|
| `/coupons/validate`    | POST   | Validate and apply a coupon.         |

---

## 🛒 Installation

### **Frontend**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ecommerce-frontend.git
   cd ecommerce-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### **Backend**
1. Clone the repository:
   ```bash
   git clone https://github.com/zxdhiru/ecommerce.git
   cd ecommerce
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - `.env` file:
     ```env
     PORT=3000
     JWT_SECRET=your_jwt_secret
     MONGO_URI=your_mongodb_url
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     ```
4. Start the server:
   ```bash
   npm start
   ```

---

## 📖 Usage

1. Visit the frontend app at `http://localhost:5173` (if using Vite).
2. Use the backend API for all features.
3. Customize and extend features as needed.

---

## 📦 Deployment

1. Deploy the **Frontend** on platforms like Vercel or Netlify.
2. Deploy the **Backend** on AWS, Heroku, or any cloud service.
3. Use Docker for containerization if required.

---

## 📌 Future Enhancements
- Add push notifications for order updates.
- Implement admin dashboard for managing products and orders.
- Enable sharing wishlists via social media.

---

Happy coding! 🎉
