import React, { Suspense } from 'react';
import Navbar from './navbar';
import Footer from './footer';



const WithLayout = (Component) => {
  return (props) => {
    const showLayout = ['/', '/about-us', '/faq']; // List of paths where you want to show the navbar and footer
    const currentPath = window.location.pathname;

    return (
      <div className="min-h-screen flex flex-col">
        {showLayout.includes(currentPath) && <Navbar />}
        <main className="flex-grow">
          <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
          </Suspense>
        </main>
        {showLayout.includes(currentPath) && <Footer />}
      </div>
    );
  };
};

export default WithLayout;
