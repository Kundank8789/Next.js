import mongoose from "mongoose";

interface IUser {
    _id?: mongoose.Types.ObjectId;
    name: string;
    image: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    name: { 
        type: String,
         required: true 
        },
    image: { 
        type: String,
        },
    email: {
         type: String,
         required: true,
         unique: true
    },
    password: {
         type: String,
         required: true
    }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
