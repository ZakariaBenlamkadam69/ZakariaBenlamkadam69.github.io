import './Projects.css';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from "react-router-dom"; 


function Projects() {
  const projects = [
    {
      title: "Moroccan Universities Scopus Analysis",
      category: "Data Engineering / Data Analysis",
      href: "https://zakariabenlamkadam.github.io/moroccan-analysis-web/",
      image: "./architecture.png",
    },
    {
      title: "MediAi Health Analysis",
      category: "Data Engineering / Data Analysis",
      href: "https://zakariabenlamkadam.github.io/mediai-web/",
      image: "./architecture.png",
    },
    {
      title: "Morrocan Content Opinion Poll",
      category: "Data Analysis",
      href: "https://github.com/ZakariaBenlamkadam/morrocan-content",
      image: "./architecture.png",
    },
    {
      title: "Predict Winning Products",
      category: "Machine Learning",
      href: "https://github.com/ZakariaBenlamkadam/Classification_Products",
      image: "./architecture.png",
    },
  ];

  

  
  

  useEffect(() => {
    const magneto = document.querySelector('.center-button');
    const magnetoText = document.querySelector('.center-button .text');

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
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-xs font-normal tracking-wider text-muted-foreground mb-12 ml-[10%]">RECENT WORK</h2>
        <div className="space-y-8 mb-[5%] relative">
          
          

          {projects.map((project, index) => (
            <div
              key={index}
              
            >
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-1 md:grid-cols-2 items-center gap-4 py-8 project-card"
              >
                <h3 className="text-3xl md:text-5xl lg:text-4xl ml-[20%] font-bold tracking-tight transition-colors group-hover:text-muted-foreground">
                  {project.title}
                </h3>
                <div className="text-sm md:text-base text-left md:text-right text-muted-foreground mr-[20%] ml-[20%]">
                  {project.category}
                </div>
              </a>
              {index < projects.length - 1 && <div className="border-t border-border" />}
            </div>
          ))}
        </div>

        <div className="center-button-container">
          <button className="center-button">
            <Link to="/work" className="text">More Projects</Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Projects;
