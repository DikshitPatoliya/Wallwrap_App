import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import ImageSlice from "./ImageSlice";

const persistConfig = {
	key: "root",
	storage: AsyncStorage
};

const rootReducers = combineReducers({
	getRecentImageReducer: ImageSlice

});

const persistedReducer = persistReducer(persistConfig, rootReducers)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => __DEV__ ?
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(logger) : getDefaultMiddleware()
})
export const persistor = persistStore(store)