// src/store/fetchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// axios import
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://143.198.152.80:3001',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export const fetchSocialMedia = createAsyncThunk(
  'fetch/socialMedia',
  async () => {
    const response = await axiosInstance.get('http://143.198.152.80:3001/api/social-media-links');
    return response.data;
  }
);

export const fetchPosts = createAsyncThunk(
  'fetch/posts',
  async () => {
    const response = await axiosInstance.get('https://143.198.152.80:3001/api/posts');
    return response.data;
  }
);

export const fetchSiteIcons = createAsyncThunk(
  'fetch/siteIcons',
  async () => {
    const response = await axiosInstance.get('http://143.198.152.80:3001/api/site-icons');
    return response.data;
  }
);

const fetchSlice = createSlice({
  name: 'fetch',
  initialState: {
    socialMedia: [],
    posts: [],
    siteIcons: {},
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocialMedia.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSocialMedia.fulfilled, (state, action) => {
        state.socialMedia = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchSocialMedia.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      })
      .addCase(fetchSiteIcons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSiteIcons.fulfilled, (state, action) => {
        state.siteIcons = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchSiteIcons.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      });
  },
});

export default fetchSlice.reducer;
