import { BASE_URL } from "@/constants/Urls";
import { IProfile } from "@/types/profile/IProfile";
import { fetchBaseWithAuth } from "@/utils/fetchBaseWithAuth";
import { createApi } from "@reduxjs/toolkit/query/react";

export const apiProfile = createApi({
    reducerPath: "apiProfile",
    tagTypes: ["Profile"],
    baseQuery: fetchBaseWithAuth({baseUrl: BASE_URL + "/api/Profile"}),
    endpoints: (builder) => ({
        getProfile: builder.query<IProfile, void>({
            query: () => "/",
            providesTags: ["Profile"]
        })
    })
})

export const {
    useGetProfileQuery
} = apiProfile;