# 🛒 AURA — Full Stack MERN E-Commerce Application

AURA is a modern full-stack e-commerce web application built using the MERN stack architecture. The project focuses on scalable frontend structure, secure authentication workflows, persistent cart management, and real-world backend integration.

The application demonstrates practical full-stack engineering concepts including JWT authentication, MongoDB integration, protected API routes, OTP-based password recovery, Redux state management, and modular feature-driven architecture.

---

## 🔗 Live Demo

Frontend Deployment:  
https://react-ecommerce-site-two.vercel.app/

> Backend deployment is currently under production preparation.

---

# ✨ Core Features

| Feature | Implementation |
| :--- | :--- |
| 🔐 User Authentication | JWT-based login & signup system |
| 📧 Forgot Password System | OTP email verification using Nodemailer |
| 🛒 Persistent Shopping Cart | Redux cart persistence with user-based storage |
| 🔎 Product Search & Filtering | Real-time filtering and category-based navigation |
| 📦 External Product API Integration | Dynamic product data fetching |
| ⚡ Modern Frontend Architecture | Feature-based scalable React structure |
| 🌐 REST API Backend | Express.js API architecture |
| 🗄️ MongoDB Database Integration | User authentication & cart persistence |
| 📱 Responsive Design | Optimized for desktop and mobile devices |

---

# 🧠 Tech Stack

## Frontend
- React
- Redux Toolkit
- React Router DOM
- Vite
- CSS3
- React Toastify

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Nodemailer

## Development Tools
- Git & GitHub
- Vercel
- Thunder Client
- VS Code

---

# 🏗️ Project Architecture

The project follows a modular and scalable architecture:

```bash
src/
├── app/
├── assets/
├── components/
├── features/
├── hooks/
├── layout/
├── redux/
├── services/
├── styles/
└── utills/

server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
└── server.js
```

---

# 🔐 Authentication Features

- User Registration
- Secure Password Hashing
- JWT Authentication
- Protected Backend Routes
- Persistent Login State
- Forgot Password Workflow
- OTP Email Verification
- Secure Password Reset Architecture

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

- Node.js (v18+ recommended)
- npm
- Git

---

# ⚙️ Frontend Setup

## 1. Clone Repository

```bash
git clone https://github.com/shiva-teja-medoju/react-ecommerce-site.git
```

## 2. Navigate Into Project

```bash
cd react-ecommerce-site
```

## 3. Install Frontend Dependencies

```bash
npm install
```

---

# ⚙️ Backend Setup

## 1. Navigate Into Server

```bash
cd server
```

## 2. Install Backend Dependencies

```bash
npm install
```

## 3. Create Environment File

Create a `.env` file inside:

```bash
server/
```

Add:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_app_password
```

---

# ▶️ Running the Project

## Start Frontend

From root folder:

```bash
npm run dev
```

## Start Backend

From server folder:

```bash
npm run server
```

---

# 📌 Current Development Status

### ✅ Completed
- Frontend Refactor
- MERN Backend Integration
- Authentication System
- Redux State Architecture
- MongoDB Integration
- OTP Email Workflow Foundation

### 🚧 In Progress
- Production Deployment
- Protected Routes Expansion
- Password Reset Completion
- Backend Production Optimization

---

# 💡 Author

## Shiva Teja Medoju

Full Stack Developer focused on scalable MERN applications, frontend architecture, and modern web experiences.

- LinkedIn: https://www.linkedin.com/in/shivatejamedoju
- GitHub: https://github.com/shiva-teja-medoju
- Email: shivatejamedoju@gmail.com
