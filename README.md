Alumnos App
A web application for managing university students, built with React, TypeScript, Node.js, Express, and MongoDB.
Prerequisites

Node.js (v16 or higher)
MongoDB
Google reCAPTCHA keys
Google OAuth credentials

Setup Instructions
Backend

Navigate to server/.
Install dependencies: npm install.
Create a .env file with:MONGO_URI=mongodb://localhost:27017/alumnos
JWT_SECRET=your_jwt_secret
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret


Start the server: npm run dev.

Frontend

Navigate to client/.
Install dependencies: npm install.
Create a .env file with:REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_site_key


Start the client: npm start.

Features

Login with username/password and Google OAuth.
Secure JWT authentication with bcrypt password hashing.
Google reCAPTCHA for human verification.
Messaging system for students.
Responsive navigation with breadcrumbs.
Custom 404 and 500 error pages.
Student list with search and filters.

Repository
GitHub Repository
Manual
See manual.pdf for detailed implementation and screenshots.
Video
A 5-minute presentation video is available in presentation.mp4.# alumnos_app
