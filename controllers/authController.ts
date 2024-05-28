import { Request, Response } from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import User from "../models/user";

export async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match, return error
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If username and password are correct, return success message
    // @ts-ignore
    req.session.user = user;
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    // Handle other errors
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function logoutUser(req: Request, res: Response) {
  req.session.destroy((err: Error) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res.status(200).json({ message: "Logout successful" });
    }
  });
}

export async function registerUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Return success response
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
