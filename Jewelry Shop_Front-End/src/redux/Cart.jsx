import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "cart",
  initialState: { value: [] },
  reducers: {
    addToCard: (state, action) => {
      const payloadId = action.payload._id;
      const findIndex = state.value.findIndex((item) => item._id === payloadId);

      console.log(`Payload ID: ${payloadId}`);
      console.log(`Cart Items: ${JSON.stringify(state.value)}`);
      console.log(`Find Index: ${findIndex}`);

      if (findIndex === -1) {
        state.value.push({ ...action.payload, orderNumber: 1 });
      } else {
        state.value[findIndex].orderNumber += 1;
      }

      console.log(JSON.stringify(state.value));
    },
  },
});

export const { addToCard } = cart.actions;
export default cart.reducer;
