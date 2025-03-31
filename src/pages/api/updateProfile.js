import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { userId, age, firstName, lastName, gender, location, education, maritalStatus, bio, interests, newsletter } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          age: age ? parseInt(age) : undefined,
          firstName,
          lastName,
          gender,
          location,
          education,
          maritalStatus,
          bio,
          interests,
          newsletter,
        },
      });

      res.status(200).json({ message: "Profile updated successfully!", user: updatedUser });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Something went wrong!" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
