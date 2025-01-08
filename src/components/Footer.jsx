import { useEffect, useState } from "react";
import './Footer.css'
import { gsap } from 'gsap';
import profileImage from './Images/zakaria1.png';
import { Link } from "react-router-dom"; 



export default function Footer() {
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const magneto = document.querySelector('.button-get');
    const magnetoText = document.querySelector('.button-get .text'); // Select the text span

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
      magneto.removeEventListener('mousemove', (event) => activateMagneto(event, magneto, magnetoText, 80));
      magneto.removeEventListener('mouseleave', () => resetMagneto(magneto, magnetoText));
    };
  }, []);
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "CET",
          timeZoneName: "short"
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-screen-xl px-4 py-12">
        <div className="flex flex-col gap-20">
          <div className="relative">
          <div className="flex flex-col">
  <div className="flex items-center gap-4 ml-20">
    {/* Image inline with "Let's work" */}
    <img 
      className="rounded-full h-20 w-20" 
      src={profileImage}  
      alt="Profile" 
    />
    <span className="text-5xl font-light leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
      Let's work
    </span>
  </div>
  <div>
    {/* "together" below the image */}
    <span className="text-5xl font-light leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl ml-20">
      together
    </span>
  </div>
</div>

            <div className="absolute top-0 left-10"> {/* Apply absolute positioning here */}
              <button className="button-get" size="lg">
              <Link to="/contact" className="text">Get in touch</Link>              </button>
            </div>
          </div>

          <div className="mt-auto ml-20 mr-20">
            <div className="mb-20 h-px w-full bg-zinc-800" />
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:benlamkadamzakaria@gmail.com"
                className="inline-flex items-center rounded-full border border-zinc-800 px-6 py-3 text-sm hover:bg-zinc-900"
              >
                benlamkadamzakaria@gmail.com
              </a>
              <a
                href="tel:+2120624249968"
                className="inline-flex items-center rounded-full border border-zinc-800 px-6 py-3 text-sm hover:bg-zinc-900"
              >
                +212 624 24 99 68
              </a>
            </div>
          </div>

          <footer className="mt-auto flex flex-col gap-8 border-t border-zinc-800 py-8">
            <div className="grid grid-cols-1 gap-8 text-sm text-zinc-400 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <p className="text-xs uppercase">VERSION</p>
                <p>2025 © Edition</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase">LOCAL TIME</p>
                <p>{currentTime}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase">SOCIALS</p>
                <div className="flex gap-4">
                  <a href="https://github.com/ZakariaBenlamkadam/" className="hover:text-zinc-100">
                    Github
                  </a>
                  <a href="https://www.instagram.com/aakaa_riii/" className="hover:text-zinc-100">
                    Instagram
                  </a>
                  <a href="https://medium.com/@benlamkadamzakaria" className="hover:text-zinc-100">
                    Medium
                  </a>
                  <a href="https://www.linkedin.com/in/zakaria-benlamkadam/" className="hover:text-zinc-100">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
