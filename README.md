# 🔐 Advanced MERN Stack Authentication System

A full-featured, secure, and modern user authentication system built with the MERN stack. This application goes beyond basic login/logout, featuring email verification, password recovery via OTP, and a beautiful, accessible UI built with modern components.

**Live Demo: [https://authmernapp.onrender.com/](https://authmernapp.onrender.com/)**

---


## ✨ Screenshots

| Register Account | OTP Verification | Login Page | Forgot Password |
| :---: | :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/6de1cd0f-d053-40a0-8f77-7f5566801a8c" width="400" /> | <img src="https://github.com/user-attachments/assets/4ade9bb7-94f1-4940-89ee-3808cf205ac8" width="400" /> | <img src="https://github.com/user-attachments/assets/7b77fb55-4e51-43e1-83a0-562458baf07a" width="400" /> | <img src="https://github.com/user-attachments/assets/288d1e02-b0ac-4dd2-802d-d1e66e635070" width="400" /> |

| Dashboard | Email Sent | Reset Password | Profile Page |
| :---: | :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/da260152-007b-47c5-afa5-578be6cf3957" width="400" /> | <img src="https://github.com/user-attachments/assets/8871542a-cdbd-4082-9e09-7e71b77477ee" width="400" /> | <img src="https://github.com/user-attachments/assets/9906aa8f-2a0c-42e6-93e7-5a6dc161c411" width="400" /> | <img src="https://github.com/user-attachments/assets/ba3af67f-8734-4997-bcf2-f2ca7b85f3b5" width="400" /> |
 
## 🚀 Advanced Features

- **User Registration with OTP Verification**: New users must verify their email via a One-Time Password (OTP) sent via Nodemailer before they can log in.
- **Secure JWT Authentication**: Stateless user sessions using JSON Web Tokens.
- **Forgot Password Flow**: Users can reset their password by requesting an OTP on their registered email.
- **Password Hashing**: Uses `bcryptjs` to securely store passwords.
- **Protected Routes**: Access to the dashboard and profile is only granted after successful login.
- **Responsive & Modern UI**: Built with a combination of **Shadcn** components and custom CSS for a sleek, accessible experience.
- **User Profile Management**: Users can view and manage their profile information.


## 🛠️ Tech Stack

### **Frontend:**
- **React** - A JavaScript library for building user interfaces.
- **React Router DOM** - For handling navigation between pages.
- **Axios** - For making HTTP requests to the backend API.
- **Shadcn/UI** - A beautifully designed component library for building modern interfaces.
- **CSS3** - For custom styling and layout.

### **Backend:**
- **Node.js** - JavaScript runtime for the server.
- **Express.js** - Web framework for building RESTful APIs.
- **MongoDB with Mongoose** - Database and ODM for data storage and modeling.
- **JWT (jsonwebtoken)** - For generating and verifying authentication tokens.
- **Bcryptjs** - For hashing and comparing passwords.
- **Nodemailer** - For sending OTP emails for verification and password reset.
- **OTP Generator** - For generating secure One-Time Passwords.

---

## 📦 Installation & Setup

To run this project locally, follow these steps:

### Prerequisites
- Node.js and npm installed on your machine.
- A MongoDB Atlas account or a local MongoDB installation.
- A Gmail account (or another email service) to configure Nodemailer.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/usamafaheem-dev/Authentication-System-APP.git
    cd Authentication-System-APP
    ```

2.  **Setup Backend:**
    ```bash
    # Navigate to the backend directory
    cd backend

    # Install dependencies
    npm install

    # Create a .env file and add your environment variables
    touch .env
    ```
    Add the following to your `.env` file:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string_here
    JWT_SECRET=your_super_strong_jwt_secret_here
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_app_specific_password
    ```
    *For `EMAIL_PASS`, if using Gmail, you need to generate an [App Password](https://myaccount.google.com/apppasswords).*

    ```bash
    # Start the backend server
    npm start
    ```
    The server will run on `http://localhost:5000`.

3.  **Setup Frontend:**
    ```bash
    # Open a new terminal and navigate to the frontend directory
    cd frontend

    # Install dependencies
    npm install

    # Start the React development server
    npm start
    ```
    The client will run on `http://localhost:3000`.

---

## 📁 Project Structure
Authentication-System-APP/
├── backend/
│ ├── config/
│ │ └── database.js # Database connection setup
│ ├── controllers/
│ │ └── userController.js # Logic for all user operations (login, register, OTP, reset password)
│ ├── middleware/
│ │ └── authMiddleware.js # JWT verification middleware
│ ├── models/
│ │ └── User.js # Mongoose User Schema
│ ├── routes/
│ │ └── userRoutes.js # All authentication routes
│ ├── .env
│ ├── package.json
│ └── server.js # Main server entry point
│
└── frontend/
├── public/
├── src/
│ ├── components/ # Reusable components (often using Shadcn)
│ ├── pages/ # Main pages (Login, Register, Verify OTP, Dashboard, Forgot Password, etc.)
│ ├── App.js
│ ├── App.css
│ └── index.js
├── package.json
└── ...


---

## 🔐 How Authentication Works

1.  **Registration with OTP:**
    - User fills out the registration form.
    - Backend hashes the password and creates a user with an `isVerified: false` flag.
    - An OTP is generated, stored in the database (or temporarily in memory), and sent to the user's email via Nodemailer.
    - User must enter the correct OTP on the verification page to activate their account.

2.  **Login:**
    - Only verified users (`isVerified: true`) can log in.
    - The backend verifies the password against the hash and generates a JWT upon success.

3.  **Forgot Password:**
    - User enters their registered email on the "Forgot Password" page.
    - An OTP is sent to that email.
    - User enters the OTP and is allowed to set a new password upon successful verification.

4.  **Accessing Protected Routes:**
    - The frontend attaches the JWT to the header of requests to protected routes.
    - The backend's `authMiddleware` verifies the token before granting access to the endpoint.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/usamafaheem-dev/Authentication-System-APP/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 👨‍💻 Developer

**Usama Faheem**

- GitHub: [@usamafaheem-dev](https://github.com/usamafaheem-dev)
- LinkedIn: [Usama Faheem](https://www.linkedin.com/in/usama-faheem/)
- Portfolio: [Usama Faheem - Portfolio](https://usama-faheem-portfolio.netlify.app/)

**If you found this project helpful, please give it a ⭐!**
