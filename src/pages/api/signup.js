import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      email,
      password,
      firstName,
      lastName,
      age,
      gender,
      location,
      education,
      maritalStatus,
      bio,
      interests,
      newsletter,
    } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Ensure interests is an array
      const interestsArray = Array.isArray(interests) ? interests : [];

      // Create the user
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          age: parseInt(age, 10),
          gender,
          location,
          education,
          maritalStatus,
          bio,
          interests: interestsArray,
          newsletter,
        },
      });

      return res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          age: newUser.age,
          gender: newUser.gender,
          location: newUser.location,
          education: newUser.education,
          maritalStatus: newUser.maritalStatus,
          bio: newUser.bio,
          interests: newUser.interests,
          newsletter: newUser.newsletter,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Error creating user, please try again." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
