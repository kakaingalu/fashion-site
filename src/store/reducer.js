// src/store/fetchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// axios import
import axios from 'axios';

export const fetchSocialMedia = createAsyncThunk(
  'fetch/socialMedia',
  async (_, thunkAPI) => {
    try {
      const instance = axios.create({
        baseURL: 'http://localhost:3001',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });
      const response = await instance.get('/api/social-media-links');
      return response.data;
    } catch (error) {
      console.error('Error fetching social media links:', error);
      throw error;
    }
  }
);

export const fetchPosts = createAsyncThunk(
  'fetch/posts',
  async (_, thunkAPI) => {
    try {
      const instance = axios.create({
        baseURL: 'http://localhost:3001',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });
      const response = await instance.get('/api/posts');
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }
);

export const fetchSiteIcons = createAsyncThunk(
  'fetch/siteIcons',
  async (_, thunkAPI) => {
    try {
      const instance = axios.create({
        baseURL: 'http://localhost:3001',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });
      const response = await instance.get('/api/site-icons');
      return response.data;
    } catch (error) {
      console.error('Error fetching site icons:', error);
      throw error;
    }
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