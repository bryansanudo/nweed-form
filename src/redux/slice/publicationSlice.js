import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  publications: [],
};

const publicationSlice = createSlice({
  name: "publication",
  initialState,
  reducers: {
    STORE_PUBLICATIONS(state, action) {
      console.log(action.payload.publications);
      state.publications = action.payload.publications;
    },
  },
});

export const { STORE_PUBLICATIONS } = publicationSlice.actions;

export const selectPublications = (state) => state.publication.publications;

export default publicationSlice.reducer;
