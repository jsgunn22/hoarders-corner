import { useState } from "react";
import { CREATE_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

export default function SignupForm() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);
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
      const { data } = await createUser({
        variables: { ...formState },
      });

      Auth.login(data.createUser.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>New user sign up</h2>
      {data ? (
        <h2>
          You are signed up! <Link to="/">Back to Home</Link>
        </h2>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label form="username-signup">Username</label>
            <input
              id="username-signup"
              type="text"
              name="username"
              value={formState.username}
              onChange={handleFormChange}
            ></input>
          </div>
          <div>
            <label form="email-signup">Email</label>
            <input
              id="email-signup"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleFormChange}
            ></input>
          </div>
          <div>
            <label form="password-signup">Password</label>
            <input
              id="password-signup"
              placeholder="******"
              type="password"
              name="password"
              value={formState.password}
              onChange={handleFormChange}
            ></input>
          </div>
          <div>
            <label form="avatar-signup">Avatar URL</label>
            <input
              id="avatar-signup"
              type="text"
              name="avatar"
              value={formState.avatar}
              onChange={handleFormChange}
            ></input>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      )}

      {error && <div>{error.message}</div>}
    </div>
  );
}
