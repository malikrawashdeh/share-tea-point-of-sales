import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export const fetchCache = 'force-no-store'
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