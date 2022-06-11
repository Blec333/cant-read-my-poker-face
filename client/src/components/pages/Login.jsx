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
    <div>
      <div className="bg-cover w-screen h-screen relative">
        <div>
          <img
            className="bg-cover w-screen h-screen"
            src="https://img.freepik.com/vetores-gratis/entrada-de-cassino-de-luxo-no-cartoon-de-cidade-tropical_33099-1503.jpg"
            alt="casino"
          />
        </div>
        <button
          className="absolute block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          data-modal-toggle="authentication-modal"
        >
          Enter Casino
        </button>

        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
        >
          <div
            className="px-6 py-3 rounded border w-64"
            data-modal-toggle="authentication-modal"
          >
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
                    <p className="text-sm font-semibold mt-2 pt-1 mb-0">
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
      </div>
    </div>
  );
};

export default Login;
