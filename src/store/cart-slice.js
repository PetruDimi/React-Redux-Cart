import { createSlice } from "@reduxjs/toolkit";

// item configuration
// const itemConfig = {
//     title:'',
//     id: ,
//     price: 1.3,
//     amount: 1
// }

const initialCartState = {
  items: [],
  totalAmount: 0,
  totalPrice: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      const { items, totalAmount, totalPrice } = action.payload;
      state.items = items;
      state.totalAmount = totalAmount;
      state.totalPrice = totalPrice;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      console.log(state.items);
      
      const existingItemIndex = state.items.findIndex((item) => {
        return item.id === newItem.id;
      });
      if (existingItemIndex === -1) {
        state.items.push(newItem);
      } else {
        state.items[existingItemIndex].amount++;
      }
      state.changed = true
      state.totalPrice = state.totalPrice + newItem.price;
      state.totalAmount++;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingIdIndex = state.items.findIndex((item) => {
        return item.id === id;
      });
      state.totalPrice = state.totalPrice - state.items[existingIdIndex].price;
      state.totalAmount--;

      state.items[existingIdIndex].amount--;
      if (state.items[existingIdIndex].amount === 0) {
        const updatedItems = state.items.filter((item) => {
          return item.id !== id;
        });
        state.items = updatedItems;
        state.changed = true
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
