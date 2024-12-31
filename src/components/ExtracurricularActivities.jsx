import React, { useState, useEffect } from 'react';
import './ExtracurricularActivities.css';

const images = [
  
  "/us1.jpg",
  "/us2.jpg",
  "/us3.jpg",
  "/us4.jpg"
];

const roles = [
  {
    title: "Club Designer",
    description: "Led the design team for the university's art club, creating posters and promotional materials for events and exhibitions."
  },
  {
    title: "Event Organizer",
    description: "Coordinated and managed the annual charity run, raising over $10,000 for local community projects."
  },
  {
    title: "Debate Team Captain",
    description: "Led the debate team to regional finals, mentoring new members and developing strategic argument techniques."
  },
  {
    title: "Volunteer Coordinator",
    description: "Organized and managed a team of 50+ volunteers for various community service projects throughout the academic year."
  }
];

export default function ExtracurricularActivities() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
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
                        <span className="inline-block transition duration-300 ease-in-out border-b-2 border-transparent group-hover:border-indigo-500">
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
