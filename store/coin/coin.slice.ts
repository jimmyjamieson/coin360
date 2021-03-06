import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchCoins } from '../api'

export interface CoinsState {
    data?: undefined;
    status?: undefined | "loading" | "success" | "failed";
    error?: string | undefined;
}

const initialState: CoinsState = {
    data: undefined,
    status: undefined,
    error: undefined
}

export const getCoins = createAsyncThunk('COINS/GET', async(params?: {}) => {
    return fetchCoins(params)
})

export const coinSlice = createSlice({
    name: 'coins',
    initialState,
    // Our reducers
    reducers: {
        coinData: (state) => {
            state.data
        }
    },
    extraReducers(builder) {
        builder
        .addCase(getCoins.pending, (state, action) => {
            state.status = 'loading'
        }).addCase(getCoins.fulfilled, (state, action) => {
                state.status = 'success'
            const { payload = {} } = action
            state.data = payload.data
        }).addCase(getCoins.rejected, (state, action) => {
            state.status = 'failed'
            state.error = ' some error occurred'
        })
    }
})

export const { coinData } = coinSlice.actions

export default coinSlice.reducer