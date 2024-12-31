import React from 'react';
import './Certificates.css';

const Certificates = () => {
  const certificateNames = [
    "Introduction to Data Engineering", "Python for Data Science & Development", "Python Project for Data Engieering", "Supervised Machine Learning: Regression and Classification", 
    "Preparing Data for Analysis with Microsoft Excel", "Harnessing the Power of Data with Power BI", "Extract, Transform and Load Data in Power BI", "Certificate 8"
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
