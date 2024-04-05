import app from "./app.js";
import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
// DataBase Connection
import connection from "./DataBase/DbConnection.js";
connection();
// Env config
import dotenv from "dotenv"
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
// userRoutes
import categoryRouter from "./routes/categoryRoutes.js";
import userRoute from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
app.use("/api/v1/auth",userRoute)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/category",categoryRouter)
// middlewares

// port
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})