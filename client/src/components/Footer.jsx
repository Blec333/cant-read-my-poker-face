import React from 'react';
import stackOverflow from "../assets/img/stackoverflow.png";
import github from "../assets/img/github.png";
import linkedin from "../assets/img/linkedin.png";

function Footer() {
  return (
    <>
      <footer className="footer items-center p-4 bg-neutral hover:bg-neutral-focus text-neutral-content w-screen">
        <div className="items-center grid-flow-col">
          <p>Thank you for playing! - ©2022</p>
        </div>
        <div className="flex place-self-center justify-self-end gap-4">
          <div className="flex flex-row w-[175px] rounded-box border border-base-300 bg-info-content hover:bg-primary justify-center items-center gap-1">
            <p>Brennan L.: </p>
          <a href="https://github.com/Blec333"><img width="24" height="24" alt="github" src={github}></img></a>
          <a href="https://www.linkedin.com/in/brennanleclair"><img width="24" height="24" alt="linkedin" src={linkedin}></img></a>
          <a href="https://stackoverflow.com/users/19237165/blec"><img width="24" height="24" alt="stackoverflow" src={stackOverflow}></img></a>
          </div>
          <div className="flex flex-row w-[175px] rounded-box border border-base-300 bg-info-content hover:bg-primary justify-center items-center gap-1">
            <p>Callan H.: </p>
          <a href="https://github.com/callanhunter"><img width="24" height="24" alt="github" src={github}></img></a>
          <a href="https://www.linkedin.com/in/callan-hunter-195816196/"><img width="24" height="24" alt="linkedin" src={linkedin}></img></a>
          </div>
          <div className="flex flex-row w-[175px] rounded-box border border-base-300 bg-info-content hover:bg-primary justify-center items-center gap-1">
            <p>Alex H.: </p>
          <a href="https://github.com/alex-h1"><img width="24" height="24" alt="github" src={github}></img></a>
          <a href="https://www.linkedin.com/in/alex-hernandez-438743233/"><img width="24" height="24" alt="linkedin" src={linkedin}></img></a>
        </div>
        </div>
      </footer>
    </>
  );

}

export default Footer;