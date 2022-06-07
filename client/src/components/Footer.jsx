import React from 'react';
import stackOverflow from "../assets/img/stackoverflow.png";
import github from "../assets/img/github.png";
import linkedin from "../assets/img/linkedin.png";

function Footer() {
  return (
    <>
      <footer className="footer items-center p-4 bg-neutral text-neutral-content">
        <div className="items-center grid-flow-col">
          <p>Thank you for playing! - ©2022</p>
        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a href="https://github.com/Blec333">Brennan L.:<img width="24" height="24" alt="github" src={github}></img></a>
          <a href="https://www.linkedin.com/in/brennanleclair"><img width="24" height="24" alt="linkedin" src={linkedin}></img></a>
          <a href="https://stackoverflow.com/users/19237165/blec"><img width="24" height="24" alt="stackoverflow" src={stackOverflow}></img></a>
          <a href="https://github.com/callanhunter">Callan H.:<img width="24" height="24" alt="github" src={github}></img></a>
          <a href="https://www.linkedin.com/in/callan-hunter-195816196/"><img width="24" height="24" alt="linkedin" src={linkedin}></img></a>
          <a href="https://github.com/alex-h1">Alex H.:<img width="24" height="24" alt="github" src={github}></img></a>
          <a href="https://www.linkedin.com/in/alex-hernandez-438743233/"><img width="24" height="24" alt="linkedin" src={linkedin}></img></a>
        </div>
      </footer>
    </>
  );

}

export default Footer;