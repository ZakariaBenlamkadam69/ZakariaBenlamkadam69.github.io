import React from 'react';
import './Certificates.css';

const Certificates = () => {
  const certificateNames = [
    "Certificate 1", "Certificate 2", "Certificate 3", "Certificate 4", 
    "Certificate 5", "Certificate 6", "Certificate 7", "Certificate 8"
  ];

  // Each certificate image should only exist once
  const certificateImages = [
    `${process.env.PUBLIC_URL}/certificates/certificate1.png`,
    `${process.env.PUBLIC_URL}/certificates/certificate2.png`,
    `${process.env.PUBLIC_URL}/certificates/certificate3.png`,
    `${process.env.PUBLIC_URL}/certificates/certificate4.png`,
    `${process.env.PUBLIC_URL}/certificates/certificate5.png`,
    `${process.env.PUBLIC_URL}/certificates/certificate6.png`,
    `${process.env.PUBLIC_URL}/certificates/certificate7.png`,
    `${process.env.PUBLIC_URL}/certificates/certificate8.png`,
  ];

  // Duplicate the images for infinite scroll effect
  const infiniteImages = [...certificateImages, ...certificateImages];

  return (
    <section id='certificates' className="featured-certificates">
      <div className="container">
        <h2 className="text-4xl md:text-5xl mb-12 mx-6">Certificates</h2>

        <div className="certificate-grid">
          <div className="certificate-line">
            {infiniteImages.map((image, i) => {
                const certificateIndex = i % certificateImages.length; 

              return (
                <div key={i} className="certificate-card">
                  <img 
                    src={image} 
                    alt={`Certificate ${i + 1}`} 
                    className="certificate-image" 
                    loading="lazy" 
                  />
                  <h3 className="certificate-title">{certificateNames[certificateIndex]}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
