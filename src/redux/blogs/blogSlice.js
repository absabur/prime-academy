import { createSlice } from '@reduxjs/toolkit';
import {
  addBlog,
  addBlogCategories,
  editBlog,
  fetchBlogCategories,
  fetchBlogs,
  fetchBlogsAdmin,
  fetchLatestBlogs,
  fetchSingleBlog,
} from './blogAction';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    categories: [],
    blogs: [],
    adminPanelBlogs: [],
    latestBlogs: [],
    blog: {},
    blogPagination: {},
    pageSize: 9,
    loadingBlogs: true,
    loadingActionBlogs: false,
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
        // state.loadingBlogCategory = true;
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
        // state.loadingBlogs = true;
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

    // Blogs
    builder
      .addCase(fetchBlogsAdmin.pending, (state) => {
        // state.loadingBlogs = true;
        state.error = null;
      })
      .addCase(fetchBlogsAdmin.fulfilled, (state, action) => {
        state.loadingBlogs = false;
        state.adminPanelBlogs = action.payload.data.results;
        state.blogPagination = {
          count: action.payload?.data?.count,
          next: action.payload?.data?.next,
          previous: action.payload?.data?.previous,
        };
      })
      .addCase(fetchBlogsAdmin.rejected, (state, action) => {
        state.loadingBlogs = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // Latest Blogs
    builder
      .addCase(fetchLatestBlogs.pending, (state) => {
        // state.loadingLatestBlogs = true;
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

    // add blog
    builder
      .addCase(addBlog.pending, (state) => {
        state.loadingActionBlogs = true;
        state.error = null;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.loadingActionBlogs = false;
        state.message = action.payload.message;
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.loadingActionBlogs = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // add addBlogCategories
    builder
      .addCase(addBlogCategories.pending, (state) => {
        state.loadingActionBlogs = true;
        state.error = null;
      })
      .addCase(addBlogCategories.fulfilled, (state, action) => {
        state.loadingActionBlogs = false;
        state.message = action.payload.message;
      })
      .addCase(addBlogCategories.rejected, (state, action) => {
        state.loadingActionBlogs = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // editblog
    builder
      .addCase(editBlog.pending, (state) => {
        state.loadingActionBlogs = true;
        state.error = null;
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        state.loadingActionBlogs = false;
        state.message = action.payload.message;
      })
      .addCase(editBlog.rejected, (state, action) => {
        state.loadingActionBlogs = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
  },
});

export const { setActiveCategory, clearMessage, clearError } = blogSlice.actions;
export default blogSlice.reducer;
