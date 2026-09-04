import React, { useState, useEffect } from 'react';
import StarfieldCanvas from './components/StarfieldCanvas';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BirthdayCake from './components/BirthdayCake';
import PolaroidGallery from './components/PolaroidGallery';
import LoveLetter from './components/LoveLetter';
import SurpriseBoxes from './components/SurpriseBoxes';
import WishesWall from './components/WishesWall';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState('rose');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="app-container" style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Dynamic Starfield & Shooting Stars Canvas */}
      <StarfieldCanvas />

      {/* Floating Glass Navbar with Theme & Audio Controls */}
      <Navbar currentTheme={theme} onThemeChange={handleThemeChange} />

      {/* Main Content Sections */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <BirthdayCake />
        <PolaroidGallery />
        <LoveLetter />
        <SurpriseBoxes />
        <WishesWall />
      </main>

      {/* Romantic Footer */}
      <Footer />
    </div>
  );
}
