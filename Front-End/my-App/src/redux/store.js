import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import adminReducer from "../redux/adminSlice.js"
import {persistReducer,persistStore} from "redux-persist"
import storage from 'redux-persist/lib/storage';



const rootReducer=combineReducers({admin:adminReducer})
const persistConfig={
    key:"root",
    storage,
    version:1
}
const presistedreucer=persistReducer(persistConfig,rootReducer)
export const store=configureStore({
    reducer:presistedreucer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false,
    })
})
export const persistor=persistStore(store)



