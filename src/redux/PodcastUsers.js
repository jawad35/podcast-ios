import { createSlice } from "@reduxjs/toolkit";

export const SelectedCategorySlice = createSlice({
    name:'PodcastUsers',
    initialState:{
        user:[],
        shorts:[],
        refresh:'',
        userId:'',
        isoverlay:false
    },
    reducers:{
        SetUserData(state, action){
            state.user = action.payload
        },
        SetShortsData(state, action){
            state.shorts = action.payload
        },
        setRefresh(state, payload) {
            state.refresh = action.payload
        },
        SetUserId(state, action){
            state.userId = action.payload
        },
        SetOverlay(state, action){
            state.isoverlay = action.payload
        }
    }
})

export const {SetUserData, SetShortsData, setRefresh, SetUserId, SetOverlay} = SelectedCategorySlice.actions
export default SelectedCategorySlice.reducer