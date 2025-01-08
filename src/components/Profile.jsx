import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import profileImage from './Images/zakaria1.png';
import copyright from './Images/copyright.png';
import arrowImage from './Images/arrow.png';
import { Link } from 'react-router-dom'; // Import Link for navigation

import './Profile.css';

const Profile = (props) => {
  const [scrollY, setScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll('.item');
    const animationDuration = 100;

    const animation = gsap.to(items, {
      duration: animationDuration,
      xPercent: -750,
      ease: 'linear',
      repeat: -1,
      modifiers: {
        xPercent: gsap.utils.unitize(value => parseFloat(value) % 100),
      },
      paused: isHovered,
    });

    if (isHovered) {
      animation.pause();
    } else {
      animation.play();
    }

    return () => {
      gsap.killTweensOf(items);
    };
  }, [isHovered]);

  useEffect(() => {
    const textContainer = document.querySelector('.text-container');
    
    const magnetoText = document.querySelector('.text');

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

    const handleTextContainerMouseMove = (event) => {
      activateMagneto(event, textContainer, magnetoText, 30); // Pass the text element
    };

    textContainer.addEventListener('mousemove', handleTextContainerMouseMove);
    textContainer.addEventListener('mouseleave', () => resetMagneto(textContainer, magnetoText));

    return () => {
      textContainer.removeEventListener('mousemove', handleTextContainerMouseMove);
      textContainer.removeEventListener('mouseleave', () => resetMagneto(textContainer, magnetoText));
      
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.magneto-text'); 
  
    const activateMagneto = (event, element, strength) => {
      const bounds = element.getBoundingClientRect();
      const offsetX = ((event.clientX - bounds.left) / element.offsetWidth - 0.5) * strength;
      const offsetY = ((event.clientY - bounds.top) / element.offsetHeight - 0.5) * strength;
  
      gsap.to(element, { x: offsetX, y: offsetY, duration: 0.3, ease: 'power4.out' });
    };
  
    const resetMagneto = (element) => {
      gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: 'power4.out' });
    };
  
    elements.forEach((element) => {
      element.addEventListener('mousemove', (e) => activateMagneto(e, element, 40));
      element.addEventListener('mouseleave', () => resetMagneto(element));
    });
  
    return () => {
      elements.forEach((element) => {
        element.removeEventListener('mousemove', (e) => activateMagneto(e, element, 40));
        element.removeEventListener('mouseleave', () => resetMagneto(element));
      });
    };
  }, []);
  

  

  return (
    <div  id={props.id} className="relative bg-[#999d9e] text-white min-h-screen flex items-center justify-center overflow-hidden">
      <div className="profile-image-wrap">
        <img
          src={profileImage}
          alt="Zakaria Benlamkadam"
          className="profile-image"
          style={{ top: `${scrollY * 0.1}px` }}
        />
      </div>

      <div
        className="absolute bottom-0 w-full overflow-hidden whitespace-nowrap"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="wrapper">
          <div className="item">
            Zakaria Benlamkadam <span className="spacer">—</span>
          </div>
          <div className="item">
            Zakaria Benlamkadam <span className="spacer">— </span>
          </div>
        </div>
      </div>

      <div className="text-container">
        <div className="text-wrapper">
          <div className="main-text">Code By Zakaria</div>
          <div className="hover-text">Benlamkadam</div>
        </div>
        <img src={copyright} alt="Zakaria Benlamkadam" className="copyright1" />
      </div>

      
      <div className="text-container1">
        {/* Add Links for Navigation */}
        <Link to="/work" className="magneto-text">Work</Link>
        <Link to="/about" className="magneto-text">About</Link>
        <Link to="/contact" className="magneto-text">Contact</Link>
      </div>

        
      

      <div className="arrow-container">
        <img src={arrowImage} alt="Arrow Down" className="arrow-image" />
        <div className="description">
          <div className="engineer-text">BI & Data </div>
          <div className="engineer-text">Engineering Student</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
