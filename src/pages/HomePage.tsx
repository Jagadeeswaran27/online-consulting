import React from "react";
import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import Banner from "../components/home/Banner";
import ContactUs from "../components/home/ContactUs";
const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <div className="my-20"></div>
      <Services />
      <div className="my-32"></div>
      <Banner />
      <div className="my-20"></div>
      <ContactUs />
    </div>
  );
};

export default HomePage;
