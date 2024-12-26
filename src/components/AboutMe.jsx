import React from "react";
import gsap from 'gsap';
import './AboutMe.css';
import { Link } from "react-router-dom"; 
import { FaGlobe, FaArrowRight,   FaStar, FaUsers, FaCoffee } from "react-icons/fa";
import { useEffect } from "react";
import copyright from './Images/copyright1.png';



const AboutMe = () => {

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
    <div className="min-h-screen bg-white">
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
      <div className="relative overflow-hidden ml-8">
        <img
          src="/me.jpg"
          alt="City landscape"
          className="object-cover rounded-lg"
          style={{ width: '500px', height: 'auto' }}
        />
      </div>
  {/* Description Section */}
  <div className="space-y-6">
    <div className="flex items-start gap-4">
      <FaGlobe className="w-10 h-20 text-[#4169E1]" />
    </div>
    <p className="text-xl leading-relaxed text-gray-800">
      The combination of my passion for analysis and visualization positions me to transform complexity into clarity and impactful decisions.
    </p>
    <p className="text-lg text-gray-600">Always exploring</p>
  </div>

  {/* Image Section */}
  
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

      {/* My Process Section */}
      <section className="px-6 py-20 max-w-[1400px] mx-auto">
        <h2 className="text-4xl md:text-5xl mb-12">My Process</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[ 
            { icon: FaCoffee, title: "Discovery", description: "Understanding your needs and goals" },
            { icon: FaUsers, title: "Collaboration", description: "Working closely with you to refine ideas" },
            { icon: FaStar, title: "Creation", description: "Bringing concepts to life with precision" },
            { icon: FaArrowRight, title: "Delivery", description: "Launching your project with ongoing support" },
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <step.icon className="w-12 h-12 mb-4 text-[#4169E1]" />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

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
          <p className="text-sm text-gray-600">© 2024 Code by Zakaria. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default AboutMe;
