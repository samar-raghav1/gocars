import express from "express";
import connectDB from "./lib/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import ownerRouter from "./routes/ownerRoute.js";
import bookingRouter from "./routes/bookingRoute.js";
import cors from 'cors';
const app=express();
const port =4000;


await connectDB();
app.get("/",(req,res)=>{
res.send("Hello server is running properly");
})

app.use(express.json());
app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:['GET','POST','DELETE','PUT','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization']
}))
app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/bookings',bookingRouter)


app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`);
})