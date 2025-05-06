import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Create a single instance of PrismaClient
const prisma = new PrismaClient();

// GET a specific job by ID
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
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

    // Properly access the id parameter from context
    const { id } = context.params;
    const jobId = parseInt(id);
    
    if (isNaN(jobId)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    // Find job with user ID check to ensure users can only access their own jobs
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        userId: userId,
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}

// PUT update a job
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
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

    // Properly access the id parameter from context
    const { id } = context.params;
    const jobId = parseInt(id);
    
    if (isNaN(jobId)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    // Check if job exists and belongs to the user
    const existingJob = await prisma.job.findFirst({
      where: {
        id: jobId,
        userId: userId,
      },
    });

    if (!existingJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const data = await req.json();
    
    // Process requiredSkills to ensure it's an array
    let requiredSkills = data.requiredSkills;
    if (typeof requiredSkills === 'string') {
      requiredSkills = requiredSkills.split(',').map((skill: string) => skill.trim());
    }

    // Update job
    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        jobTitle: data.jobTitle,
        category: data.category,
        location: data.location,
        employmentType: data.employmentType,
        salaryRange: data.salaryRange,
        jobDescription: data.jobDescription,
        requiredSkills: requiredSkills,
        requiredExperience: data.requiredExperience,
        postToLinkedIn: data.postToLinkedIn,
        postToIndeed: data.postToIndeed,
        postToGlassdoor: data.postToGlassdoor,
        postToMonster: data.postToMonster,
        enableAIMatching: data.enableAIMatching,
        searchExistingPool: data.searchExistingPool,
        status: data.status,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}

// DELETE a job
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
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

    // Properly access the id parameter from context
    const { id } = context.params;
    const jobId = parseInt(id);
    
    if (isNaN(jobId)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    // Check if job exists and belongs to the user
    const existingJob = await prisma.job.findFirst({
      where: {
        id: jobId,
        userId: userId,
      },
    });

    if (!existingJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Delete job
    await prisma.job.delete({
      where: { id: jobId },
    });

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
