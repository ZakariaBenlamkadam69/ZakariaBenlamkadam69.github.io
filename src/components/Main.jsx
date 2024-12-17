import React, { useState, useEffect } from 'react';
import './Main.css';
import About from './About';
import Profile from './Profile';
import Projects from './Projects';
import Footer from './Footer';
import MagnetoButton from './MagnetoButton';

export default function Main() {
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  useEffect(() => {
    const evaluateVisibility = () => {
      const profileElement = document.querySelector('#profile');
      if (profileElement) {
        const profileRect = profileElement.getBoundingClientRect();
        if (profileRect.top <= 0 && profileRect.bottom >= 0) {
          setIsButtonVisible(false);
        } else {
          setIsButtonVisible(true);
        }
      }
    };
  
    // Run visibility check on initial render
    evaluateVisibility();
  
    // Debounce the scroll event
    let debounceTimeout;
    const handleScroll = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(evaluateVisibility, 100);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(debounceTimeout);
    };
  }, []);
  

  return (
    <div className="no-scrollbar" style={{ height: 'auto' }}>
      <Profile id="profile" />
      <About />
      <Projects />
      <Footer />
      <MagnetoButton isVisible={isButtonVisible} />
    </div>
  );
}

