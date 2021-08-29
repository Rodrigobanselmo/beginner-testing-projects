import React, { useState } from 'react';
import Navbar from '../components/HomeComponents/Navbar';
import Sidebar from '../components/HomeComponents/Sidebar';
import Footer from '../components/HomeComponents/Footer';
import HeroSection from '../components/HomeComponents/HeroSection';
import InfoSection from '../components/HomeComponents/InfoSection';
import {
  homeObjOne,
  homeObjTwo,
  homeObjThree
} from '../components/HomeComponents/InfoSection/Data';
import Services from '../components/HomeComponents/Services';

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeroSection />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <Services />
      <InfoSection {...homeObjThree} />
      <Footer />
    </>
  );
}

export default Home;
