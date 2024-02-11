import { createSlice } from "@reduxjs/toolkit";

export const SelectedCategorySlice = createSlice({
    name: 'selectedCategory',
    initialState: {
        category: '',
    },
    reducers: {
        getPodcastCategory(state, action) {
            state.category = action.payload
        }

    }
})

export const { getPodcastCategory } = SelectedCategorySlice.actions
export default SelectedCategorySlice.reducer