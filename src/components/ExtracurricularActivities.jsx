import React, { useState, useEffect } from 'react';
import './ExtracurricularActivities.css';

const images = [
  "/us.jpg",
  "/us1.jpg",
  "/us2.jpg",
  "/us3.jpg",
  "/us4.jpg"
];

const roles = [
  {
    title: "Event Organizer - Tech Experience 6.0",
    description: "Organized and coordinated a university tech event, managing logistics, creating promotional materials, and ensuring smooth execution to engage and inspire attendees."
  },
  {
    title: "Club Designer - Datai Club",
    description: "Served as the Club Designer for Datai Club, crafting visually engaging materials and digital assets to enhance branding and promote club activities effectively"
  },
  {
    title: "Club Designer - CCT Club",
    description: "Worked as a Designer and one of Team Leaders of the club, contributing to event and trip organization by creating promotional designs and supporting seamless event coordination."
  },
  {
    title: "Member of TGD Club - THE GREAT DEBATERS",
    description: "Actively participated as a member of The Club, enhancing public speaking and debate skills through training sessions, engaging in debates, and representing the club in competitions."
  }
];

export default function ExtracurricularActivities() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => (prevImage + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className=" mb-12">
          <h2 className="text-4xl md:text-5xl mb-12">Extracurricular Activities</h2>

          <p className="mt-3 max-w-2xl  text-xl text-gray-500 sm:mt-4">
            Highlighting my contributions to clubs, events, and more
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:flex-shrink-0 mb-6 lg:mb-0 lg:mr-8">
                <div className="image-container">
                  <img
                    src={images[currentImage]}
                    alt="Extracurricular activities"
                    width={500}
                    className={`rounded-lg object-cover w-[500px] h-[300px]`}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <ul className="space-y-3">
                  {roles.map((role, index) => (
                    <li key={index}>
                      <h3 className="text-lg leading-6 font-medium text-gray-900 group">
                      <span className="inline-block transition duration-300 ease-in-out group-hover:text-indigo-500 cursor-pointer">
                        {role.title}
                      </span>

                      </h3>
                      <p className=" max-w-4xl text-sm text-gray-500">
                        {role.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
