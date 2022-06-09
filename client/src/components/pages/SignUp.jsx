import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_PLAYER } from "../../utils/mutations";

import Auth from "../../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    playerName: "",
    password: "",
  });
  const [addPlayer, { error, data }] = useMutation(ADD_PLAYER);

  // update state based on form input changes
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
      const { data } = await addPlayer({
        variables: { ...formState },
      });

      Auth.login(data.addPlayer.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white h-screen w-screen flex justify-center items-center">
      <div className="px-6 py-3 rounded border w-64">
        <div className="flex flex-col items-center justify-center mb-4">
          <h2 className="text-2xl font-bold">Sign Up</h2>
        </div>
        {data ? (
          <p>
            Success! You may now head <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <input
              className={
                "border mb-2 py-2 px-3 rounded focus:text-neutral-content w-full focus:bg-neutral "
              }
              placeholder="Your username"
              onChange={handlePlayerNameChange}
            />
            <input
              className="border mb-2 py-2 px-3 rounded focus:text-neutral-content w-full focus:bg-neutral "
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
          </form>
        )}

        {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}
      </div>
    </div>
  );
};

export default Signup;
