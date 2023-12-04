import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const result = await prisma.users.findMany({
        orderBy: [
            {id: 'asc',}
        ]
    });

    return NextResponse.json({
        users: result,
    });
}