import React, { useState } from 'react';
import copyright from './Images/copyright.png';
import { Link } from "react-router-dom"; 
import { useEffect } from "react";
import emailjs from 'emailjs-com';
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

    // Send email using EmailJS
    emailjs
      .send(
        'service_8r2mxey', // Your EmailJS service ID
        'template_snmg0nu', // Your EmailJS template ID
        formData, // Your form data
        'NgJpq_ofKPyQO1xhb' // Your EmailJS user ID
      )
      .then(
        (response) => {
          console.log('Email successfully sent!', response);
          alert('Your message has been sent successfully!');
        },
        (error) => {
          console.error('Failed to send email:', error);
          alert('Failed to send your message. Please try again.');
        }
      );
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

  useEffect(() => {
    const button = document.querySelector('.send-button');
    
    // If button text needs to be targeted separately, ensure it exists and select it
    const buttonText = button ? button.querySelector('.text') : null;
    
    const activateMagneto = (event, element, strength) => {
      let boundBox = element.getBoundingClientRect();
      const newX = ((event.clientX - boundBox.left) / element.offsetWidth) - 0.5;
      const newY = ((event.clientY - boundBox.top) / element.offsetHeight) - 0.5;
  
      // Apply the magnet effect on the button
      gsap.to(element, {
        duration: 1,
        x: newX * strength,
        y: newY * strength,
        ease: 'power4.out'
      });
  
      // Apply the magnet effect on the text, if it exists
      if (buttonText) {
        gsap.to(buttonText, {
          duration: 1,
          x: newX * strength,
          y: newY * strength,
          ease: 'power4.out'
        });
      }
    };
  
    const resetMagneto = (element, textElement) => {
      gsap.to(element, {
        duration: 1,
        x: 0,
        y: 0,
        ease: 'power4.out'
      });
  
      if (textElement) {
        gsap.to(textElement, {
          duration: 1,
          x: 0,
          y: 0,
          ease: 'power4.out'
        });
      }
    };
  
    const handleButtonMouseMove = (event) => {
      if (button) {
        activateMagneto(event, button, 30); // Apply the effect to the button
      }
    };
  
    if (button) {
      button.addEventListener('mousemove', handleButtonMouseMove);
      button.addEventListener('mouseleave', () => resetMagneto(button, buttonText));
    }
  
    return () => {
      if (button) {
        button.removeEventListener('mousemove', handleButtonMouseMove);
        button.removeEventListener('mouseleave', () => resetMagneto(button, buttonText));
      }
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
            <div className="flex justify-center">
              <button
                type="submit"
                className="send-button"
              >
                <span className="text">Send it!</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right column */}
        <div className='column-right'>
          <div className="mb-12">
            <img src="zakaria1.png" alt="Profile1" className="rounded-full w-[130px] h-[130px]" />
          </div>

          <div className="space-y-12 text-sm mt-6">
            <div className="right-column">
              <h3 className="text-gray-500 mb-2 text-xl">CONTACT DETAILS</h3>
              <span><a
                href="mailto:benlamkadamzakaria@gmail.com"
                className="inline-flex text-lg"
              >
                 benlamkadamzakaria@gmail.com
              </a></span>
              <br />
              <a
                href="tel:+2120624249968"
                className="inline-flex text-lg "
              >
                +212 624 24 99 68
              </a>
            </div>
            <div>
              <h3 className="text-gray-500 mb-2 text-xl">BUSINESS DETAILS</h3>
              <p className='text-lg'>Benlamkadam Zakaria</p>
              <p className='text-lg'>+212 624 24 99 98</p>
              
              <p className='text-lg'>Location: RABAT</p>
            </div>
            <div>
              <h3 className="text-gray-500 mb-2 text-xl">SOCIALS</h3>
              <ul className="space-y-1">
                
                <li>
                  <a href="https://github.com/ZakariaBenlamkadam/" className="hover:text-gray-300 text-lg" target="_blank" rel="noopener noreferrer">
                    Github
                  </a>
                </li>
                <li>
                  <a href="https://medium.com/@benlamkadamzakaria" className="hover:text-gray-300 text-lg" target="_blank" rel="noopener noreferrer">
                    Medium
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/zakaria-benlamkadam/" className="hover:text-gray-300 text-lg" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 ">
        <div className="max-w-[1400px] mx-auto flex flex-col justify-center items-center text-center">
          <p className="text-sm text-gray-600">© 2025 Code by Zakaria. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
