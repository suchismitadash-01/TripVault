\# TripVault



A travel memory journal where users can log trips, upload photos, and share memories.



\## Week 1 - Project Setup and Authentication



This project implements the initial TripVault setup with JWT-based user authentication.



\## Tech Stack



Backend:

\- Node.js

\- Express.js

\- MongoDB Atlas

\- Mongoose

\- JWT

\- bcrypt

\- dotenv



Frontend:

\- React

\- Vite

\- React Router

\- Axios



\## Project Structure



TripVault/

|

|-- client/

|   |-- src/

|   |   |-- components/

|   |   |   `-- ProtectedRoute.jsx

|   |   |-- pages/

|   |   |   |-- Dashboard.jsx

|   |   |   |-- Login.jsx

|   |   |   `-- Register.jsx

|   |   |-- api.js

|   |   |-- App.jsx

|   |   |-- index.css

|   |   `-- main.jsx

|   |-- package.json

|   `-- package-lock.json

|

|-- server/

|   |-- middleware/

|   |   `-- authMiddleware.js

|   |-- models/

|   |   `-- User.js

|   |-- routes/

|   |   `-- auth.js

|   |-- .env.example

|   |-- .gitignore

|   |-- index.js

|   |-- package.json

|   `-- package-lock.json

|

`-- README.md



\## Features



\- User registration

\- Secure password hashing using bcrypt

\- User login

\- JWT-based authentication

\- Protected user profile endpoint

\- Protected dashboard

\- Logout functionality

\- MongoDB Atlas integration



\## API Endpoints



| Method | Endpoint | Description | Authentication |

| POST | /api/auth/register | Register a new user | Not required |

| POST | /api/auth/login | Login and receive JWT | Not required |

| GET | /api/auth/me | Get logged-in user information | Bearer token required |



\## Backend Setup



\### 1. Clone the repository



git clone https://github.com/suchismitadash-01/TripVault.git

cd TripVault



\### 2. Install backend dependencies



cd server

npm install



\### 3. Configure environment variables



Create a .env file inside the server directory.



PORT=5000

MONGO\_URI=<your MongoDB Atlas connection string>

JWT\_SECRET=<your JWT secret>



The .env file contains sensitive credentials and must not be committed to GitHub.



The .env.example file is included as a template.



\### 4. Start the backend



npm start



The backend runs at:



http://localhost:5000



\## Frontend Setup



Open a new terminal:



cd client

npm install

npm run dev



The frontend runs at:



http://localhost:5173



\## Authentication Flow



Register

&#x20;  |

&#x20;  v

Login

&#x20;  |

&#x20;  v

JWT Token

&#x20;  |

&#x20;  v

Protected Dashboard

&#x20;  |

&#x20;  v

Authenticated User



Unauthenticated users cannot access the protected dashboard.



\## Testing



The APIs can be tested using Thunder Client, Postman, or another API testing tool.



Register:



POST http://localhost:5000/api/auth/register



Login:



POST http://localhost:5000/api/auth/login



Get Current User:



GET http://localhost:5000/api/auth/me



For the /api/auth/me endpoint, use:



Authorization: Bearer <your-jwt-token>



\## Security



\- Passwords are hashed using bcrypt before being stored.

\- JWT is used for authentication.

\- Protected routes require a valid Bearer token.

\- Database credentials are stored in environment variables.

\- The .env file is excluded from Git using .gitignore.

\- Sensitive credentials must never be committed to GitHub.



\## GitHub Repository



https://github.com/suchismitadash-01/TripVault



\## Week 1 Status



Week 1 project setup and JWT-based authentication have been implemented and tested.

