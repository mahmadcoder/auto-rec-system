"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Circle, Link2 } from "lucide-react";
import ExperienceTab from "./experience";
import SkillsTab from "./skills";
import DocumentsTab from "./documents";
import { toast } from "sonner";

const tabItems = [
  { id: "personal-details", label: "Personal Details" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "documents", label: "Documents" },
];

export default function AddCandidatePage() {
  const [activeTab, setActiveTab] = useState("personal-details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Define the interface for candidate form data
  interface CandidateFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    currentTitle: string;
    currentCompany: string;
    linkedinProfile: string;
    desiredRole: string;
    salaryExpectations: string;
    skills: string[];
    experience: any;
    documents: any;
    status: string;
  }

  // Candidate form data state
  const [formData, setFormData] = useState<CandidateFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    currentTitle: "",
    currentCompany: "",
    linkedinProfile: "",
    desiredRole: "",
    salaryExpectations: "",
    skills: [],
    experience: {},
    documents: {},
    status: "active",
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle skills update from SkillsTab
  const handleSkillsUpdate = (skills: string[]) => {
    setFormData((prev) => ({
      ...prev,
      skills,
    }));
  };

  // Handle experience update from ExperienceTab
  const handleExperienceUpdate = (experience: any) => {
    setFormData((prev) => ({
      ...prev,
      experience,
    }));
  };

  // Handle documents update from DocumentsTab
  const handleDocumentsUpdate = (documents: any) => {
    setFormData((prev) => ({
      ...prev,
      documents,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields", {
        description: "First name, last name, email, and phone are required.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer placeholder-token", // This is a placeholder, replace with actual auth
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Show success toast
        toast.success("Candidate Added!", {
          description: "The candidate has been added successfully.",
        });

        // Redirect to candidates list
        router.push("/candidates");
      } else {
        const errorData = await response.json();
        console.error("Error creating candidate:", errorData);
        toast.error("Failed to add candidate", {
          description: "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal-details":
        return (
          <PersonalDetailsTab
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case "experience":
        return <ExperienceTab onExperienceUpdate={handleExperienceUpdate} />;
      case "skills":
        return <SkillsTab onSkillsUpdate={handleSkillsUpdate} />;
      case "documents":
        return <DocumentsTab onDocumentsUpdate={handleDocumentsUpdate} />;
      default:
        return (
          <PersonalDetailsTab
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
    }
  };

  return (
    <DashboardShell>
      <div className="mx-auto space-y-6 p-0 md:p-6">
        {/* Breadcrumb navigation */}
        <div className="flex items-center text-sm font-medium">
          <Link href="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <Link href="/candidates" className="hover:text-foreground">
            Candidates
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Add Candidate</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Add New Candidate</h1>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center py-4 px-1 text-sm font-medium ${
                  activeTab === tab.id
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Circle
                  className={`h-2 w-2 mr-2 ${
                    activeTab === tab.id ? "fill-black" : ""
                  }`}
                />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dynamic Tab Content */}
        <div className="space-y-8">{renderTabContent()}</div>

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          
        </div>
      </div>
    </DashboardShell>
  );
}

// Personal Details Tab Component
interface PersonalDetailsTabProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

function PersonalDetailsTab({
  formData,
  setFormData,
  handleInputChange,
  handleSubmit,
  isSubmitting,
}: PersonalDetailsTabProps) {
  return (
    <>
      {/* Basic Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-1">
              First Name
            </label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter first name"
              className="rounded-3xl"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-1">
              Last Name
            </label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter last name"
              className="rounded-3xl"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              className="rounded-3xl"
            />
            <Mail className="h-4 w-4 absolute right-3 top-3 text-black" />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Input
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              className="rounded-3xl"
            />
            <Phone className="h-4 w-4 absolute right-3 top-3 text-black" />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location
          </label>
          <div className="relative">
            <Input
              id="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g. Beverly"
              className="rounded-3xl"
            />
            <MapPin className="h-4 w-4 absolute right-3 top-3 text-black" />
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Professional Information</h2>
        <div>
          <label htmlFor="currentTitle" className="block text-sm font-medium mb-1">
            Current Title
          </label>
          <Input
            id="currentTitle"
            value={formData.currentTitle}
            onChange={handleInputChange}
            placeholder="e.g. Senior Software Engineer"
            className="rounded-3xl"
          />
        </div>

        <div>
          <label htmlFor="currentCompany" className="block text-sm font-medium mb-1">
            Current Company
          </label>
          <Input
            id="currentCompany"
            value={formData.currentCompany}
            onChange={handleInputChange}
            placeholder="Enter current employer"
            className="rounded-3xl"
          />
        </div>

        <div>
          <label htmlFor="linkedinProfile" className="block text-sm font-medium mb-1">
            LinkedIn Profile
          </label>
          <div className="relative">
            <Input
              id="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/username"
              className="rounded-3xl"
            />
            <Link2 className="h-4 w-4 absolute right-3 top-3 text-black" />
          </div>
        </div>
      </div>

      {/* Job Preferences */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Job Preferences</h2>
        <div>
          <label htmlFor="desiredRole" className="block text-sm font-medium mb-1">
            Desired Role
          </label>
          <Input
            id="desiredRole"
            value={formData.desiredRole}
            onChange={handleInputChange}
            placeholder="e.g. Product Manager, VP Design"
            className="rounded-3xl"
          />
        </div>

        <div>
          <label htmlFor="salaryExpectations" className="block text-sm font-medium mb-1">
            Salary Expectations
          </label>
          <Input
            id="salaryExpectations"
            value={formData.salaryExpectations}
            onChange={handleInputChange}
            placeholder="e.g. $120,000 - $150,000"
            className="rounded-3xl"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-1">
            Notes
          </label>
          <Textarea
            id="notes"
            placeholder="Add any additional information about the candidate"
            className="rounded-3xl h-32 resize-none"
          />
        </div>
      </div>

      {/* Source Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Source Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="source" className="block text-sm font-medium mb-1">Source</label>
            <Input
              id="source"
              placeholder="LinkedIn, Indeed, Referral, etc."
              className="rounded-3xl"
            />
          </div>
          <div>
            <label htmlFor="referrer" className="block text-sm font-medium mb-1">Referrer (if applicable)</label>
            <Input
              id="referrer"
              placeholder="Name of person"
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          className="rounded-3xl text-black hover:to-blue-600 hover:text-white"
          asChild
        >
          <Link href="/candidates">Cancel</Link>
        </Button>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="rounded-3xl text-black hover:to-blue-600 hover:text-white"
            onClick={async () => {
              // Save the candidate
              await handleSubmit();
              
              // Reset form after submission
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                location: "",
                currentTitle: "",
                currentCompany: "",
                linkedinProfile: "",
                desiredRole: "",
                salaryExpectations: "",
                skills: [],
                experience: {},
                documents: {},
                status: "active"
              });
            }}
          >
            Save & Add Another
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-3xl bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? "Saving..." : "Save Candidate"}
          </Button>
        </div>
      </div>
    </>
  );
}