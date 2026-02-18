import { createSlice } from '@reduxjs/toolkit';

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `blog-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

const initialState = {
  blogs: [],
  selectedBlog: null,
  isEditing: false,
  showBlogsModal: false,
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog: (state, action) => {
      const newBlog = {
        ...action.payload,
        id: action.payload.id ?? generateId(),
      };
      state.blogs.push(newBlog);
    },
    updateBlog: (state, action) => {
      const updatedBlog = action.payload;
      const selectedId = state.selectedBlog?.id;
      const index = state.blogs.findIndex((b) => b.id === selectedId);
      if (index !== -1) {
        state.blogs[index] = { ...updatedBlog, id: state.blogs[index].id };
      }
      state.selectedBlog = null;
      state.isEditing = false;
    },
    deleteBlog: (state, action) => {
      const blogToDelete = action.payload;
      const idToDelete = blogToDelete?.id;
      if (idToDelete == null) return;
      state.blogs = state.blogs.filter((b) => b.id !== idToDelete);
      if (state.selectedBlog?.id === idToDelete) {
        state.selectedBlog = null;
        state.showBlogsModal = false;
      }
    },
    setSelectedBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
      state.isEditing = false;
      state.showBlogsModal = false;
    },
    setEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    showBlogModal: (state, action) => {
      state.selectedBlog = action.payload;
      state.showBlogsModal = true;
    },
    hideBlogModal: (state) => {
      state.showBlogsModal = false;
      state.selectedBlog = null;
    },
    startEditBlog: (state, action) => {
      state.selectedBlog = action.payload;
      state.isEditing = true;
    },
  },
});

export const {
  addBlog,
  updateBlog,
  deleteBlog,
  setSelectedBlog,
  clearSelectedBlog,
  setEditing,
  showBlogModal,
  hideBlogModal,
  startEditBlog,
} = blogSlice.actions;

export default blogSlice.reducer;
