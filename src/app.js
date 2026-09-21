const express=require("express")
const cors=require("cors")
const authRoutes=require("./routes/authRoutes")
const cookieParser=require("cookie-parser")

const app=express()

app.use(express.json())
app.use(cors())
app.use(cookieParser());

app.use("/api/auth/",authRoutes)

app.get("/",(req,res)=>{
    res.send("Digital Asset Store Api is running...");
})
module.exports=app;