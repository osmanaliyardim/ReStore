import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface BasketState {
    basket: Basket | null;
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addBasketItemAsync: AsyncThunk<Basket, {productId: number; quantity?: number;}, any> =
    createAsyncThunk<Basket, {productId: number, quantity?: number}>(
        'basket/addBasketItemAsync',
        async ({productId, quantity = 1}) => {
            try {
                return await agent.Basket.addItem(productId, quantity);
            } catch (error) {
                console.error(error);
            }
        }
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeBasketItemAsync: AsyncThunk<void, {productId: number; quantity: number; name?: string}, any> = 
    createAsyncThunk<void, {productId: number, quantity: number, name?: string}>(
        'basket/removeBasketItemAsync',
        async ({productId, quantity = 1}) => {
            try {
                return await agent.Basket.removeItem(productId, quantity);
            } catch (error) {
                console.error(error);
            }
        }
)

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingAddItem' + action.meta.arg.productId;
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const {productId, quantity} = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);
            if (itemIndex === -1 ||itemIndex === undefined) return;

            state.basket!.items[itemIndex].quantity -= quantity;
            if (state.basket?.items[itemIndex].quantity === 0) 
                state.basket.items.splice(itemIndex, 1);
            
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        });
    })
});

export const {setBasket} = basketSlice.actions;