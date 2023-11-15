import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

export default function Navbar() {
  const logout = () => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <nav
      style={{
        backgroundColor: "red",
        height: "56px",
        width: "100%",
        display: "flex",
      }}
    >
      <div>
        <Link to="/">
          <h1>Home</h1>
        </Link>
      </div>
      {Auth.loggedIn() ? (
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <h1>Login</h1>
          </Link>
        </div>
      )}
    </nav>
  );
}
