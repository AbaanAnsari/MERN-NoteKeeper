import mongoose from "mongoose";

const connectDB = async () => { 
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected successfully");
    } catch (error) { 
        console.error("Error connecting to database \n", error);
        process.exit(1); // exit the process with failure
    }
}

export { connectDB }