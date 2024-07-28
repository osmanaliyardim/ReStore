import { AsyncThunk, createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

export const signInUser: AsyncThunk<User, FieldValues, any>  = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkAPI) => {
        try {
            const user = await agent.Account.login(data);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchCurrentUser: AsyncThunk<User, any, any> = createAsyncThunk<User>(
    'account/signInUser',
    async (_, thunkAPI) => {
        try {
            const user = await agent.Account.currentUser();
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: (builder =>{
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
        });
    })
})