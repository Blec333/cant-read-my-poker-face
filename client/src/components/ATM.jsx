import React, { useState, useEffect }from "react";
import { getAccount } from "./helpers/playerInfoHelper";
export default function ATM(players) {
  const [showModal, setShowModal] = React.useState(false);
  const [amount, setAmount ] = useState(0);

  useEffect(()=>{

    console.log(amount)
  });

  function handleModal(e){
      e.stopPropagation();
      if(e.target.id === 'price'){
     e.target.value = '';
     }
        if(showModal === true){
            setShowModal (false);
        } else if( showModal === false){
            setShowModal (true);
        } 
     
  }

  const handleIncrease = (num) =>{
    setAmount(amount + num)
  };
  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={(e) => handleModal(e)}
      >
        ATM
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 items-center trounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex  justify-between p-5 rounded-t">
                  <h3 className="text-3xl text-center font-semibold">
                    ATM
                  </h3>
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        total balance
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                        type="text"
                        readOnly
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder= '1000000'
                        />
                    </div>
                </div>    
                    <br/>
                    <form>
                    <label htmlFor="price" className="block text-sm text-left font-medium text-gray-700">
                        Amount to Withdraw
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                        type="number"
                        name="price"
                        id="price"
                        step='20'
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder= {amount}
                        />
                    </div>
                
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <div className="grid grid-cols-4 gap-4">
                    <div></div>
                    <div>
                        <button onClick={()=> handleIncrease(20)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            $20
                        </button>
                        <div>
                        <button onClick={()=> handleIncrease(40)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            $40
                        </button>
                        </div>
                    </div>
                    <div>
                        <button onClick={()=> handleIncrease(60)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            $60
                        </button>
                        <div>
                        <button onClick={()=> handleIncrease(80)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            $80
                        </button>
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                    <div>
                        <button onClick={()=> handleIncrease(100)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            $100
                        </button>
                        <div>
                        <button  onClick={()=> handleIncrease(120)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            $120
                        </button>
                        </div>
                    </div>
                    <div>
                        <button  onClick={()=> handleIncrease(140)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            $140
                        </button>
                        <div>
                        <button  onClick={()=> handleIncrease(160)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            $160
                        </button>
                        </div>
                    </div>
                    <div></div>
                    </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={(e) => handleModal(e)}
                  >
                    Withdraw
                  </button>
                </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}