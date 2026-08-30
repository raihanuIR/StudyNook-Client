# StudyNook – Library Study Room Booking System

StudyNook is a responsive full‑stack web application designed for students and library users to browse, list, and book private study rooms in university libraries. The platform automatically prevents double‑bookings using intelligent time‑conflict detection, allows room owners to manage listings, and offers clean dashboards for booking management.

**Live Site URL:** [https://studynook-booking.web.app](https://studynook-booking.web.app) (Placeholder - Replace with your actual deployed URL)

---

## Key Features

* **Double‑Booking Prevention**: Implements a robust time-conflict verification engine on the backend using interval overlaps, ensuring no two bookings ever clash.
* **MERN CRUD Architecture**: Full create, read, update, and delete actions for room listings. Users can manage capacities, floor levels, description details, and selected amenities.
* **HTTP‑only Cookie JWT Auth**: Secure authentication utilizing JSON Web Tokens stored safely inside HTTP-only, secure, and SameSite-restricted cookies.
* **Firebase Google OAuth Integration**: Instant sign-in and registration through Google OAuth using Firebase Authentication alongside traditional email/password credentials.
* **Dark / Light Theme Toggle**: A fluid, responsive theme switcher persisted locally in the browser (`localStorage`) and integrated natively with Tailwind CSS class styling.
* **Unified Dashboard Panels**: Organized dashboards for managing room listings (`My Listings`) and viewing or cancelling bookings (`My Bookings`).

---

## Tech Stack

* **Frontend**: React (Vite), Tailwind CSS v4, React Router DOM, Lucide Icons, React Hot Toast, Firebase client SDK, Axios.
* **Backend**: Node.js, Express, MongoDB (Mongoose ODM), jsonwebtoken, bcryptjs, cookie-parser, cors.
* **Deployments**: Vercel/Firebase Hosting (Client), Render/Cyclic (Server).

---

## Project Structure

```
Assign 9/
├── client/                 # React/Vite Frontend
│   ├── src/
│   │   ├── components/     # Navbar, Footer, RoomCard, Loader, BookingModal, PrivateRoute
│   │   ├── context/        # AuthContext, ThemeContext
│   │   ├── pages/          # Home, Rooms, RoomDetails, AddRoom, MyListings, MyBookings, Login, Register, NotFound
│   │   ├── utils/          # api.js (Axios default settings)
│   │   └── index.css       # Tailwind v4 import & custom styles
├── server/                 # Node/Express Backend
│   ├── config/             # DB connector
│   ├── models/             # User, Room, Booking Mongoose schemas
│   ├── routes/             # auth, room, and booking controllers
│   └── middleware/         # authMiddleware
```

---

## Installation & Setup

### 1. Backend Setup
1. Open a terminal in the `server/` directory:
   ```bash
   cd server
   ```
2. Install server packages:
   ```bash
   npm install
   ```
3. Create a `.env` file inside `server/` with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a terminal in the `client/` directory:
   ```bash
   cd client
   ```
2. Install frontend packages:
   ```bash
   npm install
   ```
3. Create a `.env` file inside `client/` and insert your Firebase configuration values:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
