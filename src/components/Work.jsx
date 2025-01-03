import React, { useState, useEffect } from "react";
import { FaList, FaTh } from "react-icons/fa"; // Replace lucide-react with react-icons
import projects from "./data"; // Import your projects data here
import { Link } from "react-router-dom"; 
import copyright from './Images/copyright1.png';
import gsap from 'gsap';
import MagnetoButton from './MagnetoButton';
import './Work.css'

export default function Work() {

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


  
  
  const [viewMode, setViewMode] = useState("list");
  const [filter, setFilter] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true;
    return project.services.some(service => service.toLowerCase().includes(filter.toLowerCase()));
  });
  

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
    <div className="min-h-screen bg-background">
      <header id="profile" className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
        <Link to="/" className="text-container2" style={{ textDecoration: "none" }}>
      <div className="text-wrapper">
        <div className="main-text">Code By Zakaria</div>
        <div className="hover-text">Benlamkadam</div>
      </div>
      <img src={copyright} alt="Zakaria Benlamkadam" className="copyright1" />
    </Link>
    <div className="text-container1">
        {/* Add Links for Navigation */}
        <Link to="/work" className="magneto-text1">Work</Link>
        <Link to="/about" className="magneto-text1">About</Link>
        <Link to="/contact" className="magneto-text1">Contact</Link>
      </div>
          
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:mx-8 lg:mx-12">
        <h1 className="mb-16 text-6xl font-medium leading-tight tracking-tight">
        Crafting innovative solutions 
          <br />
          with precision.
        </h1>

        <div className="mb-12 flex items-center justify-between">
          <div className="flex gap-4">
            {["All", "Data Analysis", "Data Engineering", "Data Science"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-full px-6 py-2 text-sm transition-colors center-button1 ${
                  filter === item
                    ? "bg-primary text-primary-foreground selected"
                    : "hover:bg-muted"
                }`}
              >
                {item}
                {item !== "All" && (
                  <span className="ml-1 text-xs">
                    {item === "Data Analysis" ? "4" : item === "Data Science" ? "3": "2"}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`rounded-full p-2 transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <FaList className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-full p-2 transition-colors md:mr-8 lg:mr-[80px] ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <FaTh className="h-5 w-5" />
            </button>
          </div>
        </div>

        {viewMode === "list" ? (
          <div className="divide-y">
            <div className="grid grid-cols-4 py-4 text-sm text-muted-foreground">
              <div className="px-3">PROJECT</div>
              <div className="px-3">TOOLS</div>
              <div className="px-3">SERVICES</div>
              <div className="px-3">YEAR</div>
            </div>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="grid grid-cols-4 py-8 hover:bg-muted/50"
              >
                <div className="text-xl p-3">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {project.name}
                  </a>
                </div>
                <div className="text-xl p-3">{project.tools}</div>
                <div className="text-xl p-3">{project.services.join(', ')}</div>
                <div className="text-xl p-3">{project.year}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="space-y-4">
                <div className="aspect-[4/2] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h2 className="text-xl">{project.name}</h2>
              </div>
            ))}
          </div>
        )}
      </main>
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
}
