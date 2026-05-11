import { configureStore } from "@reduxjs/toolkit";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { apiAccount } from "../services/apiAccount";
import { apiProfile } from "@/services/apiProfile";

export const store = configureStore({
    reducer: {
        [apiAccount.reducerPath]: apiAccount.reducer,
        [apiProfile.reducerPath]: apiProfile.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiAccount.middleware).concat(apiProfile.middleware),
});

// Типи, які знаходяться у Redux
export type RootState = ReturnType<typeof store.getState>;
// Метод, який дає команди для reducer - залогінь, вийди із акаунта
export type AppDispatch = typeof store.dispatch;

// виклик різних методів із глобального стора
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Отримуємо дані із глобального стора на основі типів, які там є
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;