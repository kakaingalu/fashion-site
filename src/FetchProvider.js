// src/FetchProvider.js
import React from 'react';
import { useFetchRedux } from './hooks/useFetchRedux.js';

function FetchProvider({ children }) {
  const { socialMedia, posts, siteIcons, loading, errors, fetchAll } = useFetchRedux();

  if (typeof children === 'function') {
    return children(socialMedia, posts, siteIcons, loading, errors, fetchAll);
  }

  return (
    <div>
      {children}
    </div>
  );
}

export default FetchProvider;
