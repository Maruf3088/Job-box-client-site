import React, { use, useEffect } from "react";
import Banner from "../components/Banner";
import Marquee from "react-fast-marquee";
import MyMarquee from "../components/MyMarquee";
import AllJobs from "../components/AllJobs";
import HireMe from "../components/HireMe";
import Faq from "../components/Faq";
import Contact from "../components/Contact";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  return (
    <div >
      <Banner></Banner>
      <MyMarquee></MyMarquee>
      <HireMe></HireMe>
      <AllJobs></AllJobs>
      <Faq></Faq>
      <Contact></Contact>
    </div>
  );
};

export default Home;
