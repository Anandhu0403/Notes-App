import express from 'express'
import notesRoutes from './routes/notes.routes.js'
import ratelimiter from '../middleware/ratelimiter.js'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

dotenv.config();
console.log("NODE_ENV =", process.env.NODE_ENV)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
app.use(cors());
app.use(express.json());
app.use('/api', ratelimiter);
app.use('/api/v1/notes', notesRoutes)
console.log("NODE_ENV raw:", process.env.NODE_ENV)
console.log("NODE_ENV type:", typeof process.env.NODE_ENV)
console.log("NODE_ENV equals production:", process.env.NODE_ENV === "production")
if (process.env.NODE_ENV?.trim() === "production") {

    const distPath = path.join(__dirname, '../../Frontend/MernTHinker/dist')

    app.use(express.static(distPath))

    app.use((req, res) => {
        res.sendFile(path.join(distPath, 'index.html'))
    })

}
export default app