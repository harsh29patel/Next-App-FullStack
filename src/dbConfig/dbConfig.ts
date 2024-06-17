
import mongoose from "mongoose";

  export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log('Mongo DB connected');
            
        })

        connection.on('error' , ()=>{
            console.log("Mongo DB connection error , please make sure DB is running. ");
            process.exit();
        })
    } 
    catch (error) {
        console.log("something went wrong in connecting database" , error);
        
    }
}

