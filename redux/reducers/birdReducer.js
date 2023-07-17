import { createReducer } from "@reduxjs/toolkit";

export const birdReducer = createReducer(
  {
    birds: [],
    bird: {},
  },
  (builder) => {
    builder
      .addCase("getAdminBirdRequest", (state) => {
        state.loading = true;
      })
      .addCase("addBirdRequest", (state) => {
        state.loading = true;
      })
      .addCase("getBirdDetailsRequest", (state) => {
        state.loading = true;
      })

      .addCase("getAdminBirdsSuccess", (state, action) => {
        state.loading = false;
        state.birds = action.payload.data;
        // state.inStock = action.payload.inStock;
        // state.outOfStock = action.payload.outOfStock;
      })
      .addCase("addBirdSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("getBirdDetailsSuccess", (state, action) => {
        state.loading = false;
        state.bird = action.payload;
      })

      .addCase("getAllBirdsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("getAdminBirdsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("addBirdFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("getBirdDetailsFail", (state, action) => {
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
