import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js";
import adminRouter from "../Server/routes/admin.route.js";
import blogRouter from "../Server/routes/Blog.route.js"

const app = express();

// Middleware
app.use(express.json())
// app.use(cors())
app.use(cors({
  origin: 'https://quick-blog-eta-ochre.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}))


// MongoDb connection
connectDB()

const port = process.env.PORT || 5000;

// routes
app.use("/api/admin",adminRouter)
app.use("/api/blogs",blogRouter)

app.get('/',(req,res) => {
    res.send("Hello")
})

app.listen(port,() => {
     console.log(`Server is running port ${port}`)
})

export default app;
