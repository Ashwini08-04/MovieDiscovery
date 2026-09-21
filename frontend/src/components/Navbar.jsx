import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">🎬 Movie Discovery</Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/discover">Discover</Link>
        <Link to="/wishlist">Wishlist</Link>
      </div>
    </nav>
  );
};

export default Navbar;