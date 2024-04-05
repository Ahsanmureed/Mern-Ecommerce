import mongoose, { connect } from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const connection = ()=>{
    try {
        const connect =mongoose.connect(process.env.DB_URL)
        console.log("DataBase is connected");
    } catch (error) {
        console.log(error);
    }
}
export default connection