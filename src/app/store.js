import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import authSlice from "./authSlice";
// import userSlice from "./userSlice";

const persistConfig = {
    key: "root",
    storage,
    // whitelist: ["auth", "user"], // only persist slices
    // blacklist: ["notification"], // don't persist slices
};

const rootReducer = combineReducers({
    // auth: authSlice,
    // user: userSlice,
    // Add other slices here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

export const persistor = persistStore(store);
