import { configureStore, ThunkAction, Action, AnyAction } from '@reduxjs/toolkit';
import itemsReducer from "./itemsSlice";
import loadingReducer from "./loadingSlice";
import thunkMiddleware from 'redux-thunk';
import { ThunkAction as ReduxThunkAction, ThunkDispatch } from 'redux-thunk';

const store = configureStore({
    reducer: {
        items: itemsReducer,
        loading: loadingReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
});

export type RootState = ReturnType<typeof store.getState>
export default store;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;