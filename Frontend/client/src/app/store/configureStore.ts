import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/counterSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSlice } from "../../features/basket/basketSlice";
import { Store } from 'redux';
import { catalogSlice } from "../../features/catalog/catalogSlice";

export const store: Store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;