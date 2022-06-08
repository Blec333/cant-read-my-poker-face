import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_PLAYER } from "../../utils/mutations";

import Auth from "../../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    playername: "",
    password: "",
  });
  const [addPlayer, { error, data }] = useMutation(ADD_PLAYER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { playername, value } = event.target;

    setFormState({
      ...formState,
      [playername]: value,
    });
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
    <div class="bg-white h-screen w-screen flex justify-center items-center">
      <div class="px-6 py-3 rounded border w-64">
        <div class="flex flex-col items-center justify-center mb-4">
          <h2 class="text-2xl font-bold">Sign Up</h2>
        </div>
        {data ? (
          <p>
            Success! You may now head <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <input
              className={
                "border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary "
              }
              placeholder="Your username"
              name="playerName"
              type="text"
              value={formState.playername}
              onChange={handleChange}
            />
            <input
              className="form-input"
              placeholder="******"
              playerName="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button
              className="btn btn-block btn-info"
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

    // <main className="flex-row justify-center mb-4">
    //   <div className="col-12 col-lg-10">
    //     <div className="card">
    //       <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
    //       <div className="card-body">
    //         {data ? (
    //           <p>
    //             Success! You may now head{' '}
    //             <Link to="/">back to the homepage.</Link>
    //           </p>
    //         ) : (
    //           <form onSubmit={handleFormSubmit}>
    //             <input
    //               className="form-input"
    //               placeholder="Your userplayerName"
    //               playerName="playerName"
    //               type="text"
    //               value={formState.playerName}
    //               onChange={handleChange}
    //             />
    //             <input
    //               className="form-input"
    //               placeholder="Your email"
    //               playerName="email"
    //               type="email"
    //               value={formState.email}
    //               onChange={handleChange}
    //             />
    //             <input
    //               className="form-input"
    //               placeholder="******"
    //               playerName="password"
    //               type="password"
    //               value={formState.password}
    //               onChange={handleChange}
    //             />
    //             <button
    //               className="btn btn-block btn-info"
    //               style={{ cursor: 'pointer' }}
    //               type="submit"
    //             >
    //               Submit
    //             </button>
    //           </form>
    //         )}

    //         {error && (
    //           <div className="my-3 p-3 bg-danger text-white">
    //             {error.message}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </main>
  );
};

export default Signup;
