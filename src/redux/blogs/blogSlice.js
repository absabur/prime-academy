import { createSlice } from '@reduxjs/toolkit';
import { fetchBlogCategories, fetchBlogs, fetchLatestBlogs, fetchSingleBlog } from './blogAction';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    categories: [],
    blogs: [],
    latestBlogs: [],
    blog: {},
    blogPagination: {},
    pageSize: 9,
    loadingBlogs: true,
    loadingBlog: true,
    loadingBlogCategory: true,
    loadingLatestBlogs: true,
    error: null,
    message: null,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Blog categories
    builder
      .addCase(fetchBlogCategories.pending, (state) => {
        state.loadingBlogCategory = true;
        state.error = null;
      })
      .addCase(fetchBlogCategories.fulfilled, (state, action) => {
        state.loadingBlogCategory = false;
        state.categories = action.payload.data.results;
      })
      .addCase(fetchBlogCategories.rejected, (state, action) => {
        state.loadingBlogCategory = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload.message;
      });

    // Blogs
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loadingBlogs = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loadingBlogs = false;
        state.blogs = action.payload.data.results;
        state.blogPagination = {
          count: action.payload?.data?.count,
          next: action.payload?.data?.next,
          previous: action.payload?.data?.previous,
        };
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loadingBlogs = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // Latest Blogs
    builder
      .addCase(fetchLatestBlogs.pending, (state) => {
        state.loadingLatestBlogs = true;
        state.error = null;
      })
      .addCase(fetchLatestBlogs.fulfilled, (state, action) => {
        state.loadingLatestBlogs = false;
        state.latestBlogs = action.payload.data.results;
      })
      .addCase(fetchLatestBlogs.rejected, (state, action) => {
        state.loadingLatestBlogs = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    //single blog
    builder
      .addCase(fetchSingleBlog.pending, (state) => {
        state.loadingBlog = true;
        state.error = null;
      })
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.loadingBlog = false;
        state.blog = action.payload.data; // store single blog
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.loadingBlog = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
  },
});

export const { setActiveCategory, clearMessage, clearError } = blogSlice.actions;
export default blogSlice.reducer;
