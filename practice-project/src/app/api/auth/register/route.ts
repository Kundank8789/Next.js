import connectDb from "@/src/lib/db";
import User from "@/src/model/user.model";
import bcrypt from "bcryptjs";
import {NextRequest, NextResponse  } from "next/server";

export async function POST(request:NextRequest){
    try {
        // Validate request body
        const body = await request.json();
        const {name, email, password} = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                {message: "Name, email, and password are required"},
                {status: 400}
            );
        }

        if (!email.includes('@')) {
            return NextResponse.json(
                {message: "Please provide a valid email address"},
                {status: 400}
            );
        }

        await connectDb();
        const existUser = await User.findOne({email});
        
        if(existUser){
            return NextResponse.json(
                {message: "User already exists"},
                {status: 400}
            );
        }

        if(password.length < 6){
            return NextResponse.json(
                {message: "Password must be at least 6 characters long"},
                {status: 400}
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        return NextResponse.json(
            user,
            {status:201}
        )
    } catch (error: any) {
        console.error('Registration error:', error);
        
        // Handle MongoDB connection errors
        if (error.name === 'MongoServerError') {
            return NextResponse.json(
                { message: 'Database connection failed. Please try again.' },
                { status: 500 }
            );
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'Registration failed. Please try again.' },
            { status: 500 }
        );
    }
}