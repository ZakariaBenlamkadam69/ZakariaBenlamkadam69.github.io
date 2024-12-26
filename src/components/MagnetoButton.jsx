import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import sidebar from './Images/equal.png';
import './MagnetoButton.css';

const MagnetoButton = ({ isVisible, toggleSidebar }) => {
  const buttonRef = useRef();

  useEffect(() => {
    // Trigger animations on visibility change
    if (isVisible) {
      gsap.to(buttonRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'power4.out',
      });
    } else {
      gsap.to(buttonRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power4.out',
      });
    }
  }, [isVisible]);

  // Magneto effect
  useEffect(() => {
    const magneto = buttonRef.current;
    const text = magneto.querySelector('.text3');

    const activateMagneto = (event, strength) => {
      const bounds = magneto.getBoundingClientRect();
      const offsetX = ((event.clientX - bounds.left) / magneto.offsetWidth - 0.5) * strength;
      const offsetY = ((event.clientY - bounds.top) / magneto.offsetHeight - 0.5) * strength;

      gsap.to([magneto, text], { x: offsetX, y: offsetY, duration: 0.3, ease: 'power4.out' });
    };

    const resetMagneto = () => {
      gsap.to([magneto, text], { x: 0, y: 0, duration: 0.3, ease: 'power4.out' });
    };

    magneto.addEventListener('mousemove', (e) => activateMagneto(e, 40));
    magneto.addEventListener('mouseleave', resetMagneto);

    return () => {
      magneto.removeEventListener('mousemove', (e) => activateMagneto(e, 40));
      magneto.removeEventListener('mouseleave', resetMagneto);
    };
  }, []);

  return (
    <button className="magneto3" ref={buttonRef} onClick={toggleSidebar}>
      <img src={sidebar} className="text3" alt="Magneto Button" />
    </button>
  );
};

export default MagnetoButton;
