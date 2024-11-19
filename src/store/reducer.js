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

export const addPost = createAsyncThunk(
  'fetch/addPost',
  async (postData, thunkAPI) => {
    try {
      const instance = axios.create({
        baseURL: 'http://localhost:3001',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });
      const response = await instance.post('/api/posts', postData);
      return response.data;
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
  }
);

export const imageUpload = createAsyncThunk(
  'fetch/imageUpload',
  async (formData, thunkAPI) => {
    try {
      const instance = axios.create({
        baseURL: 'http://localhost:3001',
        headers: {
          'Content-Type': 'application/json',
        },

      });
      const response = await instance.post('/api/upload-image', formData);
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
);

export const deletePost = createAsyncThunk(
  'fetch/deletePost',
  async (id, thunkAPI) => {
    try {
      const instance = axios.create({
        baseURL: 'http://localhost:3001',
        headers: {
          'Content-Type': 'application/json',
        },

      });
      const response = await instance.delete(`/api/posts/${id}`);

      // Check if the response is empty
      if (!response.data || Object.keys(response.data).length === 0) {
        throw new Error('No data returned from server');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error deleting post:', error);
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
      })
      .addCase( addPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase( addPost.fulfilled, (state, action) => {
        console.log(action.payload);
        state.posts.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase( addPost.rejected, (state, action) => {
        console.error('Error adding post:', action.error.message);
        state.error = action.error.message;
        state.status = 'failed';
      })
      .addCase( imageUpload.pending, (state) => {
        state.status = 'loading';
      })
      .addCase( imageUpload.fulfilled, (state, action) => {
        console.log(action.payload);
        state.posts.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase( imageUpload.rejected, (state, action) => {
        console.error('Error uploading image:', action.error.message);
        state.error = action.error.message;
        state.status = 'failed';
      })
      .addCase( deletePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase( deletePost.fulfilled, (state, action) => {
        console.log(action.payload);
        state.posts = state.posts.filter(post => post.id !== action.payload.id);
        state.status = 'succeeded';
      })
      .addCase( deletePost.rejected, (state, action) => {
        console.error('Error deleting post:', action.error.message);
        state.error = action.error.message;
        state.status = 'failed';
      });
  },
});

export default fetchSlice.reducer;