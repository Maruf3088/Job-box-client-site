import React from "react";
import Marquee from "react-fast-marquee";
import sony from "../assets/sony.svg";
import acer from "../assets/acer.svg";
import assus from "../assets/assus.svg";
import casio from "../assets/casio.svg";
import dell from "../assets/dell.svg";
import nokia from "../assets/nokia.svg";
import vaio from "../assets/vaio.svg";
import panasonic from "../assets/panasonic.svg";

const MyMarquee = () => {
  return (
    <div className=" py-4 container mx-auto">
      <Marquee speed={60} gradient={true} pauseOnHover={true}>
        
        <img src={sony} alt="cup" className="mx-4 w-30 h-30" />

        <img src={acer} alt="cup" className="mx-4 w-30 h-30" />

        <img src={nokia} alt="cup" className="mx-4 w-30 h-30" />

        <img src={assus} alt="cup" className="mx-4 w-30 h-30" />

        <img src={dell} alt="cup" className="mx-4 w-30 h-30" />

        <img src={vaio} alt="cup" className="mx-4 w-30 h-30" />

        <img src={casio} alt="cup" className="mx-4 w-30 h-30" />

        <img src={panasonic} alt="cup" className="mx-4 w-30 h-30" />

        <img src={sony} alt="cup" className="mx-4 w-30 h-30" />

        <img src={acer} alt="cup" className="mx-4 w-30 h-30" />

        <img src={nokia} alt="cup" className="mx-4 w-30 h-30" />

      </Marquee>
      <div className="divider text-blue-500">WELCOME</div>
    </div>
  );
};

export default MyMarquee;
