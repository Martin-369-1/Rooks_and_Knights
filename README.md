# 📚 Rooks and Knights

**Ecommerce Chess Store** for chess enthusiasts, students, professional players, and coaches.

---

## 🛠 Features

- **User Authentication:**  
  - ✅ User registration via email or Google OAuth  
  - ✅ Admin login with predefined credentials  

- **Product Management:**  
  - 🛒 Browse products by categories and subcategories  
  - 🔍 View detailed product information, including images and descriptions  
  - ➕ Add products to the cart or wishlist  

- **Order Management:**  
  - 🏷️ Checkout process with address selection and payment options  
  - 📜 Order history and status tracking for users  
  - 🛠️ Admin capabilities for managing orders and updating status  

- **User Profile:**  
  - ✏️ Edit personal information and change passwords  
  - 🏠 Manage multiple delivery addresses  

- **Payment Integration:**  
  - 💳 Support for Razorpay payment gateway  
  - 📦 Cash on Delivery (COD) for eligible orders  

- **Admin Dashboard:**  
  - 📊 Overview of sales, revenue, and user activity with graphs  
  - 🧑‍💼 Manage users and products (add, edit, delete)  

- **Sales Reporting:**  
  - 📈 Generate and download sales reports in PDF and Excel formats  

- **Additional Features:**  
  - ❤️ Wishlist management  
  - 🎟️ Coupon application for discounts  
  - ⚠️ Error handling for payment failures  
  - 📲 OTP verification for secure login/signup  

---

## 🌐 Tech Stack

- **Backend:** Node.js, Express  
- **Frontend:** EJS (Embedded JavaScript Templates)  
- **Database:** MongoDB (hosted on Atlas)  
- **Authentication:** JWT, Google OAuth  
- **Payment:** Razorpay  

---

## 📦 Package Information

The project utilizes the following packages:

### Core Packages:
- **bcrypt:** For password hashing
- **connect-flash:** For flash messages
- **cookie-parser:** To parse cookies
- **dotenv:** For environment variable management
- **ejs:** For rendering HTML views
- **express:** Web framework for Node.js
- **mongoose:** For MongoDB object modeling
- **nodemailer:** To send emails
- **razorpay:** Razorpay payment gateway integration

### Development Packages:
- **nodemon:** Automatically restarts the server during development

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

- **Server Configuration:**
  - `PORT=3000`
  - `APP_TITLE="Rooks and Knights"`
  - `APP_DOMAIN="http://localhost:3000"`

- **MongoDB Configuration:**
  - `MONGO_URI="mongodb://username:password@host:port/database"`

- **Payment Gateway Configuration:**
  - `RAZORPAY_KEY_ID="your_razorpay_key_id"`
  - `RAZORPAY_KEY_SECRET="your_razorpay_key_secret"`

- **Cookie and Session Configuration:**
  - `COOKIE_SECRET="your_cookie_secret"`
  - `COOKIE_VALID_MINUTES=60`
  - `ACCESS_TOKEN_SECRET="your_access_token_secret"`
  - `SESSION_SECRET="your_session_secret"`
  - `OTP_EXPIRY_MINUTES=5`

- **Email Configuration:**
  - `EMAIL_USER="your_email@example.com"`
  - `EMAIL_PASS="your_email_password"`

- **Google OAuth Configuration:**
  - `GOOGLE_CLIENT_ID="your_google_client_id"`
  - `GOOGLE_CLIENT_SECRET="your_google_client_secret"`
  - `GOOGLE_CALLBACK_URL="your_google_callback_url"`

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Martin-369-1/Rooks_and_Knights.git
   ```

2. Navigate into the project directory:
   ```bash
   cd Rooks_and_Knights
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the application:
   ```bash
   npm start
   ```

   For development mode, use:
   ```bash
   npm run dev
   ```

---

## 📧 Contact

For any inquiries or issues, please contact:  
**Author:** Ayush Martin  
**Email:** ayushmartin06@gmail.com 

---

## 🚀 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more information.

---