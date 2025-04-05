import mongoose from "mongoose";
const connectdb=async()=>{
try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log("MongoDb connected successfully")
} catch (error) {
    console.log("Erroe connecting mongodb")
}
}
export default connectdb ;