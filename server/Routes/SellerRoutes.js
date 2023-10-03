import express from "express";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import { protectseller, seller } from "../Middleware/AuthMiddleware.js";
import generateToken from "../utils/generateToken.js";
import User from "./../Models/UserModel.js";
import Seller from "../Models/SellerModel.js";
import UserVerification from "../Models/UserVerificationModel.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.AUTH_EMAIL,
//     pass: process.env.AUTH_PASS,
//   }
// })

// TESTING THE TRANSPORTER
// transporter.verify((error, success) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Ready for messages");
//     console.log(success)
//   }
// });


const sellerRouter = express.Router();


// USER LOGIN
sellerRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Seller.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        storename: user.storename,
        email: user.email,
        isSeller: user.isSeller,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password Seller");
    }
  })
);

// REGISTER
sellerRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await Seller.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    else if(name == "" || email == "" || password == ""){
      res.status(400)
      throw new Error("Empty input fields!");
    } 

    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
      res.status(400);
      throw new Error("Invalid email address");
    } 

    else if (password.length < 8) {
      res.status(400);
      throw new Error("Password is too short!");
    }

    const user = await Seller.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isSeller: user.isSeller,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

// PROFILE
sellerRouter.get(
  "/profile",
  protectseller,
  asyncHandler(async (req, res) => {
    const user = await Seller.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        storename: user.storename,
        isSeller: user.isSeller,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// UPDATE PROFILE
sellerRouter.put(
  "/profile",
  protectseller,
  asyncHandler(async (req, res) => {
    const user = await Seller.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        storename: updatedUser.storename,
        isSeller: updatedUser.isSeller,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

//GET ALL SELLERS
sellerRouter.get(
  "/sellers",
  protectseller,
  seller,
  asyncHandler(async (req, res) => {
    const sellers = await Seller.find({});
    // const users = User.find( { isSeller: { $exists: true, $nin: false } } )

    res.json(sellers);
  })
);

export default sellerRouter;