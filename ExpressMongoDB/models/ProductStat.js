import mongoose from "mongoose";


const ProductStateSchema = new mongoose.Schema(
    {
        productId: String,
        yearlySalesTotal: Number, 
        yearTotalSoldUnits: Number, 
        year: Number, 
        mountlyData: [
            {
                mount: String,
                totalSales: Number, 
                totalUnits: Number,
            }
        ],
        dailyData: {
            date: String,
            totalSales: Number, 
            totalUnits: Number
        }
    },
    { 
        timestamps: true 
    },
)

const ProductStat = mongoose.model("ProductStat", ProductStateSchema)
export default ProductStat