import app from './src/app.js'
import { CONNECT_DB } from './src/config/db.js'
import dotenv from 'dotenv'
const PORT = process.env.PORT || 5000
 dotenv.config();
try{
      console.log("MONGO_URI:", process.env.MONGO_URI)
    await CONNECT_DB();
   
const startserver=()=>{app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})}
startserver()
}
catch(error){
  console.error('Error starting the server:', error)
}

