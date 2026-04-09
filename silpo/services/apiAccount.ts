import {createApi} from "@reduxjs/toolkit/query/react";
import {serverBaseQuery} from "../utils/fetchBaseQuery";
import type {IAccountRegister} from "../types/account/IAccountRegister.ts";

export const apiAccount = createApi({
    reducerPath: "apiAccount",
    baseQuery: serverBaseQuery("auth"),
    endpoints: (builder) => ({
        register: builder.mutation<null, IAccountRegister>({
            query: (model) => {
                try {
                    return {
                        method: "POST",
                        url: "Register",
                        body: model
                    }
                } catch {
                    throw new Error("Помилка реєстрації користувача");
                }
            },
        }),
    })
})

export const {
    useRegisterMutation
} = apiAccount;