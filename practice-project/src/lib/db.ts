import {connect} from 'mongoose';
const mongodbUri = process.env.MONGODB_URI
if(!mongodbUri){
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

let cached = global.mongoose;
if(!cached){
   cached = global.mongoose = {conn: null, promise: null};
}

const connectDb=async()=>{
if(cached.conn){
    return cached.conn;
}

if(!cached.promise){
    cached.promise = connect(mongodbUri).then((c)=>c.connection);
}

try {
    cached.conn = await cached.promise; 
} catch (error) {
    throw error;
    
}
return cached.conn;

}
export default connectDb;