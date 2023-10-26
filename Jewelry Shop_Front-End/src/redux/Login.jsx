import { createSlice } from "@reduxjs/toolkit";



const loginController = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.value =  action.payload ;
    },
    update: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    }
  },
});

export const {login , update} = loginController.actions;
export default loginController.reducer;
