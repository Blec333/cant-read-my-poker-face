import React, { useState, useEffect } from "react";
import { useCasinoContext } from "../utils/GlobalState";
import { useMutation } from "@apollo/client";
import { UPDATE_CURRENT_PLAYERS_WALLET } from "../utils/actions";
import { UPDATE_PLAYER } from "../utils/mutations";

import Auth from "../utils/auth";

export default function ATM({account, _id}) {



  const [showModal, setShowModal] = useState(false);
  const [wallet, setWallet] = useState(0);
  const [bank, setBank] = useState(account);
  const [overdraftProtection, setOverdraftProtection] = useState('');


  const [state, dispatch] = useCasinoContext();


  const [updatePlayer, updatePlayerData] = useMutation(UPDATE_PLAYER);


  const amountArr = [20, 40, 60, 80, 100, 200, 400, 600, 800, 1000, 2000, 4000, 6000, 8000, 10000, 20000, 40000, 60000, 80000, 100000];



  const handleWithrawTotal = (num) => {
    if (bank - num >= 0) {
      setOverdraftProtection('');
      setWallet(wallet + num);
      setBank(bank - num);
    } else {
      setOverdraftProtection('Insufficient funds... sing for your supper!');
    }
  }

  const singForSupper = () => {
    setOverdraftProtection('What a beautiful voice!');
    setBank(bank + Math.floor((Math.random() * 100000) + 1));
  }

  const clearWallet = () => {
    setOverdraftProtection('');
    setBank(wallet + bank);
    setWallet(0);
  }

  const handleWithdrawal = async () => {
    dispatch({
      type: UPDATE_CURRENT_PLAYERS_WALLET,
      currentWallet: wallet,
    });
    try {
      await updatePlayer({
        variables: {
          account: bank,
          wallet: wallet,
        }
      })
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      {showModal ? (
        null
      ) : (
        <button
          className="flex justify-center items-center rounded-box bg-secondary text-secondary-content font-bold h-[4rem] w-[8rem] m-32 hover:shadow-lg hover:bg-success hover:text-success-content" type="button" onClick={() => setShowModal(true)}>ATM</button>
      )}
      {showModal ? (
        <>
          <div className="flex flex-col justify-center items-center text-center w-full bg-white rounded-box z-50">
            <h3 className="text-black text-3xl text-center font-semibold py-3">ATM</h3>
            <div className="mt-4">
              <label htmlFor="price" className="text-sm font-medium text-black">BANK ACCOUNT</label>
              <div className="flex border-b justify-center">
                <span className="text-gray-500 sm:text-sm">$</span>
                <input type="text" name="price" readOnly className="text-black text-center text-sm" placeholder={bank} />
              </div>
                <span className="text-error text-sm">{overdraftProtection}</span>
            </div>
            <div className="mt-4">
              <label htmlFor="price" className="text-sm font-medium text-black">CASH IN 
              WALLET</label>
              <div className="flex border-b justify-center">
                <span className="text-gray-500 sm:text-sm">$</span>
                <input type="number" name="price" id="price" readOnly step='20' className="text-black text-center text-sm" placeholder={wallet} />
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2 p-8">
              {amountArr.map((amt, i) => (
                <button className="rounded text-blue-700 font-semibold py-2 px-2 border border-blue-500 hover:text-white hover:bg-blue-500" key={i} onClick={() => handleWithrawTotal(amt)}>${amt}</button>
              ))}
            </div>
            <div className="flex m-3 gap-3">
              <button className="bg-success text-success-content font-bold text-sm px-6 py-3 rounded-box hover:shadow-lg" type="button" id="reset" onClick={() => handleWithdrawal()}>WITHDRAW CASH</button>
              <button className="bg-warning text-warning-content font-bold text-sm px-6 py-3 rounded-box hover:shadow-lg" type="button" id="reset" onClick={() => clearWallet()}>REDEPOSIT CASH</button>
            </div>
            {(overdraftProtection !== '' || bank === 0)
              ? (
                <button className="bg-error text-error-content font-bold text-sm px-6 py-3 rounded-box hover:shadow-lg" type="button" id="reset" onClick={() => singForSupper()}>SING FOR MY SUPPER</button>
              ) : (
                null
              )}
            <button className="rounbed-box text-error font-bold text-sm p-6" type="button" onClick={() => setShowModal(false)}>Close</button>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}