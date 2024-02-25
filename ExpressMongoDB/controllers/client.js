import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

import getCountryIso3 from "country-iso-2-to-3";
import countryIso2To3 from "country-iso-2-to-3";


export const getProducts = async (req, res) => {
    /*
        First: 
            Query all Products from database
        
        Second:
            Product.map(
                ProductStat.find(
                    Product._id == ProductStat._id
                    (So... if same _id both of Product and ProductStat will be show)
                )
            )



        Good To Know: 

            Synchronous:: 
                    Do tasks as sequential
            Asynchronous:: 
                    Do tasks as non-sequential, 
                    Doesn't waiting for any function finish first

            async/await:: waiting until task is finish, and then will do next task


    */
    try {
        const products = await Product.find()
        const productWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({ // ProductStat manyToOne Product
                        productId: product._id
                    })
                return {    
                    ...product._doc, //coppy original array (product)
                    stat,
                }
            })
        )
        
        res.status(200).json(productWithStats)
    } catch {
        res.status(404).json({ message: error.message })
    }
}

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: "user"}).select("-password") //.select("-password") mean query without password
        res.status(200).json(customers)  
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const getTransactions = async (req, res) => {
    try {
        const { page = 1, pageSize = 20, sort = null, search = ""} = req.query

        const generateSort = () => {
            const sortParsed = JSON.parse(sort)
            const sortFormatted = {
                [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1)
            }
            return sortFormatted
        }

        const sortFormatted = Boolean(sort) ? generateSort() : {}
        // Boolean(null) = false
        
        const transactions = await Transaction.find({
            $or: [
                { cost: { $regex: new RegExp(search, "i")}}, // RegExp == filter
                { userId: { $regex: new RegExp(search, "i")}},
            ]
        })
        .sort(sortFormatted) 
        .skip(page * pageSize)
        .limit(pageSize)

        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: "i"}
        })

        res.status(200).json({
            transactions,
            total,
        })
    } catch (error) {
        res.status(404).json({ message: "transation " + error.message})
    }
}


export const getGeography = async (req, res) => {
    try { 
        const users = await User.find()

        const mappedLocations = users.reduce((acc, { country}) => {
            const countryISO3 = getCountryIso3(country)
            if (!acc[countryISO3]) { 
                acc[countryISO3] = 0
            }
            acc[countryISO3]++
            return acc
        }, {})

        const formattedLocations = Object.entries(mappedLocations).map(
            ([country, count]) => {
                return {id: country, value: count}
            }
        )

        res.status(200).json(formattedLocations)
    } catch (error) { 
        res.status(404).json({ message: error.message})
    }
}

// export const getCustomers = async (req, res) => {
//     try {
//       const customers = await User.find({ role: "user" }).select("-password");
//       res.status(200).json(customers);
//     } catch (error) {
//       res.status(404).json({ message: error.message });
//     }
//   };













