import dotenv from 'dotenv'
dotenv.config();
import app from './src/app.js'
import { CONNECT_DB } from './src/config/db.js'
const PORT = process.env.PORT || 5000
try{
      
    await CONNECT_DB();
   
const startserver=()=>{app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})}
startserver()
}
catch(error){
  console.error('Error starting the server:', error)
}

