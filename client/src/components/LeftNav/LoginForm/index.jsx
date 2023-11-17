import { useState } from "react";
import { LOGIN_USER } from "../../../utils/mutations";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import Auth from "../../../utils/auth";

import Input from "../../Atoms/Input";
import Button from "../../Atoms/Botton";

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
      <div id="login-card ">
        {data ? (
          <h2>
            You are logged in!<Link to="/">Back to Home</Link>
          </h2>
        ) : (
          <div className="px-4">
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col gap-4 border-b-2 border-opac-neu pb-4  "
            >
              <h4 className="text-h4 font-medium mt-4">Login</h4>

              <Input
                label="Email"
                type="email"
                name="email"
                value={formState.email}
                change={handleFormChange}
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formState.password}
                change={handleFormChange}
              />
              <Button label="Login" type="submit" />
            </form>
          </div>
        )}

        {error && <div>{error.message}</div>}
      </div>
    </>
  );
}
