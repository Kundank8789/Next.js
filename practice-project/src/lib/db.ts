import { connect } from 'mongoose';

// Define the type for our cached connection
interface MongooseCache {
    conn: any | null;
    promise: Promise<any> | null;
}

declare global {
    var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
    const mongodbUri = process.env.MONGODB_URI;

    if (!mongodbUri) {
        console.error("MongoDB URI is not defined in environment variables");
        throw new Error(
            "Please define the MONGODB_URI environment variable in .env.local. Example: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database"
        );
    }

    try {
        if (cached.conn) {
            console.log("Using cached database connection");
            return cached.conn;
        }

        if (!cached.promise) {
            const opts = {
                bufferCommands: true,
            };

            console.log("Connecting to MongoDB...");
            cached.promise = connect(mongodbUri, opts).then((mongoose) => {
                console.log("Successfully connected to MongoDB!");
                return mongoose.connection;
            });
        }

        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        // Reset the promise so we can try again
        cached.promise = null;
        throw new Error(
            `Failed to connect to MongoDB. Please check your connection string and make sure your IP is whitelisted. Error: ${error instanceof Error ? error.message : String(error)}`
        );
    }
};

export default connectDb;