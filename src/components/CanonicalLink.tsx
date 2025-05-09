import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const CanonicalLink: React.FC = () => {
  const location = useLocation();
  // Construct the canonical URL using the base domain and the current pathname
  // Ensure the base URL is correct (https://zahabprice.online)
  const canonicalUrl = `https://zahabprice.online${location.pathname === '/' ? '' : location.pathname}`; // Handle base path correctly

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default CanonicalLink;
