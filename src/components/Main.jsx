import React, { useState, useEffect } from 'react';
import './Main.css';
import About from './About';
import Profile from './Profile';
import Projects from './Projects';
import Footer from './Footer';
import MagnetoButton from './MagnetoButton';
import gsap from 'gsap';
import { Link } from "react-router-dom"; 



export default function Main() {
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setCirclePosition({ x: e.clientX, y: e.clientY });
  };

  // Attach the mouse move event listener when the component mounts
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);

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

  useEffect(() => {
    if (sidebarVisible) {
      document.body.classList.add('no-scroll');
    } else {
      setTimeout(() => {
        // Adding the 'hidden' class after the animation delay
        document.body.classList.remove('no-scroll');
      }, 500);  // Timing should match the bounceIn/bounceOut animation duration
    }
  }, [sidebarVisible]);
  
  

  useEffect(() => {
    const sidebarItems = document.querySelectorAll('.sidebar-li');

    const activateMagneto = (event, element, strength) => {
        let boundBox = element.getBoundingClientRect();
        const newX = ((event.clientX - boundBox.left) / element.offsetWidth - 0.5) * strength;
        const newY = ((event.clientY - boundBox.top) / element.offsetHeight - 0.5) * strength;
        
        gsap.to(element, {
            duration: 0.5,
            x: newX,
            y: newY,
            ease: 'power4.out',
        });
    };

    const resetMagneto = (element) => {
        gsap.to(element, {
            duration: 0.5,
            x: 0,
            y: 0,
            ease: 'power4.out',
        });
    };

    const handleMouseMove = (event) => {
        const item = event.currentTarget;
        activateMagneto(event, item, 30);
    };

    if (sidebarVisible) { // Ensure event listeners are added only when the sidebar is visible
        sidebarItems.forEach((item) => {
            item.addEventListener('mousemove', handleMouseMove);
            item.addEventListener('mouseleave', () => resetMagneto(item));
        });
    }

    // Cleanup event listeners when sidebar is hidden or component unmounts
    return () => {
        sidebarItems.forEach((item) => {
            item.removeEventListener('mousemove', handleMouseMove);
            item.removeEventListener('mouseleave', () => resetMagneto(item));
        });
    };
}, [sidebarVisible]); // Re-run when the sidebar visibility changes


  
  

  return (
    <div className="no-scrollbar" style={{ height: 'auto' }}>
      <Profile id="profile" />
      <About />
      <Projects />
      <Footer />
      <MagnetoButton isVisible={isButtonVisible} toggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
      {sidebarVisible && (
        <>
        <div className={`overlay ${sidebarVisible ? 'visible' : ''}`} onClick={() => setSidebarVisible(false)} />
        
        <div className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
        <div className="mb-12 mt-[70px]">
        <p className="text-[0.6rem] text-zinc-500 mx-6">NAVIGATION</p>
        <div className="h-px bg-zinc-500 my-4 mx-6" />
      </div>
          <ul>
            <li className='sidebar-li'><Link to="/">Home</Link></li>
            <li className='sidebar-li'><Link to="/work">Work</Link></li>
            <li className='sidebar-li'><Link to="/about">About</Link></li>
            <li className='sidebar-li'><Link to="/contact">Contact</Link></li>
          </ul>
          <div className="socials">
            <p className="text-[0.7rem] text-zinc-500 mx-6">SOCIALS</p>
            <div className="flex flex-wrap gap-[-20px] mt-4  ">
              <a href="https://medium.com/@benlamkadamzakaria" className="text-[12px] hover:text-zinc-300 transition-colors" target="_blank" rel="noopener noreferrer">Medium</a>
              <a href="https://www.instagram.com/aakaa_riii/" className="text-[12px] hover:text-zinc-300 transition-colors" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://github.com/ZakariaBenlamkadam/" className="text-[12px] hover:text-zinc-300 transition-colors" target="_blank" rel="noopener noreferrer">Github</a>
              <a href="https://www.linkedin.com/in/zakaria-benlamkadam/" className="text-[12px] hover:text-zinc-300 transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
        </>
      )}
      <div
        className="cursor-circle"
        style={{
          left: `${circlePosition.x}px`,
          top: `${circlePosition.y}px`,
        }}
      />
    </div>
  );
}

