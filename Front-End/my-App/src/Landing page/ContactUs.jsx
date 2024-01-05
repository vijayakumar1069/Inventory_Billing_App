import React from "react";
import { FaFacebook, FaLinkedin, FaTelegram, FaWhatsappSquare } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function ContactUs() {
  return (
    <>
 
        <div className="conatctus flex flex-col mt-10 " id="contact-us">
            <h1 className="text-white text-5xl mb-4 text-center font-extrabold">Contact US</h1>
            <ul className="flex gap-10 justify-center p-5  items-center ">
                <li><a href="https://www.linkedin.com/help/linkedin/answer/a564064 "className="text-white text-xl hover:text-6xl "> <FaLinkedin/></a></li>
                <li><a href="https://www.facebook.com/"className="text-white text-xl hover:text-6xl "><FaFacebook /></a></li>
                <li><a href="https://www.whatsapp.com/"className="text-white text-xl hover:text-6xl "> <FaWhatsappSquare /></a></li>
                <li><a href="https://developers.google.com/identity/sign-in/web/sign-in"className="text-white text-xl hover:text-6xl "> <SiGmail /></a></li>
                <li><a href="https://web.telegram.org/a/"className="text-white text-xl hover:text-6xl "> <FaTelegram /></a></li>
            </ul>
            <span className="text-center text-white font-semibold mt-5">@ copyright by vijayakumar </span>
        </div>
    
   
    
   

   
    </>
  );
}
