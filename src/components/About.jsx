import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './About.css';

export default function About() {
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  useEffect(() => {
    const magneto = document.querySelector('.about-button');
    const magnetoText = document.querySelector('.about-button .text'); // Select the text span

    const activateMagneto = (event, element, textElement, strength) => {
      let boundBox = element.getBoundingClientRect();
      const newX = ((event.clientX - boundBox.left) / element.offsetWidth) - 0.5;
      const newY = ((event.clientY - boundBox.top) / element.offsetHeight) - 0.5;

      gsap.to(element, {
        duration: 1,
        x: newX * strength,
        y: newY * strength,
        ease: 'power4.out'
      });

      gsap.to(textElement, {
        duration: 1,
        x: newX * strength,
        y: newY * strength,
        ease: 'power4.out'
      });
    };

    const resetMagneto = (element, textElement) => {
      gsap.to(element, {
        duration: 1,
        x: 0,
        y: 0,
        ease: 'power4.out'
      });
      gsap.to(textElement, {
        duration: 1,
        x: 0,
        y: 0,
        ease: 'power4.out'
      });
    };

    magneto.addEventListener('mousemove', (event) => activateMagneto(event, magneto, magnetoText, 40));
    magneto.addEventListener('mouseleave', () => resetMagneto(magneto, magnetoText));

    return () => {
      magneto.removeEventListener('mousemove', (event) => activateMagneto(event, magneto, magnetoText, 40));
      magneto.removeEventListener('mouseleave', () => resetMagneto(magneto, magnetoText));
    };
  }, []);

  

  return (
    <div className="landing-container">
      <main className="main-content">
        <div className="text-section">
          <h1 className="main-title">
            Turning raw data into insightful narratives that drive progress. Together, we transform complexity into clarity, making data work smarter and shine brighter.
          </h1>
        </div>

        <div className="button-section">
          <p className="description">
            The combination of my passion for analysis and visualization positions me to transform complexity into clarity and impactful decisions.
          </p>
          <button
            onClick={() => setIsAboutVisible(!isAboutVisible)}
            className="about-button"
          >
            <span className="text">About me</span> 
          </button>
        </div>

        
      </main>

      {isAboutVisible && (
        <div className="about-modal">
          <div className="about-content">
            <h2 className="about-title">About Me</h2>
            <p className="about-description">
              I'm a passionate web designer and developer with a keen eye for detail and a love for creating cutting-edge digital experiences. My unique blend of design and technical skills allows me to bridge the gap between aesthetics and functionality.
            </p>
            <button
              onClick={() => setIsAboutVisible(false)}
              className="close-button"
            >
              Close
            </button>
          </div>
        </div>
      )}


      
    </div>
  );
}
