import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialItemState } from "../types/ItemType";
import { AppThunk } from './store';

interface ItemState {
  items: string;
  error: string | null; 
}

const itemSlice = createSlice({
  name: "items",
  initialState: { ...initialItemState, error: null } as ItemState,
  reducers: {
    pushItems: (state, action: PayloadAction<string>) => {
      return { ...state, items: action.payload, error: null };
    },
    setError: (state, action: PayloadAction<string | null>) => {
      return { ...state, error: action.payload };
    },
  }
});

export const { pushItems, setError } = itemSlice.actions;
export default itemSlice.reducer;

export const incrementAsync = (items: string): AppThunk => (dispatch) => {
  setTimeout(() => {
    const shouldFail = Math.random() < 0.5;
    if (shouldFail) {
      dispatch(setError("Failed to fetch items"));
    } else {
      dispatch(pushItems(items));
    }
  }, 1000);
};
