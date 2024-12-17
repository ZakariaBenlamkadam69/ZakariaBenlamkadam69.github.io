import React, { useState } from 'react';
import copyright from './Images/copyright.png';
import { Link } from "react-router-dom"; 
import { useEffect } from "react";
import gsap from 'gsap';
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    services: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
  };

  useEffect(() => {
    const textContainer = document.querySelector('.text-container3');
    
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
    <div className="min-h-screen bg-[#1C1C1C] text-white p-6">
      <header className="flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto">
        
        
        </header>
  
        <div className="text-container4">
          {/* Add Links for Navigation */}
          <Link to="/work" className="magneto-text">Work</Link>
          <Link to="/about" className="magneto-text">About</Link>
          <Link to="/contact" className="magneto-text">Contact</Link>
        </div>
  
        <Link to="/" className="text-container3" style={{ textDecoration: "none" }}>
        <div className="text-wrapper">
          <div className="main-text">Code By Zakaria</div>
          <div className="hover-text">Benlamkadam</div>
        </div>
        <img src={copyright} alt="Zakaria Benlamkadam" className="copyright1" />
      </Link>
      

      {/* Main content */}
      <main className="flex flex-col lg:flex-row mt-[80px] ml-20">
        {/* Left column */}
        <div className="lg:w-2/3 pr-8">
          <h1 className="text-6xl font-light mb-20">Let's start a project together</h1>

          <form onSubmit={handleSubmit} className="space-y-16">
            <div className="space-y-16 border-t border-gray-700 pt-16">
              {/* Name Field */}
              <div>
                <label className="flex items-start">
                  <span className="text-gray-500 w-8">01</span>
                  <div className="flex-1">
                    <span className="block text-2xl mb-4">What's your name?</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Zakaria Benlamkadam *"
                      className="w-full bg-transparent border-none text-gray-400 text-xl focus:outline-none"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </label>
              </div>

              {/* Email Field */}
              <div>
                <label className="flex items-start">
                  <span className="text-gray-500 w-8">02</span>
                  <div className="flex-1">
                    <span className="block text-2xl mb-4">What's your email?</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="benlamkadamzakaria@gmail.com *"
                      className="w-full bg-transparent border-none text-gray-400 text-xl focus:outline-none"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </label>
              </div>

              {/* Organization Field */}
              <div>
                <label className="flex items-start">
                  <span className="text-gray-500 w-8">03</span>
                  <div className="flex-1">
                    <span className="block text-2xl mb-4">What's the name of your organization?</span>
                    <input
                      type="text"
                      name="organization"
                      placeholder="Akari ®"
                      className="w-full bg-transparent border-none text-gray-400 text-xl focus:outline-none"
                      value={formData.organization}
                      onChange={handleChange}
                    />
                  </div>
                </label>
              </div>

              {/* Services Field */}
              <div>
                <label className="flex items-start">
                  <span className="text-gray-500 w-8">04</span>
                  <div className="flex-1">
                    <span className="block text-2xl mb-4">What services are you looking for?</span>
                    <input
                      type="text"
                      name="services"
                      placeholder="Data Engineering, Data Analysis ..."
                      className="w-full bg-transparent border-none text-gray-400 text-xl focus:outline-none"
                      value={formData.services}
                      onChange={handleChange}
                    />
                  </div>
                </label>
              </div>

              {/* Message Field */}
              <div>
                <label className="flex items-start">
                  <span className="text-gray-500 w-8">05</span>
                  <div className="flex-1">
                    <span className="block text-2xl mb-4">Your message</span>
                    <textarea
                      name="message"
                      placeholder="Hello Zakaria, can you help me with ... *"
                      className="w-full bg-transparent border-none text-gray-400 text-xl focus:outline-none resize-none"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-16">
              <button
                type="submit"
                className="w-32 h-32 rounded-full bg-[#4B4AEF] hover:bg-[#3938CB] transition-colors text-white flex items-center justify-center text-lg"
              >
                Send it!
              </button>
            </div>
          </form>
        </div>

        {/* Right column */}
        <div className="lg:w-1/3 mt-12 lg:mt-0">
          <div className="mb-12">
            <img src="zakaria1.png" alt="Profile1" className="rounded-full w-24 h-24" />
          </div>

          <div className="space-y-12 text-sm">
            <div>
              <h3 className="text-gray-500 mb-2">CONTACT DETAILS</h3>
              <a
                href="mailto:benlamkadamzakaria@gmail.com"
                className="inline-flex px-2  text-sm "
              >
                benlamkadamzakaria@gmail.com
              </a>
              <br />
              <a
                href="tel:+2120624249968"
                className="inline-flex  px-2  text-sm "
              >
                +212 624 24 99 68
              </a>
            </div>
            <div>
              <h3 className="text-gray-500 mb-2">BUSINESS DETAILS</h3>
              <p>Benlamkadam Zakaria</p>
              <p>+212 624249998</p>
              
              <p>Location: RABAT</p>
            </div>
            <div>
              <h3 className="text-gray-500 mb-2">SOCIALS</h3>
              <ul className="space-y-1">
                
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-32 flex justify-between text-sm text-gray-500">
        <div className="flex space-x-8">
          <span>2022 © Edition</span>
          <span>12:43 PM GMT+1</span>
        </div>
        <div className="flex space-x-8">
          
          <a href="#" className="hover:text-gray-300">
            Instagram
          </a>
          <a href="#" className="hover:text-gray-300">
            Twitter
          </a>
          <a href="#" className="hover:text-gray-300">
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
