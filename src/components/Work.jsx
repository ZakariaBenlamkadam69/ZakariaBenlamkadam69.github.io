import React, { useState, useEffect } from "react";
import { FaList, FaTh } from "react-icons/fa"; // Replace lucide-react with react-icons
import projects from "./data"; // Import your projects data here
import { Link } from "react-router-dom"; 
import copyright from './Images/copyright1.png';
import gsap from 'gsap';


export default function Work() {
  const [viewMode, setViewMode] = useState("list");
  const [filter, setFilter] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true;
    return project.services.toLowerCase().includes(filter.toLowerCase());
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
      <header className="container mx-auto px-4 py-8">
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
            {["All", "Data Analysis", "Data Engineering"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-full px-6 py-2 text-sm transition-colors ${
                  filter === item
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {item}
                {item !== "All" && (
                  <span className="ml-1 text-xs">
                    {item === "Data Analysis" ? "7" : "11"}
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
              <div>PROJECT</div>
              <div>TOOLS</div>
              <div>SERVICES</div>
              <div>YEAR</div>
            </div>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="grid grid-cols-4 py-8 hover:bg-muted/50"
              >
                <div className="text-xl">{project.name}</div>
                <div>{project.tools}</div>
                <div>{project.services}</div>
                <div>{project.year}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="space-y-4">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h2 className="text-xl">{project.name}</h2>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
