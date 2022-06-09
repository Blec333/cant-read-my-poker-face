import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import SignUp from "./SignUp";

import Auth from "../../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ playerName: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handlePlayerNameChange = (event) => {
    const { value } = event.target;
    setFormState({
      ...formState,
      playerName: value,
    });
    console.log(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setFormState({
      ...formState,
      password: value,
    });
    console.log(value);
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      playerName: "",
      password: "",
    });
  };

  return (
    <div className="bg-white h-screen w-screen flex justify-center items-center">
      <div className="px-6 py-3 rounded border w-64">
        <div className="flex flex-col items-center justify-center mb-4">
          <h2 className="text-2xl font-bold">Login</h2>
          <div className="card-body">
            {" "}
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className={
                    "border mb-2 py-2 px-3 rounded focus:text-neutral-content w-full focus:bg-neutral"
                  }
                  placeholder="Your player name"
                  onChange={handlePlayerNameChange}
                />
                <input
                  className={
                    "border mb-2 py-2 px-3 rounded focus:text-neutral-content w-full focus:bg-neutral"
                  }
                  placeholder="******"
                  onChange={handlePasswordChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
                <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <Link to={SignUp}>Sign Up</Link>
                </p>
              </form>
            )}
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
