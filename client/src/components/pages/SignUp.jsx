import React, { useState } from "react";
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_PLAYER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    playerName: '',
    password: '',
  });
  const [addPlayer, { error, data }] = useMutation(ADD_PLAYER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { playerName, value } = event.target;

    setFormState({
      ...formState,
      [playerName]: value,
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
      <div class='bg-white h-screen w-screen flex justify-center items-center'>
    <div class="px-6 py-3 rounded border w-64">
        <div class="flex flex-col items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 class="text-2xl font-bold">Login</h2>
        </div>
        <form onSubmit={handleFormSubmit}>
            {/* playerName */}
            <div class="flex flex-col my-2">
                <label class="text-xs text-gray-400">Create a playerName</label>
                <div class="text-xs text-red-400 flex justify-between items-center">
                    {/* <span>
                    <b>Error: </b>
                    wrong playerName
                    </span> */}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <input 
                    class="border rounded px-3 py-1 mt-2"
                    className="form-input"
                    placeholder="Your player playerName"
                    name="playerName"
                    type="playerName"
                    value={formState.playerName}
                    onChange={handleChange}/>
            </div>
            <div class="flex flex-col my-2">
                <label class="text-xs text-gray-400">Password</label>
                <input class="border rounded px-3 py-1 mt-2" className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}/>
            </div>
            <div class="flex flex-col items-center justify-center my-3">
                <button class="my-3 py-1 w-full rounded bg-blue-600 text-blue-200">
                    Create Account
                </button>
                {/* <p class="text-xs text-gray-500">
                    Forgot password ? 
                        <a href="#" class="font-bold text-gray-700">Click here</a> 
                        to reset your password.
                </p> */}
            </div>
            <Link to="/">back to the homepage.</Link>
        </form>
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