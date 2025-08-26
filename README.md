🔐 Authentication System (MERN Stack)
A full-featured, secure, and modern user authentication system built with the MERN stack (MongoDB, Express.js, React, Node.js). This application provides a seamless user experience for registration, login, and profile management with robust security measures.

https://img.shields.io/badge/MERN-Full%2520Stack-green?style=for-the-badge
https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge&logo=jsonwebtokens

✨ Features
User Registration & Login: Secure sign-up and sign-in with form validation.

JWT Authentication: Stateless user sessions using JSON Web Tokens for enhanced security.

Password Hashing: User passwords are encrypted using bcryptjs before storing in the database.

Protected Routes: Certain routes within the React app are protected and require a valid token for access.

User Profile Dashboard: A personalized dashboard users see after successful login.

Logout Functionality: Secure logout that clears the user token.

Responsive Design: The frontend is built to be responsive and user-friendly on various devices.

🛠️ Tech Stack
This project is built with a powerful combination of technologies:

Frontend:
React - A JavaScript library for building user interfaces.

React Router DOM - For handling navigation and routing between components.

Axios - A promise-based HTTP client for making API requests to the backend.

CSS3 - For styling the components.

Backend:
Node.js - A JavaScript runtime environment for the server.

Express.js - A web application framework for Node.js to build RESTful APIs.

MongoDB - A NoSQL database for storing user data.

Mongoose - An ODM (Object Data Modeling) library for MongoDB and Node.js.

JSON Web Token (JWT) - For creating access tokens that authenticate users.

bcryptjs - For hashing passwords to keep them secure.

CORS - Middleware to enable Cross-Origin Resource Sharing.

📦 Installation & Setup
Follow these steps to set up the project locally on your machine.

Prerequisites
Node.js (v14 or higher)

npm or yarn

MongoDB Atlas account or a local MongoDB installation

1. Clone the Repository
bash
git clone https://github.com/usamafaheem-dev/Authentication-System-APP.git
cd Authentication-System-APP
2. Backend Setup
bash
# Navigate to the backend directory
cd backend

# Install all dependencies
npm install

# Create a .env file in the backend directory and add your environment variables
touch .env
Add the following to your .env file:

env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here
Replace your_mongodb_connection_string_here with your MongoDB URI and choose a strong JWT_SECRET.

3. Frontend Setup
bash
# Navigate to the frontend directory (from the root)
cd frontend

# Install all dependencies
npm install
4. Running the Application
Start the Backend Server:

bash
cd backend
npm start
# Server runs on http://localhost:5000
Start the Frontend Development Server:

bash
cd frontend
npm start
# Client runs on http://localhost:3000
Open http://localhost:3000 in your browser to use the application.

🚀 Usage
Register: Navigate to the sign-up page and create a new account.

Login: Use your credentials on the login page.

Access Dashboard: Upon successful login, you will be redirected to your protected profile dashboard.

Logout: Click the logout button to securely end your session.

📁 Project Structure
text
Authentication-System-APP/
├── backend/
│   ├── config/
│   │   └── database.js     # MongoDB connection setup
│   ├── controllers/
│   │   └── userController.js # Logic for login, register, profile
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification middleware
│   ├── models/
│   │   └── User.js          # Mongoose User schema
│   ├── routes/
│   │   └── userRoutes.js    # API routes for user actions
│   ├── .env
│   ├── package.json
│   └── server.js           # Main server entry point
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/     # Reusable React components
    │   ├── pages/         # Main pages (Login, Register, Dashboard)
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── package.json
    └── ...
🔒 Security Highlights
Passwords are hashed using bcryptjs (salt rounds: 12).

JWT tokens are used to maintain secure, stateless user sessions.

Protected API endpoints and frontend routes verify the token's validity.

Sensitive configuration keys (like JWT_SECRET and MONGO_URI) are stored in environment variables.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📄 License
This project is open source and available under the MIT License.

👨‍💻 Developer
Usama Faheem

GitHub: @usamafaheem-dev

LinkedIn: [Your LinkedIn Profile Link] (Optional: Add if you have one)

⭐ Don't forget to star this repo if you found it helpful!

