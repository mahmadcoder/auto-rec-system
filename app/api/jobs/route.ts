import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Create a single instance of PrismaClient
const prisma = new PrismaClient();

// GET all jobs for the authenticated user
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

    // Use Prisma to find jobs
    let jobs;

    if (status && ["draft", "published", "closed", "archived"].includes(status)) {
      jobs = await prisma.job.findMany({
        where: {
          userId: userId,
          status: status
        },
        orderBy: {
          updatedAt: "desc"
        }
      });
    } else {
      jobs = await prisma.job.findMany({
        where: {
          userId: userId
        },
        orderBy: {
          updatedAt: "desc"
        }
      });
    }

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

// POST create a new job
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

    // Create new job with the user ID using Prisma
    const job = await prisma.job.create({
      data: {
        userId: userId,
        jobTitle: data.jobTitle,
        category: data.category,
        location: data.location,
        employmentType: data.employmentType,
        salaryRange: data.salaryRange,
        jobDescription: data.jobDescription,
        requiredSkills: Array.isArray(data.requiredSkills) 
          ? data.requiredSkills 
          : data.requiredSkills.split(',').map((skill: string) => skill.trim()),
        requiredExperience: data.requiredExperience,
        postToLinkedIn: data.postToLinkedIn || false,
        postToIndeed: data.postToIndeed || false,
        postToGlassdoor: data.postToGlassdoor || false,
        postToMonster: data.postToMonster || false,
        enableAIMatching: data.enableAIMatching || false,
        searchExistingPool: data.searchExistingPool || false,
        status: data.status || "draft",
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}