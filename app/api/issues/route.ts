import { NextRequest, NextResponse } from "next/server";
import prisma from '@prisma/client';
import { PrismaClient } from '@prisma/client'
import { issueSchema } from "../../ValidationSchema";

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    const prisma = new PrismaClient();
    
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description}
    })

    return NextResponse.json(newIssue, {status: 201})

}