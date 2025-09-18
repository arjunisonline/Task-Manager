import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <a href="/" className="navbar-brand fw-bold">To-Do</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item"><a className="nav-link" href="/dashboard">Dashboard</a></li>
          </ul>
        </div>
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
