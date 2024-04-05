import express from "express";
import { loginUser,  refetchUser, signupUser } from "../controller/authController.js";
import {requireSignIn} from "../Middlewares/verifyToken.js"
const userRoute = express.Router();
userRoute.post("/register",signupUser);
userRoute.post("/login",loginUser);
userRoute.get("/refetch",refetchUser);
//protected User route auth
userRoute.get("/user-auth",requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });
export default userRoute