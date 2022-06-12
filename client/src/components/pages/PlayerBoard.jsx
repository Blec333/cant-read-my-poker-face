import React, {  useState } from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

import JoinGame from "../JoinGame";
import ATM from "../ATM";


export default function PlayerBoard() {
  // const [showAtm, setShowAtm] = useState(false);
  // function resetval(){
  //   if(showAtm === true){
  //     setShowAtm(false);
  //   }else if(showAtm === false){
  //     setShowAtm(true);
  //   }
  // }
  const { data } = useQuery(QUERY_ME);
  const user = data?.me || [];



  return (
    <div className="w-screen h-screen" >
      <img
        className=" absolute object-cover w-full h-full -z-10"
        alt="bg"
        src="https://i.pinimg.com/originals/b6/4c/2f/b64c2fc80eaf789f8ff3c2b0441ce1be.jpg"
      ></img>
      {Auth.loggedIn() ? (
        <div className="grid grid-cols-2 place-items-center h-screen z-20">
            {/* <FadeTransition isOpen= {this.state.setShowAtm} duration={500}> */}
              <div>
                <ATM 
                key={user._id}
                account = {user.account}
                _id ={user._id}
                // onClick ={()=>setShowAtm(true)}
                />
              </div>
            {/* </FadeTransition> */}
            <div>
            <JoinGame />
            </div>
          </div>
      ):(
        <h1>You need to be loggedIn to see this page</h1>
      )}
    </div>

  

  );
}
