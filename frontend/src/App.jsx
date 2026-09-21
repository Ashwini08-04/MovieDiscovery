import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Wishlist from "./pages/Wishlist";
import Discover from "./pages/Discover";
import { WishlistProvider } from "./context/WishlistContext";
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";

function App() {
  return (
    <WishlistProvider>
      <RecentlyViewedProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/discover" element={<Discover />} />
          </Routes>
        </BrowserRouter>
      </RecentlyViewedProvider>
    </WishlistProvider>
  );
}
export default App;