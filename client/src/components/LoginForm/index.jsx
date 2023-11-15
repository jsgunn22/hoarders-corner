import { useState } from "react";
import { LOGIN_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

export default function LoginForm() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: { ...formState } });
      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id="login-card">
        {data ? (
          <h2>
            You are logged in!<Link to="/">Back to Home</Link>
          </h2>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <h2>Login to existing account</h2>
            <div>
              <label form="email-login">Email</label>
              <input
                id="email-login"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleFormChange}
              ></input>
            </div>
            <div>
              <label form="password-login">Password</label>
              <input
                id="password-login"
                name="password"
                value={formState.password}
                type="password"
                onChange={handleFormChange}
              ></input>
            </div>
            <button type="submit">Login</button>
          </form>
        )}

        {error && <div>{error.message}</div>}
      </div>
    </>
  );
}
