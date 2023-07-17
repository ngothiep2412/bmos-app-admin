import { createReducer } from "@reduxjs/toolkit";

export const postReducer = createReducer(
  {
    posts: [],
    post: [],
  },
  (builder) => {
    builder
      .addCase("getAdminPostRequest", (state) => {
        state.loading = true;
      })
      .addCase("getPostDetailsRequest", (state) => {
        state.loading = true;
      })
      .addCase("addPostRequest", (state) => {
        state.loading = true;
      })
      .addCase("updatePostRequest", (state) => {
        state.loading = true;
      })
      .addCase("getAdminPostsSuccess", (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        // state.inStock = action.payload.inStock;
        // state.outOfStock = action.payload.outOfStock;
      })
      .addCase("getPostDetailsSuccess", (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase("addPostSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("updatePostSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("getAllPostsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("addPostFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("updatePostFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("getAdminPostsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("getPostDetailsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder.addCase("clearError", (state) => {
      state.error = null;
    });
    builder.addCase("clearMessage", (state) => {
      state.message = null;
    });
  }
);
