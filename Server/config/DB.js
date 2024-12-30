import mongoose from "mongoose";

const connectDB = async (req,res) => {
    try{
        await mongoose.connect(process.env.DB)
        console.log('DB COnnected')
    } catch (error){
        console.log(error)
    }
}

export default connectDB