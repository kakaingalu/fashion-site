// React imports
import { useMemo, useCallback } from 'react';

// src/hooks/useFetchRedux.js
import { useDispatch, useSelector } from 'react-redux';
import { fetchSocialMedia, fetchPosts, fetchSiteIcons } from '../store/reducer.js';
import { createSelector } from '@reduxjs/toolkit';

const selectFetchData = createSelector(
  (state) => state.fetch,
  (fetchState) => ({
    socialMedia: fetchState.socialMedia,
    posts: fetchState.posts,
    siteIcons: fetchState.siteIcons,
    status: fetchState.status,
    error: fetchState.error,
  })
);


export function useFetchRedux() {
  const dispatch = useDispatch();

  const fetchAll = useCallback(async () => {
    await Promise.all([
      dispatch(fetchSocialMedia()),
      dispatch(fetchPosts()),
      dispatch(fetchSiteIcons()),
    ]);
  }, [dispatch]);

  const { socialMedia, posts, siteIcons, loading, errors } = useSelector(selectFetchData);

  return useMemo(() => ({
    socialMedia,
    posts,
    siteIcons,
    loading: loading === 'loading',
    errors: errors || null,
    fetchAll,
  }), [socialMedia, posts, siteIcons, loading, errors, fetchAll]);
}