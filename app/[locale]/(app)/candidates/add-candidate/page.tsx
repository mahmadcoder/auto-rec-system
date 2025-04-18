"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Circle, Link2 } from "lucide-react";
import ExperienceTab from "./experience";
import SkillsTab from "./skills";
import DocumentsTab from "./documents";

const tabItems = [
  { id: "personal-details", label: "Personal Details" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "documents", label: "Documents" },
];

export default function AddCandidatePage() {
  const [activeTab, setActiveTab] = useState("personal-details");
  
  const renderTabContent = () => {
    switch (activeTab) {
      case "personal-details":
        return <PersonalDetailsTab />;
      case "experience":
        return <ExperienceTab />;
      case "skills":
        return <SkillsTab />;
      case "documents":
        return <DocumentsTab/>;
      default:
        return <PersonalDetailsTab />;
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
                <Circle className={`h-2 w-2 mr-2 ${activeTab === tab.id ? "fill-black" : ""}`} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dynamic Tab Content */}
        <div className="space-y-8">
          {renderTabContent()}
        </div>
      </div>
    </DashboardShell>
  );
}

// Personal Details Tab Component
function PersonalDetailsTab() {
  return (
    <>
      {/* Basic Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium mb-1">First Name</label>
            <Input
              id="first-name"
              placeholder="Enter first name"
              className="rounded-3xl"
            />
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-medium mb-1">Last Name</label>
            <Input
              id="last-name"
              placeholder="Enter last name"
              className="rounded-3xl"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              className="rounded-3xl"
            />
            <Mail className="h-4 w-4 absolute right-3 top-3 text-black" />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
          <div className="relative">
            <Input
              id="phone"
              placeholder="Enter phone number"
              className="rounded-3xl"
            />
            <Phone className="h-4 w-4 absolute right-3 top-3 text-black" />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
          <div className="relative">
            <Input
              id="location"
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
          <label htmlFor="current-title" className="block text-sm font-medium mb-1">Current Title</label>
          <Input
            id="current-title"
            placeholder="e.g. Senior Software Engineer"
            className="rounded-3xl"
          />
        </div>

        <div>
          <label htmlFor="current-company" className="block text-sm font-medium mb-1">Current Company</label>
          <Input
            id="current-company"
            placeholder="Enter current employer"
            className="rounded-3xl"
          />
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium mb-1">LinkedIn Profile</label>
          <div className="relative">
            <Input
              id="linkedin"
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
          <label htmlFor="desired-role" className="block text-sm font-medium mb-1">Desired Role</label>
          <Input
            id="desired-role"
            placeholder="e.g. Product Manager, VP Design"
            className="rounded-3xl"
          />
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-medium mb-1">Salary Expectations</label>
          <Input
            id="salary"
            placeholder="Enter salary range"
            className="rounded-3xl"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-1">Notes</label>
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
        >
          Cancel
        </Button>
        <div className="space-x-4">
          <Button
            variant="outline"
            className="rounded-3xl text-black hover:to-blue-600 hover:text-white"
          >
            Save & Add Another
          </Button>
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
          >
            Save Candidate
          </Button>
        </div>
      </div>
    </>
  );
}