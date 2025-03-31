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

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Ensure interests is an array
      const interestsArray = Array.isArray(interests) ? interests : [];

      // Create a new user
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          age: parseInt(age),
          gender,
          location,
          education,
          maritalStatus,
          bio,
          interests: interestsArray,
          newsletter,
        },
      });

      // Close Prisma connection
      await prisma.$disconnect();

      return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Error creating user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
