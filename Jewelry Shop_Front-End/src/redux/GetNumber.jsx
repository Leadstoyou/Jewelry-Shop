import { createSlice } from "@reduxjs/toolkit";



const numberCart = createSlice({
  name: "number",
  initialState: { value: 0 },
  reducers: {
    getNumber: (state, action) => {
      // console.log(action.payload);
      state.value = action.payload
    },
  },
});

export const {getNumber} = numberCart.actions;
export default numberCart.reducer;
