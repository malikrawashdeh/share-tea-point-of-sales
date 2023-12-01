import prisma from "@/lib/prisma";
import { user_role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.json();

    if (data.id == -1) {
        const postedUser = await prisma.users.create({
            data: {
                name: data.name,
                email: data.email,
                username: data.username,
                role: data.role,
                password: data.password,
            }
        });

        return NextResponse.json({user: postedUser});
    }

    const updatedUser = await prisma.users.update({
        where: {
            id: data.id,
        },
        data: {
            name: data.name,
            email: data.email,
            username: data.username,
            role: data.role,
            password: data.password,
        }
    });

    return NextResponse.json({user: updatedUser});
}