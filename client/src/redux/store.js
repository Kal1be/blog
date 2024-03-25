import {configureStore,combineReducers} from "@reduxjs/toolkit"
import userReducer from "./user/userSlice"
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore} from "redux-persist"
import themeSlice from "./theme/themeSlice"

const rootReducer = combineReducers({
    user:userReducer,
    theme:themeSlice
})

const persistConfig ={
    key:'root',
    storage,
    version:1,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)


export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>{return getDefaultMiddleware({serializableCheck:false})}
})


export const persistor = persistStore(store)