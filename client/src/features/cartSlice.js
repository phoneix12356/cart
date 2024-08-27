import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const fetchUserCart = createAsyncThunk(
  "userCartStatus/fetchbyid",
  async (_, { rejectWithValue }) => {
    try {
      console.log("hello");
      const response = await api.get(`/api/cart`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      console.log("async thunk fetching data", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const AddItemToUserCart = createAsyncThunk(
  "AddItemToUserCartDataBase/AddToUserCartById",
  async (productPlusQuantity, { rejectWithValue }) => {
    try {
      const { product, quantity } = productPlusQuantity;
      const response = await api.post(
        "/api/cart/add",
        { product, quantity },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const DeleteItemofUserCart = createAsyncThunk(
  "DelteItem/DeleteOfUserCartById",
  async (productId, { rejectWithValue }) => {
    try {
      const { id } = productId;
      console.log(id);
      const response = await api.delete(`/api/cart/delete/${id}` , {
        headers : {
          "x-auth-token":localStorage.getItem("token")
        }
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      console.log(product, quantity);
      const existingItem = state.list.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.stock += quantity;
      } else {
        state.list.push({ ...product, stock: quantity });
      }
    },
    removeFromCart: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.list.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newList = action.payload.map((fetchedItem) => {
          const existingItem = state.list.find(
            (item) => item.id === fetchedItem.id
          );
          if (existingItem) {
            return {
              ...existingItem,
              ...fetchedItem,
              quantity: existingItem.quantity + fetchedItem.quantity,
            };
          }

          return fetchedItem;
        });
        state.list.forEach((stateItem) => {
          if (!newList.some((newItem) => newItem.id === stateItem.id)) {
            newList.push(stateItem);
          }
        });

        state.list = newList;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(AddItemToUserCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddItemToUserCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.items;
      })
      .addCase(AddItemToUserCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
