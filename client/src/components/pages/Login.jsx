import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import SignUp from "./SignUp";

import Auth from "../../utils/auth";

// const Login = (props) =>
export default function Login(props) {
  const [showModal, setShowModal] = React.useState(false);

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
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Enter Casino
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h2 className="text-3xl font-semibold">Login</h2>
              </div>
              <div className="relative p-6 flex-auto">
                {" "}
                {data ? (
                  <p>
                    Success! You may now head{" "}
                    <Link to="/playerboard">Welcome to the Casino.</Link>
                  </p>
                ) : (
                  <div className="relative p-6 flex-auto">
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
                  </div>
                )}
                {error && (
                  <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
