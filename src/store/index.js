import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist/es/constants";
import workSlice from "./work.slice";
import postSlice from "./post.slice";


const rootReducer = combineReducers({
    userSlice: userSlice,
    workSlice: workSlice,
    postSlice: postSlice
})

const persistConfig = {
    key: "root",
    storage: storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }),
})

export const persistor = persistStore(store)
