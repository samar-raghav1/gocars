import express from "express";
import { getUserCars, getUserData, userLogin, userRegister } from "../controllers/userController.js";
import { protect } from "../middlewares/isAuth.js";

const userRouter = express.Router();

userRouter.post('/register',userRegister)
userRouter.post('/login',userLogin)
userRouter.get('/data',protect,getUserData)
userRouter.get('/cars',getUserCars)

export default userRouter;