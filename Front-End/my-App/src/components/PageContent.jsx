import React from 'react';

const PageContent = ({ children }) => {
  return (
    <div className="h-screen w-full md:w-2/3 p-4  flex items-center justify-center bg-gray-500 shadow-md hover:shadow-lg transition duration-300">
      {children}
    </div>
  );
};

export default PageContent;
