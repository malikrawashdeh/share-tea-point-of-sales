import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

type User = {
  id: number;
  name: string | null;
  email: string | null;
  username: string | null;
  role: string | null;
  password: string;
};

/**
 * @swagger
 * /api/encrypt:
 *   post:
 *     description: Encrypt user passwords
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userIds:
 *                 type: number
 *             required:
 *               - userIds
 *     responses:
 *      200:
 *       description: Success
 *     500:
 *      description: Internal server error
 *
 */
export async function POST(req: Request) {
  try {
    // Assuming your request body contains the necessary data for password updates
    const { userIds } = await req.json();

    // Fetch users by ids from the database
    const users = await prisma.users.findMany({
      where: {
        id: { in: userIds },
      },
    });

    // Update each user's password with the hashed password

    const updatedUsers = await Promise.all(
      users.map(async (user: User) => {
        const hashedPassword = await hash(user.password, 10);
        return prisma.users.update({
          where: { id: user.id },
          data: { password: hashedPassword },
        });
      })
    );

    console.log("Passwords updated successfully:", updatedUsers);

    return NextResponse.json(
      { message: "Passwords updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating passwords:", error);
    return NextResponse.json(
      { message: "Error updating passwords" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Disconnect from the Prisma client
  }
}
