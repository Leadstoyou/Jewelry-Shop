import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "cart",
  initialState: { value: [] },
  reducers: {
    addToCard: (state, action) => {
      state.value.push(action.payload);
      console.log(JSON.stringify(state.value));
    },
  },
});

export const { addToCard } = cart.actions;
export default cart.reducer;
