import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Create a single instance of PrismaClient
const prisma = new PrismaClient();

// GET a specific candidate by ID
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
    const candidateId = parseInt(id);
    
    if (isNaN(candidateId)) {
      return NextResponse.json({ error: "Invalid candidate ID" }, { status: 400 });
    }

    // Find candidate with user ID check to ensure users can only access their own candidates
    const candidate = await prisma.candidate.findFirst({
      where: {
        id: candidateId,
        userId: userId,
      },
    });

    if (!candidate) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    return NextResponse.json(candidate);
  } catch (error) {
    console.error("Error fetching candidate:", error);
    return NextResponse.json(
      { error: "Failed to fetch candidate" },
      { status: 500 }
    );
  }
}

// PUT update a candidate
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
    const candidateId = parseInt(id);
    
    if (isNaN(candidateId)) {
      return NextResponse.json({ error: "Invalid candidate ID" }, { status: 400 });
    }

    // Check if candidate exists and belongs to the user
    const existingCandidate = await prisma.candidate.findFirst({
      where: {
        id: candidateId,
        userId: userId,
      },
    });

    if (!existingCandidate) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    const data = await req.json();
    
    // Process skills to ensure it's an array
    let skills = data.skills || existingCandidate.skills;
    if (typeof skills === 'string') {
      skills = skills.split(',').map((skill: string) => skill.trim());
    }

    // Update candidate
    const updatedCandidate = await prisma.candidate.update({
      where: { id: candidateId },
      data: {
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
        experience: data.experience || existingCandidate.experience,
        documents: data.documents || existingCandidate.documents,
        status: data.status,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedCandidate);
  } catch (error) {
    console.error("Error updating candidate:", error);
    return NextResponse.json(
      { error: "Failed to update candidate" },
      { status: 500 }
    );
  }
}

// DELETE a candidate
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
    const candidateId = parseInt(id);
    
    if (isNaN(candidateId)) {
      return NextResponse.json({ error: "Invalid candidate ID" }, { status: 400 });
    }

    // Check if candidate exists and belongs to the user
    const existingCandidate = await prisma.candidate.findFirst({
      where: {
        id: candidateId,
        userId: userId,
      },
    });

    if (!existingCandidate) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    // Delete candidate
    await prisma.candidate.delete({
      where: { id: candidateId },
    });

    return NextResponse.json({ message: "Candidate deleted successfully" });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    return NextResponse.json(
      { error: "Failed to delete candidate" },
      { status: 500 }
    );
  }
}
