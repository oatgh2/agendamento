import sessionReducer from './sessionSlice'
import routerSlice from './routerSlice'
import { combineReducers, configureStore } from "@reduxjs/toolkit"


export default configureStore(
    {
        reducer: combineReducers({
            session: sessionReducer,
            route: routerSlice
        })
    }
)