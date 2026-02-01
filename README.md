# 🚀 Real-Time Collaborative Coding Platform

A full-stack **real-time coding interview & pair-programming platform**
that combines **live code editing**, **code execution**, and **video
calling** in a single seamless experience.

Designed for **technical interviews, mock interviews, pair programming,
and collaborative problem solving**.

------------------------------------------------------------------------

## ✨ Features

### 🧑‍💻 Coding Experience

-   Live Monaco Editor (VS Code--like experience)
-   Multiple programming languages support
-   Starter code per problem
-   Test-case validation with expected output comparison
-   Instant execution using Piston API

### 📞 Real-Time Communication

-   Built-in video calling using Stream Video SDK
-   Real-time chat support
-   Host & participant role handling
-   Auto-connect when participant joins

### 🔄 Session Management

-   Host creates coding session
-   Participant joins via session link
-   Automatic session syncing using React Query
-   Session auto-refetch when new user joins
-   Secure authentication with cookies & JWT

### 🔐 Authentication & Security

-   JWT-based authentication
-   Password hashing using bcrypt
-   HTTP-only cookies
-   Protected routes

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

-   React
-   React Router
-   Monaco Editor
-   React Query
-   Tailwind CSS
-   Stream Video React SDK

### Backend

-   Node.js
-   Express.js
-   MongoDB + Mongoose
-   Stream Video & Chat SDK
-   JWT Authentication

### APIs & Services

-   Piston API -- Code execution
-   Stream Video SDK -- Video calling
-   Stream Chat -- Real-time chat

------------------------------------------------------------------------

## 📂 Project Structure

   root
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── context
│   │   ├── data
│   │   └── lib
│   └── package.json
│
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   ├── middleware
│   ├── utils
│   ├── index.js
│   └── package.json
│
└── README.md


------------------------------------------------------------------------

## ⚙️ Backend Dependencies

-   express -- REST API framework
-   mongoose -- MongoDB ODM
-   jsonwebtoken -- Authentication
-   bcrypt -- Password hashing
-   cookie-parser -- Cookie handling
-   cors -- Cross-origin requests
-   dotenv -- Environment variables
-   nanoid -- Unique session IDs
-   @stream-io/node-sdk -- Video call tokens
-   stream-chat -- Real-time chat

------------------------------------------------------------------------

## 🔐 Environment Variables

### Backend (.env)

PORT=3000\
MONGO_URI=your_mongodb_connection_string\
JWT_SECRET=your_jwt_secret\
STREAM_API_KEY=your_stream_api_key\
STREAM_API_SECRET=your_stream_api_secret

### Frontend (.env)

VITE_API_URL=http://localhost:5000\
VITE_STREAM_API_KEY=your_stream_api_key

------------------------------------------------------------------------

## 🚀 Getting Started

### Backend

    cd backend
    npm install
    npm start

### Frontend

    cd frontend
    npm install
    npm run dev

------------------------------------------------------------------------

## 🧪 How a Session Works

1.  Host creates a session
2.  Participant joins via link
3.  Video call connects automatically
4.  Code is written and executed
5.  Test cases are validated
6.  Host ends the session

------------------------------------------------------------------------

## 🧭 Future Improvements

-   Timed interviews
-   Multi-participant sessions
-   AI interview feedback
-   Session recording
-   Analytics dashboard

------------------------------------------------------------------------

## 📜 License

ISC License
