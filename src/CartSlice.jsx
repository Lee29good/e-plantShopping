import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
    amount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      console.log("add");
      const { name, image, cost } = action.payload;
      state.amount++;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const itemToRemove = state.items.find(item => item.name === action.payload);
      if (itemToRemove) {
        state.amount -= itemToRemove.quantity; // 減去該物品的數量
        state.items = state.items.filter((item) => item.name !== action.payload);
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        if (quantity === 0) {
          // 如果數量為0，則刪除該項目
          state.amount -= itemToUpdate.quantity; // 減去該物品的數量
          state.items = state.items.filter((item) => item.name !== name);
        } else {
          // 如果數量有變動，則更新數量
          state.amount += quantity - itemToUpdate.quantity; // 只更新變動的數量
          itemToUpdate.quantity = quantity;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
