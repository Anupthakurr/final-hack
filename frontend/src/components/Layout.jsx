// src/components/Layout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust the path if needed

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Don't show sidebar on home route
  const isHomePage = location.pathname === '/';
  const signUp =location.pathname==='/sign-up'
  
  return (
    <div className="flex ">
      {!isHomePage&&!signUp && <Sidebar />}
      <div className={!isHomePage ? "ml-64 bg-gray-900 flex-1" : "flex-1"}>
        {children}
      </div>
    </div>
  );
};

export default Layout;