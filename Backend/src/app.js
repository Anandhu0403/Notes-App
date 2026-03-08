import express from 'express'
import notesRoutes from './routes/notes.routes.js'
import ratelimiter from '../middleware/ratelimiter.js'
import cors from 'cors'
const app = express()
app.use(cors());          
app.use(express.json()); 
app.use(ratelimiter); 
app.use('/api/v1/notes',    notesRoutes)

export default app