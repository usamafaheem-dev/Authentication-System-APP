# 🔐 Advanced MERN Stack Authentication System

A full-featured, secure, and modern user authentication system built with the MERN stack. This application goes beyond basic login/logout, featuring email verification, password recovery via OTP, and a beautiful, accessible UI built with modern components.

**Live Demo: [https://authmernapp.onrender.com/](https://authmernapp.onrender.com/)**

---


## ✨ Screenshots

| Register Account | OTP Verification | Login Page | Forgot Password |
| :---: | :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/6de1cd0f-d053-40a0-8f77-7f5566801a8c" width="400" /> | <img src="https://github.com/user-attachments/assets/9906aa8f-2a0c-42e6-93e7-5a6dc161c411" width="400" /> | <img src="https://github.com/user-attachments/assets/4ade9bb7-94f1-4940-89ee-3808cf205ac8" width="400" /> | <img src="https://github.com/user-attachments/assets/288d1e02-b0ac-4dd2-802d-d1e66e635070" width="400" /> |

| Dashboard | Email Sent | Reset Password | Profile Page |
| :---: | :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/da260152-007b-47c5-afa5-578be6cf3957" width="400" /> | <img src="https://github.com/user-attachments/assets/ba3af67f-8734-4997-bcf2-f2ca7b85f3b5" width="400" /> | <img src="https://github.com/user-attachments/assets/8871542a-cdbd-4082-9e09-7e71b77477ee" width="400" /> | <img src="https://github.com/user-attachments/assets/7b77fb55-4e51-43e1-83a0-562458baf07a" width="400" /> |
 --
 
## 🚀 Advanced Features

- **User Registration with OTP Verification**: New users must verify their email via a One-Time Password (OTP) sent via Nodemailer before they can log in.
- **Secure JWT Authentication**: Stateless user sessions using JSON Web Tokens.
- **Forgot Password Flow**: Users can reset their password by requesting an OTP on their registered email.
- **Password Hashing**: Uses `bcryptjs` to securely store passwords.
- **Protected Routes**: Access to the dashboard and profile is only granted after successful login.
- **Responsive & Modern UI**: Built with a combination of **Shadcn** components and custom CSS for a sleek, accessible experience.
- **User Profile Management**: Users can view and manage their profile information.

---

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
