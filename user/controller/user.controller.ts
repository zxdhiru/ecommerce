import { Request, Response } from "express";
import { User } from "../model/user.model";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/apiError";
import { ApiResponse } from "../../utils/apiResponse";
import { refreshTokenOptions, accessTokenOptions, UserRequest } from "../../utils/constants";
import nodemailer from "nodemailer";
import generateAccessAndRefreshTokens from "../../utils/generateToken";
import { OTP } from "../model/otp.model";
import { otpEmailTemplate } from "../../utils/otpTemplate";

const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com', // Hostinger's SMTP host
    port: 465, // Use 587 for TLS
    secure: true, // True for 465, false for other ports
    auth: {
        user: `${process.env.EMAIL_ID}`, // Your Hostinger email address
        pass: `${process.env.EMAIL_PASSWORD}`, // Your Hostinger email password
    },
});

export const handleUserSignup = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, phone, password } = req.body;
    console.log(req.body);
    
    // Validate input fields
    if (!name || !email || !phone || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }

    try {
        // Create a new user
        const user = await User.create({
            name,
            email,
            phone,
            password,
        });

        // Generate OTP
        const generatedOTP = Math.floor(1000 + Math.random() * 9000);
        console.log("Generated OTP:", generatedOTP);
        
        // Store OTP in database
        await OTP.create({
            userId:user._id,
            otp: generatedOTP,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        });

        // Send OTP via email
        const mailOptions = {
            from: '"ZXDHIRU" <zxdhiru.dev@alljobguider.in>',
            to: email,
            subject: "OTP Verification",
            html: otpEmailTemplate(generatedOTP),
        };
        console.log("Mail Options:", mailOptions);
        

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                throw new ApiError(500, "Failed to send OTP email");
            } else {
                console.log("Email sent:", info.response);
            }
        });

        // Generate access and refresh tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        const createdUser = await User.findById(user._id).select("-password");

        // Return success response with cookies
        return res
            .status(201)
            .cookie("refreshToken", refreshToken, refreshTokenOptions)
            .cookie("accessToken", accessToken, accessTokenOptions)
            .json(
                new ApiResponse(200, createdUser, "User created successfully. OTP sent to your email.")
            );
    } catch (error: any) {
        console.error(error);
        throw new ApiError(500, "Internal Server Error");
    }
});

export const handleUserLogin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found with this email");
    }

    // Check if the password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Generate access token and refresh token
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refresh token to the database
    user.refreshToken = refreshToken;
    await user.save();

    // Return success response
    res.status(200)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .cookie("accessToken", accessToken, accessTokenOptions)
    res.json(
        new ApiResponse(200, { accessToken, refreshToken }, "Login successful")
    )
})

export const handleUserLogout = asyncHandler(async (req: UserRequest, res: Response) => {
    // Clear refresh token from the database
    console.log(req.user);
    
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )
    return res
    .status(200)
    .clearCookie("accessToken", accessTokenOptions)
    .clearCookie("refreshToken", refreshTokenOptions)
    .json(new ApiResponse(200, {}, "User logged Out"))

})

export const handleGetAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json(new ApiResponse(200, users, "All users fetched successfully"));
})

export const handleGetUserProfile = asyncHandler(async (req: Request & UserRequest, res: Response) => {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password -refreshToken -role -status");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         console.error(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // })
    res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
})

export const handleGetSingleUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
})