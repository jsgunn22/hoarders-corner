import { Link } from "react-router-dom";

export default function Navbar() {
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
      <div>
        <Link to="/login">
          <h1>Login</h1>
        </Link>
      </div>
    </nav>
  );
}
