import {createApi} from "@reduxjs/toolkit/query/react";
import {serverBaseQuery} from "../utils/fetchBaseQuery";
import type {IAccountRegister} from "../types/account/IAccountRegister.ts";
import { ILoginResponse } from "@/types/ILoginResponse";
import { IAccountLogin } from "@/types/account/IAccountLogin";

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
        login: builder.mutation<ILoginResponse, IAccountLogin>({
            query: (data) => {
                try {
                    return {
                        url: "login",
                        method: "POST",
                        body: data
                    }
                } catch {
                    throw new Error("Помилка авторизації користувача");
                }
            }
        })
    })
})

export const {
    useRegisterMutation,
    useLoginMutation
} = apiAccount;