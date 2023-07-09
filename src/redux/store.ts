import sessionReducer from './sessionSlice'
import { combineReducers, configureStore } from "@reduxjs/toolkit"


export default configureStore(
    {
        reducer: combineReducers({
            session: sessionReducer
        })
    }
)