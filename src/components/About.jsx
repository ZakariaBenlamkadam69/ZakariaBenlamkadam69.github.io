import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './About.css';

export default function About() {

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
          <button className="about-button">
            <a href="/about" className="text">About me</a>
          </button>

        </div>

        
      </main>

      
    </div>
  );
}
