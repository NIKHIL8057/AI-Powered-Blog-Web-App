import mongoose from "mongoose";

const connectDB = async () => {
     try {
        const conn = await mongoose.connect(process.env.MONGO_DB)
        console.log(`MongoDB is Connected ${conn}`) 
     } catch (error) {
        console.log(error)
     }
}

export default connectDB