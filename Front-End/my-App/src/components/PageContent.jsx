// src/components/PageContent.js

import React from 'react';

const PageContent = ({ children }) => {
  return <div className="h-screen w-2/3 p-4 flex">{children}</div>;
};

export default PageContent;
