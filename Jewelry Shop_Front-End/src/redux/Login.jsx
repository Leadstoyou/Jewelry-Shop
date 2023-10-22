import { createSlice } from "@reduxjs/toolkit";



const loginController = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    login: (state, action) => {
      state.value = action.payload
    },
  },
});

export const {login} = loginController.actions;
export default loginController.reducer;
