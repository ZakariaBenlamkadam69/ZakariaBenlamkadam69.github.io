import React from "react";
import gsap from 'gsap';
import './AboutMe.css';
import { Link } from "react-router-dom"; 
import { FaGlobe, FaArrowRight,   FaStar, FaUsers, FaCoffee } from "react-icons/fa";
import { useEffect, useState } from "react";
import copyright from './Images/copyright1.png';
import MagnetoButton from './MagnetoButton';
import Certificates from './Certificates'
import ExtracurricularActivities from './ExtracurricularActivities'


const AboutMe = () => {
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


  
  

  useEffect(() => {
    const textContainer = document.querySelector('.text-container2');
    
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
    const elements = document.querySelectorAll('.magneto-text1'); 
  
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
    <div className="min-h-screen ">
    <div id="profile">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto">
        
        
      </header>

      <div className="text-container1">
        {/* Add Links for Navigation */}
        <Link to="/work" className="magneto-text1">Work</Link>
        <Link to="/about" className="magneto-text1">About</Link>
        <Link to="/contact" className="magneto-text1">Contact</Link>
      </div>

      <Link to="/" className="text-container2" style={{ textDecoration: "none" }}>
      <div className="text-wrapper">
        <div className="main-text">Code By Zakaria</div>
        <div className="hover-text">Benlamkadam</div>
      </div>
      <img src={copyright} alt="Zakaria Benlamkadam" className="copyright1" />
    </Link>

    </div>

      {/* Hero Section */}
      <section className="px-6 pt-20 pb-12 max-w-[1400px] mx-auto">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-normal leading-tight md:mx-8 lg:mx-12">
            Helping Companies in the Analysis Process
          </h1>
        </div>
      </section>

      {/* Description Section */}
      <section className="px-6 py-12 max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div className="hover-container">
  <img
    src="/me.jpg"
    alt="City landscape"
    className="image"
  />
  <img
    src="/me-hover.jpg"
    alt="Alternate landscape"
    className="image-hover"
  />
</div>


  {/* Description Section */}
  <div className="space-y-6">
    <div className="flex items-start gap-4">
      <div class="icon-container">
        <FaGlobe className="icon" />
      </div>

    </div>
    <p className="text-xl leading-relaxed text-gray-800">
      The combination of my passion for analysis and visualization positions me to transform complexity into clarity and impactful decisions.
    </p>
    <p className="text-lg text-gray-600">Always exploring</p>
  </div>

  
</section>



      {/* Services Section */}
      <section className="px-6 py-20 max-w-[1400px] mx-auto bg-gray-50">
        <h2 className="text-4xl md:text-5xl mb-20">I can help you with...</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <span className="text-sm text-gray-500">01</span>
            <h3 className="text-2xl">Data Analysis <span className="text-2xl">✦</span></h3>
            <p className="text-gray-600 leading-relaxed">
              With a solid foundation in data analysis, I excel at extracting actionable insights, delivering data-driven solutions, and transforming complex datasets into clear, impactful visualizations.
            </p>
          </div>
          <div className="space-y-6">
            <span className="text-sm text-gray-500">02</span>
            <h3 className="text-2xl">Data Science <span className="text-2xl">✦</span></h3>
            
            <p className="text-gray-600 leading-relaxed">
            With a strong passion for uncovering patterns in data, I specialize in using machine learning, deep learning, AI, and NLP to turn raw information into meaningful insights and innovative solutions.
            </p>
          </div>
          <div className="space-y-6">
            <span className="text-sm text-gray-500">03</span>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl">Data Engineering</h3>
              <span className="text-2xl">✦</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
            With a strong foundation in data engineering, I specialize in designing and building scalable data pipelines, ensuring seamless data flow, and transforming complex datasets into structured, accessible information to support data-driven decisions.
            </p>
          </div>
        </div>
      </section>

          <ExtracurricularActivities/>
      <Certificates/>

      {/* Call to Action Section */}
      <section className="px-6 py-20 max-w-[1400px] mx-auto text-center">
        <h2 className="text-4xl md:text-5xl mb-6">Ready to start your project?</h2>
        <p className="text-xl text-gray-600 mb-8">Let's create something amazing together.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
          Get in touch
          <FaArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 bg-gray-100">
        <div className="max-w-[1400px] mx-auto flex flex-col justify-center items-center text-center">
          <p className="text-sm text-gray-600">© 2025 Code by Zakaria. All rights reserved.</p>
        </div>
      </footer>
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
            <li className='sidebar-li'><a href="/">Home</a></li>
            <li className='sidebar-li'><a href="/work">Work</a></li>
            <li className='sidebar-li'><a href="/about">About</a></li>
            <li className='sidebar-li'><a href="/contact">Contact</a></li>
          </ul>
          <div className="socials">
            <p className="text-[0.7rem] text-zinc-500 mx-6">SOCIALS</p>
            <div className="flex flex-wrap gap-[-20px] mt-4  ">
              <a href="https://www.awwwards.com" className="text-[12px] hover:text-zinc-300 transition-colors" target="_blank" rel="noopener noreferrer">Medium</a>
              <a href="https://www.instagram.com" className="text-[12px] hover:text-zinc-300 transition-colors" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://twitter.com" className="text-[12px] hover:text-zinc-300 transition-colors" target="_blank" rel="noopener noreferrer">Github</a>
              <a href="https://www.linkedin.com" className="text-[12px] hover:text-zinc-300 transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
        </>
      )}

    </div>
  );
};

export default AboutMe;
