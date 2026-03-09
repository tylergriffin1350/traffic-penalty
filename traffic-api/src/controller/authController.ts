import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prismaClient from "../PrismaClient";
import {userSchema} from "../schemas/userSchemas";
import {z} from "zod";

export const register = async (req: express.Request, res: express.Response) => {
    const {phoneNumber, password, roleId} = req.body;

    const existingUser = await prismaClient.user.findUnique({
        where: {
            phoneNumber: phoneNumber,
        },
    });
    // Check if user already exists
    if (existingUser) {
        res.status(409).json({error: "Phone Number already exists"});
    }

    // Hash the password

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prismaClient.user.create({
        data: {
            phoneNumber: phoneNumber,
            password: hashedPassword,
            roles: {
                /*connect: {
                    id: roleId,
                    
                },*/

                 connect: { id: "4e15d077-e47e-42a8-8542-a23bef744ab5" }, // Admin role

                 // connect: { id: "edeb97b6-9c59-47c2-9efd-b4a5ed51a003" }, traffic role
                 // connect: { id: "3fd2dd83-f2bc-4775-81e8-b3653f2f09bf"}, aprrover role
                 // connect: { id: "a63faa54-42e1-43ee-86d0-3a9139a8c5f2"},  agency role


            },
        },
        select: {
            id: true,
            phoneNumber: true,
            roles: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    // Perform registration logic here (e.g., save user to database)
    // For demonstration, we'll just return a success message
    res.status(201).json(user);
};

const generateAccessToken = (user: z.infer<typeof userSchema>) => {
    return jwt.sign(
        {
            id: user.id,
            phoneNumber: user.phoneNumber,
        },
        process.env.APP_AUTH_TOKEN!,
        {
            algorithm: "HS256",
            expiresIn: "1h",
        }
    );
};
const generateRefreshToken = (user: z.infer<typeof userSchema>) => {
    return jwt.sign(
        {
            id: user.id,
            phoneNumber: user.phoneNumber,
        },
        process.env.APP_AUTH_TOKEN!,
        {
            algorithm: "HS256",
            expiresIn: "10d",
        }
    );
};

export const login = async (req: express.Request, res: express.Response) => {
    const {phoneNumber, password} = req.body;

    const user = await prismaClient.user.findUnique({
        where: {
            phoneNumber: phoneNumber,
        },
        include: {
            roles: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    // Check if user exists
    if (!user) {
        res.status(401).json({error: "Invalid credentials"});
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.status(401).json({error: "Invalid credentials"});
        return;
    }

    // Generate JWT token
    const parsedUser = userSchema.parse(user);
    const accessToken = generateAccessToken(parsedUser);
    const refreshToken = generateRefreshToken(parsedUser);

    // Save refresh token to database
    await prismaClient.user.update({
        where: {
            id: user.id,
        },
        data: {
            refreshToken: refreshToken,
        },
    });

    // Set refresh token in cookie

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    });

    // Send access token in response

    res.status(200).json({
        accessToken,
        user: {
            id: user.id,
            phoneNumber: user.phoneNumber,
            roles: user.roles,
        },
    });
};

export const refreshToken = async (
    req: express.Request,
    res: express.Response
) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(401).json({error: "Refresh token not found"});
        return;
    }

    const user = await prismaClient.user.findUnique({
        where: {
            refreshToken: refreshToken,
        },
        include: {
            roles: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    if (!user) {
        res.status(403).json({error: "Invalid refresh token"});
        return;
    }

    // Generate new access token
    const parsedUser = userSchema.parse(user);
    const accessToken = generateAccessToken(parsedUser);
    const newRefreshToken = generateRefreshToken(parsedUser);

    // Update refresh token in database
    await prismaClient.user.update({
        where: {
            id: user.id,
        },
        data: {
            refreshToken: newRefreshToken,
        },
    });

    // Set new refresh token in cookie
    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    });

    // Send new access token in response
    res.status(200).json({
        accessToken,
        user: {
            id: user.id,
            phoneNumber: user.phoneNumber,
            roles: user.roles,
        },
    });
};

export const getMe = async (req: express.Request, res: express.Response) => {

    // Get the user ID from access token
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
        res.status(401).json({error: "Access token not found"});
        return;
    }
    const decoded: any = jwt.verify(accessToken, process.env.APP_AUTH_TOKEN!);
    const userId = decoded.id;
    // Fetch user from database
    const user = await prismaClient.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            roles: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    if (!user) {
        res.status(404).json({error: "User not found"});
        return;
    }
    // Return user data
    res.status(200).json({
        id: user.id,
        phoneNumber: user.phoneNumber,
        roles: user.roles,
    });
}

export const getUsers = async (req: express.Request, res: express.Response) => {
    const {page = "1", limit, search = ""} = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = limit ? parseInt(limit as string, 10) : undefined;
    const offset = limitNumber ? (pageNumber - 1) * limitNumber : 0;

    // Build search condition for related fields
    const whereCondition: any = {
        OR: [
            {
                phoneNumber: {
                    contains: search as string,
                },
            },
        ],
    };

    const users = await prismaClient.user.findMany({
        where: whereCondition,
        select: {
            id: true,
            phoneNumber: true,
            roles: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        take: limitNumber,
        skip: offset,
    });

    const total = await prismaClient.user.count({
        where: whereCondition,
    });

    const totalPages =
        limitNumber && total ? Math.ceil(total / limitNumber) : null;

    res.status(200).json({
        data: users,
        meta: {
            page: pageNumber,
            limit: limitNumber || "all",
            total,
            totalPages,
        },
    });
}


export const updateUser = async (req: express.Request, res: express.Response) => {

    const {id} = req.params;
    const {phoneNumber, roleId} = req.body;

    // Check if user exists
    const existingUser = await prismaClient.user.findUnique({
        where: {
            id: id,
        },
    });
    if (!existingUser) {
        res.status(404).json({error: "User not found"});
        return;
    }

    const user = await prismaClient.user.update({
        where: {
            id: id,
        },
        data: {
            phoneNumber: phoneNumber,
            roles: {
                connect: {
                    id: roleId,
                },
            },
        },
        select: {
            id: true,
            phoneNumber: true,
            roles: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    res.status(200).json(user);
}
