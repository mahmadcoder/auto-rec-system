"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  ChevronRight, 
  Circle, 
  Plus, 
  Briefcase, 
  Users
} from "lucide-react";

// Tab items for job description section
const descriptionTabItems = [
  { id: "write-description", label: "Write Description" },
  { id: "upload-file", label: "Upload File" },
  { id: "ai-generate", label: "AI Generate" },
];

export default function CreateNewJobPage() {
  // Form state
  const [formData, setFormData] = useState({
    jobTitle: "",
    category: "",
    location: "",
    employmentType: "",
    salaryRange: "",
    jobDescription: "",
    requiredSkills: "",
    requiredExperience: "",
  });
  
  // Active tab state
  const [activeDescriptionTab, setActiveDescriptionTab] = useState("write-description");

  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Select change handler
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb navigation */}
      <div className="flex items-center text-sm mb-6 text-gray-500">
        <Link href="/dashboard" className="hover:text-gray-700">Dashboard</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/jobs" className="hover:text-gray-700">Jobs</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-900">Create New Job</span>
      </div>

      <h1 className="text-2xl font-bold mb-6">Create New Job</h1>

      <div className="space-y-8">
        {/* Job Details Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Job Details</h2>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Full width input */}
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input 
                id="jobTitle"
                name="jobTitle"
                placeholder="e.g. Senior Full-stack Programmer"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="rounded-3xl"
              />
            </div>

            {/* Full width input */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category"
                name="category"
                placeholder="e.g. Tech Solutions Inc."
                value={formData.category}
                onChange={handleInputChange}
                className="rounded-3xl"
              />
            </div>

            {/* Two inputs side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location"
                  name="location"
                  placeholder="e.g. New York, NY"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="rounded-3xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select onValueChange={(value) => handleSelectChange("employmentType", value)}>
                  <SelectTrigger className="rounded-3xl">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Full width input */}
            <div className="space-y-2">
              <Label htmlFor="salaryRange">Salary Range</Label>
              <Input 
                id="salaryRange"
                name="salaryRange"
                placeholder="e.g. $80,000 - $120,000"
                value={formData.salaryRange}
                onChange={handleInputChange}
                className="rounded-3xl"
              />
            </div>
          </div>
        </div>

        {/* Job Description Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Job Description</h2>
          
          {/* Custom Tab Navigation */}
          <div className="border-b border-gray-200 mb-4">
            <nav className="flex space-x-8">
              {descriptionTabItems.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center py-4 px-1 text-sm font-medium ${
                    activeDescriptionTab === tab.id
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveDescriptionTab(tab.id)}
                >
                  <Circle className={`h-2 w-2 mr-2 ${activeDescriptionTab === tab.id ? "fill-black" : ""}`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Description Text Area */}
          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea 
              id="jobDescription"
              name="jobDescription"
              placeholder="Enter detailed job description..."
              value={formData.jobDescription}
              onChange={handleInputChange}
              className="min-h-62 rounded-3xl"
              rows={6}
            />
          </div>
        </div>

        {/* Required Skills Section */}
        <div>
  <h2 className="text-lg font-semibold mb-4">Required Skills</h2>
  <div className="space-y-2">
    <div className="relative flex items-center">
      <Input 
        id="requiredSkills"
        name="requiredSkills"
        placeholder="e.g. JavaScript, React, Node.js"
        value={formData.requiredSkills}
        onChange={handleInputChange}
        className="rounded-3xl pr-12" // Added padding-right to make space for the button
      />
      <Button 
  variant="ghost" 
  size="icon" 
  className="absolute right-2 p-1 h-6 w-6 rounded-full hover:bg-blue-600 hover:text-white"
>
  <Plus className="h-3 w-3" />
</Button>
    </div>
  </div>
</div>

        {/* Required Experience Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Required Experience</h2>
          <div className="space-y-2">
            <Input 
              id="requiredExperience"
              name="requiredExperience"
              placeholder="e.g. 5+ years of software development"
              value={formData.requiredExperience}
              onChange={handleInputChange}
              className="rounded-3xl"
            />
          </div>
        </div>

        {/* Job Distribution Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Job Distribution</h2>
          <p className="text-sm text-gray-500 mb-4">Select job boards to post this job</p>

          <div className="space-y-4">
            {/* LinkedIn */}
            <div className="flex items-center justify-between  p-3">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">LinkedIn</h4>
                  <p className="text-xs text-gray-500">Company careers network</p>
                </div>
              </div>
              <Switch />
            </div>

            {/* Indeed */}
            <div className="flex items-center justify-between  p-3 ">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>  
                <div>
                  <h4 className="text-sm font-medium">Indeed</h4>
                  <p className="text-xs text-gray-500">Global job board</p>
                </div>
              </div>
              <Switch />
            </div>

            {/* Glassdoor */}
            <div className="flex items-center justify-between  p-3  shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Glassdoor</h4>
                  <p className="text-xs text-gray-500">Company reviews and jobs</p>
                </div>
              </div>
              <Switch />
            </div>

            {/* Monster */}
            <div className="flex items-center justify-between  p-3 ">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Monster</h4>
                  <p className="text-xs text-gray-500">Global job marketplace</p>
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Candidate Matching Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Candidate Matching</h2>

          <div className="space-y-4">
            {/* AI Candidate Matching */}
            <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Enable AI Candidate Matching</h4>
                  <p className="text-xs text-gray-500">Automatically rank and score incoming applications</p>
                </div>
              </div>
              <Switch />
            </div>

            {/* Search Existing Candidate Pool */}
            <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Search Existing Candidate Pool</h4>
                  <p className="text-xs text-gray-500">Find candidates from your existing database</p>
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <Button variant="outline" className="rounded-3xl text-black hover:bg-[#1231AA] hover:text-white">Save as Draft</Button>
          <Button variant="outline" className="rounded-full bg-[#1231AA] text-white hover:bg-[#1231AA]/90 hover:text-white">Preview</Button>
          <Button className="rounded-full bg-green-600 hover:bg-green-700">Publish Job</Button>
        </div>
      </div>
    </div>
  );
}