import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL || "http://localhost:5173"],
    credentials: true
}))

/* Serve static files from public directory */
app.use(express.static(path.join(__dirname, '../public')))

/* require all the routes here */
import authRouter from "./routes/auth.routes.js"
import interviewRouter from "./routes/interview.routes.js"


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

/* Serve index.html for client-side routing */
app.get((req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

export default app