const app=require("./src/app")
require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);


const connectDB=require("./src/config/db")

connectDB();


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Start running on Port: ${PORT}`)
})