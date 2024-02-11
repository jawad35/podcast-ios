import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SelectedCategorySlice from "../SelectedCategorySlice";
import PodcastUsers from "../PodcastUsers";

const roorReducer = combineReducers({
    userData : PodcastUsers,
    category : SelectedCategorySlice
})

const PodcastStore = configureStore({
    reducer:roorReducer
})

export default PodcastStore