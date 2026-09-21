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

## Week 2 - Trip Management and CRUD Operations

Week 2 focuses on implementing complete trip management functionality in TripVault.

### Backend Trip Management

The backend provides protected CRUD APIs for managing trips.

Each trip contains:

- Title
- Destination
- Start date
- End date
- Description
- Rating
- User ownership
- Created and updated timestamps

### Trip CRUD APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/trips` | Create a new trip |
| GET | `/api/trips` | Get all trips of the logged-in user |
| GET | `/api/trips/:id` | Get a specific trip |
| PUT | `/api/trips/:id` | Update a trip |
| DELETE | `/api/trips/:id` | Delete a trip |

All trip APIs are protected using JWT authentication.

Users can access and manage only their own trips.

### Frontend Trip Management

The React frontend includes:

- Trip dashboard
- Trip cards
- Create Trip form
- Edit Trip form
- Delete Trip functionality
- Delete confirmation
- Trip title and destination display
- Start and end dates
- Trip rating
- Empty-state message
- Loading state
- Error handling
- Automatic dashboard refresh after create, edit, and delete

### Testing

The Trip CRUD APIs were tested using Thunder Client.

The following operations were successfully tested:

- Create trip
- Get all trips
- Get a single trip
- Update trip
- Delete trip
- Verify deleted trip returns `404`
- Protected API access using JWT

The frontend functionality was also tested for:

- Create Trip
- Edit Trip
- Delete Trip
- Delete confirmation
- Automatic refresh
- Loading state
- Empty state
- Error handling

### Week 2 Status

Week 2 Trip Management and CRUD Operations have been implemented and tested successfully.

The project now supports complete authenticated trip management from the React frontend through the Node.js/Express backend and MongoDB database.

## Week 3 – Photo Uploads & Public Profiles

Week 3 adds photo management and public traveller profiles to TripVault.

### Features Added

- Cloudinary integration for image uploads
- Multer-based image upload handling
- Trip cover images
- Multiple photos for each trip
- Trip details page with photo gallery
- Public traveller profiles
- Unique usernames
- User bio
- Public travel memories
- Edit Profile functionality
- Responsive profile and trip layouts

### Photo Upload

Trip photos are uploaded using Multer and stored on Cloudinary.

Supported image formats:

- JPG
- JPEG
- PNG
- WebP

Maximum file size:

- 5 MB

Cloudinary credentials are stored securely in the `.env` file and are not committed to GitHub.

### Public Profiles

Users have a public profile available at:

`/profile/:username`

The public profile displays:

- Name
- Username
- Bio
- Travel memories
- Trip destination
- Start and end dates
- Rating
- Cover image

Private information such as email addresses and passwords is not exposed through the public profile API.

### Profile Editing

Logged-in users can update:

- Username
- Bio

Profile updates are handled through the protected profile API.

### Week 3 API Endpoints

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/trips/:id/upload` | Private | Upload a trip photo |
| GET | `/api/users/:username/profile` | Public | View a public profile |
| PUT | `/api/users/profile` | Private | Update username and bio |

### Technologies Used

- React
- Node.js
- Express.js
- MongoDB
- Mongoose
- Cloudinary
- Multer
- Axios
- JWT Authentication