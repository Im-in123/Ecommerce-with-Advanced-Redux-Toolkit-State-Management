import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./services/posts/blogSlice";
import { authEcomerceApi, refreshAuthentication } from "./services/auth/authSlice";
import { productApi } from "./services/products/productSlice";
import cartReducer from "./services/cart/cartSlice"; // Import cart reducer
import authReducer from "./services/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createListenerMiddleware } from "@reduxjs/toolkit"; 

const authListener = createListenerMiddleware();

const store = configureStore({
    reducer: {
        [blogApi.reducerPath]: blogApi.reducer,
        [authEcomerceApi.reducerPath]: authEcomerceApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        cart: cartReducer, // Use the cart reducer here without `.reducerPath`
        auth: authReducer, // Use the plain auth reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(authEcomerceApi.middleware)
            .concat(blogApi.middleware)
            .concat(productApi.middleware)
            .concat(authListener.middleware);
    },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Handle refresh and persistence of auth
authListener.startListening.withTypes<RootState, AppDispatch>()({
    predicate(_action, currentState) {
        return (
            currentState.auth.token === null &&
            currentState.auth.user === null &&
            sessionStorage.getItem("isAuthenticated") === "true"
        );
    },
    effect: async (_action, listenerApi) => {
        console.log("Refreshing authentication...");
        listenerApi.dispatch(refreshAuthentication());
        await listenerApi.delay(800);
    },
});

export default store;
