import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import Main from './components/Main';
import AboutMe from './components/AboutMe';
import Work from './components/Work';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';

import './App.css'
function App() {
  return (
    <Router>
    <ScrollToTop />
    <div className="no-scrollbar">
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Helmet>
                <title>Zakaria's Portfolio</title> {/* Title for the main page */}
                <link rel="icon" href="/favicon-main.ico" /> {/* Favicon for the main page */}
              </Helmet>
              <Main />
            </>
          } 
        />
        <Route 
          path="/work" 
          element={
            <>
              <Helmet>
                <title>Work of Zakaria</title> {/* Title for the work page */}
                <link rel="icon" href="/favicon-work.ico" /> {/* Favicon for the work page */}
              </Helmet>
              <Work />
            </>
          } 
        />
        <Route 
          path="/about" 
          element={
            <>
              <Helmet>
                <title>About Zakaria</title> {/* Title for the about me page */}
                <link rel="icon" href="/favicon-about.ico" /> {/* Favicon for the about me page */}
              </Helmet>
              <AboutMe />
            </>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <>
              <Helmet>
                <title>Contact Zakaria</title> {/* Title for the contact page */}
                <link rel="icon" href="/favicon-contact.ico" /> {/* Favicon for the contact page */}
              </Helmet>
              <Contact />
            </>
          } 
        />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
