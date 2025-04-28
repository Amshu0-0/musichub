import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">MusicHub</Link>
      <Link to="/create">Create Post</Link>
    </nav>
  );
}

export default Navbar;
