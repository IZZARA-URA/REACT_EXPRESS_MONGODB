import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseURI = "http://localhost:8080"

export const api = createApi({ 
    baseQuery: fetchBaseQuery({ baseUrl: BaseURI }),
    reducerPath: "adminApi", 
    tagTypes: [
        "User",
        "Products",
        "Customers",
        "Transactions",
        "Geography",
        "Sales"
    ],
    endpoints: (build) => ({
        getUser: build.query({
            //  query: (insertParameters, ..., ..., , that is from pasge)
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getProducts: build.query({
            query: () => `client/products`,
            providesTags: ["Products"],
        }),
        getCustomers: build.query({
            query: () => `client/customers`,
            providesTags: ["Customers"]
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search}) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search}
            }),
            providesTags: ["Transactions"]
        }),
        getGeography: build.query({
            query: () => "client/geography",
            providesTags: ["Geography"]
        }),
        getSales: build.query({
            query: () => "sales/sales",
            providesTags: ["Sales"]
        }),
    })
})

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
} = api