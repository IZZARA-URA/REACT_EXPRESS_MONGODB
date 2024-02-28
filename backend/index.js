import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'


// Data Modeling 
import User from './models/User.js'
import Product from './models/Product.js'
import ProductStat from './models/ProductStat.js'
import Transaction from './models/Transaction.js'
import OverallStat from './models/OverallStat.js'
import AffiliateStat from './models/AffiliateStat.js'

// Data Import
import {
    dataUser, 
    dataProduct, 
    dataProductStat,
    dataTransaction,
    dataOverallStat,
    dataAffiliateStat
} from "./data/index.js"

// IMPORT ROUTES MODULES//
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import salesRoutes from './routes/sales.js'
import managementRoutes from './routes/management.js'

const MONGO_URL = "mongodb+srv://dummyuser:dummyuser@cluster0.yul7ox5.mongodb.net/?retryWrites=true&w=majority"
const PORT = 8080

mongoose.connect(MONGO_URL, { 
    useNewUrlParser: true 
})
.then(() => {
    app.listen(PORT, () => {console.log('Application is running on port', PORT)})

    // User.insertMany(dataUser)
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
    // Transaction.insertMany(dataTransaction)
    // OverallStat.insertMany(dataOverallStat)
    // AffiliateStat.insertMany(dataAffiliateStat)
})
.catch()

const app = express();
app.use(express.json()); 
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({
//     policy: "cross-origin"
// }));
// app.use(morgan("common"))
// app.use(bodyParser.json)
// app.use(bodyParser.urlencoded({
//     extended: false
// }))
app.use(cors())


app.get('/', (req, res) => {
  res.json({ message: 'Test!' });
});

// ROUTES //
app.use("/client", clientRoutes)
app.use("/general", generalRoutes)
app.use("/sales", salesRoutes)
app.use("/management", managementRoutes)

// app.listen(PORT, () => {console.log('Application is running on port', PORT);});