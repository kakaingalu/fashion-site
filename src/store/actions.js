// actions.js
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

// Axios import
import axios from 'axios';

// Action Types
export const FETCH_SOCIAL_MEDIA = 'fetch/socialMedia';
export const FETCH_SITE_ICONS = 'fetch/siteIcons';
export const ADD_POST = 'posts/add';
export const REMOVE_POST = 'posts/remove';
export const FETCH_POSTS = 'posts/fetch';

// Action Creators
export const fetchSocialMedia = createAction(FETCH_SOCIAL_MEDIA);
export const fetchSiteIcons = createAction(FETCH_SITE_ICONS);
export const addPost = createAction(ADD_POST);
export const removePost = createAction(REMOVE_POST);
export const fetchPosts = createAction(FETCH_POSTS);

// Async Thunks
export const fetchSocialMediaAsync = createAsyncThunk(
  FETCH_SOCIAL_MEDIA,
  async () => {
    const response = await axios.get('http://localhost:3001/api/social-media-links');
    return response.data;
  }
);

export const fetchSiteIconsAsync = createAsyncThunk(
  FETCH_SITE_ICONS,
  async () => {
    const response = await axios.get('http://localhost:3001/api/site-icons');
    return response.data;
  }
);

export const fetchPostsAsync = createAsyncThunk(
  FETCH_POSTS,
  async () => {
    const response = await axios.get('http://localhost:3001/api/posts');
    return response.data;
  }
);

// Action Creators for async actions
export const fetchSocialMediaAction = () => ({ type: FETCH_SOCIAL_MEDIA });
export const fetchSiteIconsAction = () => ({ type: FETCH_SITE_ICONS });

// Reducer Actions
export const addPostAction = (newPost) => ({
  type: ADD_POST,
  payload: newPost
});

export const removePostAction = (id) => ({
  type: REMOVE_POST,
  payload: id
});
