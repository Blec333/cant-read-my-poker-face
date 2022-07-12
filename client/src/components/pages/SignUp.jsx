import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_PLAYER } from "../../utils/mutations";

import { useQuery } from "@apollo/client";
import { QUERY_GAMES } from "../../utils/queries";

import Auth from "../../utils/auth";

// const Signup = () =>
export default function Signup({ currentPage, handlePageChange }) {


  const [showModal, setShowModal] = useState(true);
  const [formState, setFormState] = useState({ playerName: "", password: "" });


  const [addPlayer, { error, data }] = useMutation(ADD_PLAYER);



  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addPlayer({
        variables: {
          playerName: formState.playerName,
          password: formState.password,
        },
      });
      const token = mutationResponse.data.addPlayer.token;
      Auth.login(token);
      handlePageChange("Playerboard")
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div
        className="flex justify-center items-center w-screen"
        style={{ height: "60vw", aspectRatio: 2 / 1 }}
      >
        <img
          className="absolute w-full h-auto -z-10"
          src="https://media.istockphoto.com/vectors/gamblers-arriving-to-casino-cartoon-vector-concept-vector-id1207089252?k=20&m=1207089252&s=612x612&w=0&h=0fbFHECroX5QFf1DL-v3f3U58SwjwWQzPnoARWRBOpM="
          alt="casino"
        />
        {Auth.loggedIn() ?
          (
            <a
              className="flex justify-center items-center bg-primary h-[4rem] w-[8rem] rounded-box text-primary-content font-bold z-20"
              type="button"
              href="#playerboard"
              onClick={() => handlePageChange("Playerboard")}
            >
              Enter Casino
            </a>
          )
          :
          (<button
            className="flex justify-center items-center rounded-box glass bg-accent text-accent-content font-bold h-[4rem] w-[8rem] z-20"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Show Signup
          </button>)}
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-sm">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h2 className="text-3xl font-semibold">Sign Up</h2>
                  </div>

                  <div className="relative p-6 flex-auto">
                    <form onSubmit={handleFormSubmit}>
                      <input
                        className={
                          "border mb-2 py-2 px-3 rounded focus:text-neutral-content w-full focus:bg-neutral "
                        }
                        name="playerName"
                        placeholder="Your username"
                        onChange={handleChange}
                      />
                      <input
                        className="border mb-2 py-2 px-3 rounded focus:text-neutral-content w-full focus:bg-neutral "
                        name="password"
                        type="password"
                        placeholder="******"
                        onChange={handleChange}
                      />
                      <button
                        className="btn btn-block btn-primary"
                        style={{ cursor: "pointer" }}
                        type="submit"
                      >
                        Submit
                      </button>
                        <p className="flex flex-col justify-center items-center text-sm font-semibold mt-2 pt-1 mb-0">
                          Please sign up to enter the casino! Or...
                        <a
                          type="button"
                          style={{ fontSize: "" }}
                          href="#login"
                          onClick={() => handlePageChange("Login")}
                          className={`flex justify-center items-center bg-primary h-[1.5rem] w-[5rem] rounded-box text-primary-content z-20
                            ${currentPage === "Login"
                              ? "nav-link active"
                              : "nav-link"}`
                          }
                        >
                          Login
                        </a>
                        </p>
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
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
      </div>
    </>
  );
}
