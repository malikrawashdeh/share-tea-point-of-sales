import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

/*
 * @swagger
 * /api/user:
 *   post:
 *     description: Create a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               role:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - username
 *               - role
 *               - password
 *     responses:
 *       201:
 *         description: Success user creation
 *       400:
 *         description: Bad request
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, username, role, password } = body; // TODO:

    // check if email already exists
    const existingUserEmail = await prisma.users.findFirst({
      where: { email: email },
    });

    if (existingUserEmail) {
      return NextResponse.json(
        { user: null, message: "User already exists" },
        { status: 409 }
      );
    }

    // check if username already exists
    const existingUsername = await prisma.users.findFirst({
      where: { username: username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { user: null, message: "Username already exists" },
        { status: 409 }
      );
    }

    // create user
    const hashpassword = await hash(password, 10);
    const newUser = await prisma.users.create({
      data: {
        name: name,
        email: email,
        username: username,
        role: "user", // TODO: create dashboard to change role
        password: hashpassword, // TODO: hash password
      },
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { user: null, message: error.message },
      { status: 500 }
    );
  }
}
