import { useState } from "react";
import { CREATE_USER } from "../../../utils/mutations";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import Auth from "../../../utils/auth";

import Input from "../../Atoms/Input";
import Button from "../../Atoms/Botton";

export default function SignupForm() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
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
      {data ? (
        <h2>
          You are signed up! <Link to="/">Back to Home</Link>
        </h2>
      ) : (
        <div className="px-4">
          <form
            onSubmit={handleFormSubmit}
            className={`flex flex-col gap-4 mt-6`}
          >
            <h4 className="text-h4 font-medium ">Sign Up</h4>
            <Input
              label="Username"
              type="text"
              name="username"
              value={formState.username}
              change={handleFormChange}
            />
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

            <Button label="Sign Up" type="submit" />
          </form>
        </div>
      )}

      {error && <div>{error.message}</div>}
    </div>
  );
}
