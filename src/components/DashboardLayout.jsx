import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { RingLoader } from 'react-spinners';

const DashboardLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (replace with actual loading logic if needed)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen">
      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <RingLoader color={'#36D7B7'} size={150} />
        </div>
      ) : (
        <>
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <div className="flex-1 p-6 bg-gray-100 overflow-auto">
              {children}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
