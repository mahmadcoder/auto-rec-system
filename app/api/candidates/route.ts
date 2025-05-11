import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Create a single instance of PrismaClient
const prisma = new PrismaClient();

// GET all candidates for the authenticated user
export async function GET(req: NextRequest) {
  try {
    // For now, we'll use a simple authentication check
    // In a real app, you would use proper authentication
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract user ID from auth header or cookie
    // This is a simplified example - in a real app, you would decode a JWT token
    // or use a session to get the actual user ID
    const userId = 1; // Placeholder user ID

    // Get query parameters
    const url = new URL(req.url);
    const status = url.searchParams.get("status");

    // Use Prisma to find candidates
    let candidates;

    if (status && ["active", "inactive", "hired", "archived"].includes(status)) {
      candidates = await prisma.candidate.findMany({
        where: {
          userId: userId,
          status: status
        },
        orderBy: {
          updatedAt: "desc"
        }
      });
    } else {
      candidates = await prisma.candidate.findMany({
        where: {
          userId: userId
        },
        orderBy: {
          updatedAt: "desc"
        }
      });
    }

    return NextResponse.json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return NextResponse.json(
      { error: "Failed to fetch candidates" },
      { status: 500 }
    );
  }
}

// POST create a new candidate
export async function POST(req: NextRequest) {
  try {
    // For now, we'll use a simple authentication check
    // In a real app, you would use proper authentication
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract user ID from auth header or cookie
    // This is a simplified example - in a real app, you would decode a JWT token
    const userId = 1; // Placeholder user ID

    const data = await req.json();

    // Process skills to ensure it's an array
    let skills = data.skills || [];
    if (typeof skills === 'string') {
      skills = skills.split(',').map((skill: string) => skill.trim());
    }

    // Create new candidate with the user ID using Prisma
    const candidate = await prisma.candidate.create({
      data: {
        userId: userId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        location: data.location,
        currentTitle: data.currentTitle,
        currentCompany: data.currentCompany,
        linkedinProfile: data.linkedinProfile,
        desiredRole: data.desiredRole,
        salaryExpectations: data.salaryExpectations,
        skills: skills,
        experience: data.experience || {},
        documents: data.documents || {},
        status: data.status || "active",
      },
    });

    return NextResponse.json(candidate, { status: 201 });
  } catch (error) {
    console.error("Error creating candidate:", error);
    return NextResponse.json(
      { error: "Failed to create candidate" },
      { status: 500 }
    );
  }
}
