# 🎬 Movie Discovery App

A responsive full-stack movie discovery application built with React and Node.js, using The Movie Database (TMDB) API for movie data.

The application allows users to discover movies, search for specific movies, explore categories and genres, view movie details, save movies to a persistent wishlist, and continue exploring large result sets.

## ✨ Features

### 🎯 Movie Discovery
- Popular movies
- Featured movie section
- Trending movies
- Top Rated movies
- Now Playing movies
- Genre-based discovery
- Popular and additional genres
- Load More pagination

### 🔎 Movie Search
- Search movies using TMDB
- Search result pagination
- Load More Results
- Empty search validation
- No-results state
- Search error handling
- Return to popular movies

### 🎥 Movie Details
- Movie poster and backdrop
- Movie title
- Release date
- Rating
- Runtime
- Genres
- Movie overview
- YouTube trailer
- Similar movies
- Add/remove from wishlist

### ❤️ Wishlist
- Add movies to wishlist
- Remove movies from wishlist
- Persistent wishlist using localStorage
- Wishlist remains after reopening the application
- Dedicated Wishlist page
- Saved movie count
- Empty wishlist state

### 🕐 Recently Viewed
- Automatically tracks opened movies
- Stores recently viewed movies using localStorage
- Keeps the latest 6 movies
- Prevents duplicate entries
- Remains available after reopening the application

### 🛡️ Reliability & UX
- Loading states
- Empty states
- Error states
- Missing poster fallback
- Missing rating fallback
- API request timeout
- Retry handling for temporary network failures
- TMDB rate-limit handling
- External service error handling
- Responsive design
- Long movie title handling
- Large result-set support

## 🏗️ Architecture

The frontend communicates with the Node.js backend instead of directly calling TMDB.

React Frontend
↓
Node.js + Express Backend
↓
Movie Service
↓
TMDB API

This backend abstraction keeps the external API key secure and provides centralized error handling and API processing.

## 🧩 Project Structure

MovieDiscovery/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   └── package.json
│
└── README.md

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS
- Vite

### Backend
- Node.js
- Express.js
- Axios
- CORS
- dotenv
- Nodemon

### External API
- The Movie Database (TMDB) API

### Client-side Persistence
- Browser localStorage

## 🔄 Application Data Flow

1. User interacts with the React frontend.
2. Frontend sends requests to the Node.js backend.
3. Backend validates and processes the request.
4. Movie service communicates with TMDB.
5. Backend formats the response.
6. Frontend displays the movie data.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ashwini08-04/MovieDiscovery.git
cd MovieDiscovery
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
TMDB_API_KEY=your_tmdb_api_key
```

Do not commit the `.env` file to GitHub.

## ▶️ Run the Backend

```bash
cd backend
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

## ▶️ Run the Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```
## 🔌 API Endpoints

- `GET /api/movies/popular` — Popular movies
- `GET /api/movies/trending` — Trending movies
- `GET /api/movies/top-rated` — Top rated movies
- `GET /api/movies/now-playing` — Now playing movies
- `GET /api/movies/genres` — Movie genres
- `GET /api/movies/discover` — Genre-based discovery
- `GET /api/movies/search` — Search movies
- `GET /api/movies/:id` — Movie details

## 🧠 Technical Decisions

### Backend API Abstraction
The frontend communicates with the Node.js backend instead of directly calling TMDB. This keeps the API key secure and centralizes API requests and error handling.

### Pagination
Pagination is used to handle large movie result sets without loading all results at once.

### Wishlist Persistence
Wishlist data is stored in browser localStorage so saved movies remain available after reopening the application.

### Recently Viewed
Recently viewed movies are stored locally and limited to the latest 6 movies to keep the stored data lightweight.

### Error & Retry Handling
The backend handles API errors, rate limits, timeouts and temporary network failures with retry logic and user-friendly error responses.

## 📱 Responsive Design

The application is responsive across desktop, laptop, tablet and mobile screen sizes.

Movie grids, posters, buttons and typography adapt to different screen widths.

## ⚠️ Known Limitations

- Wishlist and recently viewed data are browser/device specific.
- User authentication is not implemented.
- Movie data depends on TMDB availability and API limits.
- User-specific data is not stored in a server database.

## 🤖 AI Assistance

AI tools were used as development assistance for:

- Project planning and architecture
- API integration guidance
- Debugging and error handling
- UI/UX improvements
- Code refinement
- Technical explanations

The implementation was reviewed, tested, modified and debugged during development.

## 🔮 Future Improvements

- User authentication
- Server-side wishlist synchronization
- Personalized recommendations
- Advanced filters and sorting
- Search suggestions
- Cast and crew information
- Movie reviews
- API response caching

## 🎬 TMDB Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

Movie data and images are provided by The Movie Database (TMDB).

## 📌 Project Status

The Movie Discovery App is a working full-stack application with:

- React frontend
- Node.js + Express backend
- TMDB API integration
- Movie discovery and search
- Genre filtering
- Pagination
- Movie details and trailers
- Similar movies
- Persistent wishlist
- Recently viewed movies
- Error and retry handling
- Responsive UI