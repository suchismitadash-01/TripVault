# TripVault 🗺️

A travel memory journal where users can log trips, upload photos, and share memories.

This is **Week 1** of the TripVault internship: project setup and JWT-based authentication.

## Tech Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
- **Frontend:** React (Vite), React Router, Axios

## Folder Structure

```
tripvault/
├── client/          # React (Vite) frontend
│   ├── src/
│   │   ├── pages/       # Login.jsx, Register.jsx, Dashboard.jsx
│   │   ├── components/  # ProtectedRoute.jsx
│   │   ├── api.js       # Axios instance
│   │   └── App.jsx
├── server/          # Node + Express backend
│   ├── models/       # User.js
│   ├── routes/       # auth.js
│   ├── middleware/   # authMiddleware.js
│   ├── .env.example
│   └── index.js
└── README.md
```

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/tripvault.git
cd tripvault
```

### 2. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` and fill in:

```
PORT=5000
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<any long random string>
```

Get a free MongoDB Atlas connection string at https://www.mongodb.com/cloud/atlas — create a free cluster, add a database user, allow your IP (or 0.0.0.0/0 for dev), and copy the connection string.

Run the server:

```bash
npm run dev
```

Server runs at `http://localhost:5000`.

### 3. Frontend setup

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

### 4. Try it out

1. Go to `http://localhost:5173/register` and create an account
2. Log in at `http://localhost:5173/login`
3. You'll be redirected to `/dashboard`, which shows your name
4. Try visiting `/dashboard` directly while logged out — you'll be redirected to `/login`

## API Endpoints

| Method | Route | Description | Auth Required |
|--------|-------|-------------|----------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Log in, returns JWT | No |
| GET | `/api/auth/me` | Get logged-in user info | Yes (Bearer token) |

## Security Notes

- Passwords are hashed with bcrypt before being saved — never stored in plain text
- JWT tokens expire after 7 days
- `.env` is git-ignored and never committed
