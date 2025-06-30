# 🎓 Alumnos App

**Alumnos App** is a full-stack web application for managing university students, built using modern technologies like **React**, **TypeScript**, **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

- 🔐 Secure login with username/password and Google OAuth
- 🧠 Google reCAPTCHA integration for human verification
- 🔑 JWT authentication with hashed passwords via bcrypt
- 📬 Messaging system between users/students
- 📋 Student list with search and filter capabilities
- 🧭 Responsive navigation with breadcrumbs
- ⚠️ Custom 404 and 500 error pages
- 🌐 Fully responsive frontend using Tailwind CSS

---

## 📦 Prerequisites

Make sure the following are installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Google reCAPTCHA keys](https://www.google.com/recaptcha/admin)
- [Google OAuth 2.0 credentials](https://console.cloud.google.com/apis/credentials)

---

## ⚙️ Setup Instructions

### 🖥️ Backend Setup (`/server`)

1. Navigate to the `server/` directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:

   ```env
   MONGO_URI=mongodb://localhost:27017/alumnos
   JWT_SECRET=your_jwt_secret
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

---

### 🌐 Frontend Setup (`/client`)

1. Navigate to the `client/` directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with:

   ```env
   VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   ```

   > ⚠️ If you're using Vite (recommended), environment variables must start with the `VITE_` prefix.

4. Start the frontend:

   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```
alumnos-app/
├── client/   # React + TypeScript frontend
└── server/   # Express + TypeScript backend
```

---


## 🧑‍💻 Author

Created with ❤️ by 
*Cristian Vargas*
*Daniel Gallegos*
*Diego Antunez*
*Karen Vazquez*
*Natalia Niebla*
