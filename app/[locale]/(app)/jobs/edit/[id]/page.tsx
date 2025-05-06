"use client";

import { useState, useEffect } from "react";
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
  Users,
  X,
  Check,
  Loader2
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Define types
type JobStatus = 'draft' | 'published' | 'closed' | 'archived';
type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship';
type DescriptionTabId = 'write-description' | 'upload-file' | 'ai-generate';
type ToastVariant = 'default' | 'success' | 'error' | 'warning' | null | undefined;

// Tab items for job description section
const descriptionTabItems = [
  { id: "write-description" as DescriptionTabId, label: "Write Description" },
  { id: "upload-file" as DescriptionTabId, label: "Upload File" },
  { id: "ai-generate" as DescriptionTabId, label: "AI Generate" },
];

interface JobFormData {
  jobTitle: string;
  category: string;
  location: string;
  employmentType: string;
  salaryRange: string;
  jobDescription: string;
  requiredSkills: string;
  requiredExperience: string;
  status: JobStatus;
}

export default function EditJobPage() {
  // Form state
  const [formData, setFormData] = useState<JobFormData>({
    jobTitle: "",
    category: "",
    location: "",
    employmentType: "",
    salaryRange: "",
    jobDescription: "",
    requiredSkills: "",
    requiredExperience: "",
    status: "draft"
  });
  
  interface SwitchStates {
    postToLinkedIn: boolean;
    postToIndeed: boolean;
    postToGlassdoor: boolean;
    postToMonster: boolean;
    enableAIMatching: boolean;
    searchExistingPool: boolean;
  }

  // State for switches
  const [switchStates, setSwitchStates] = useState<SwitchStates>({
    postToLinkedIn: false,
    postToIndeed: false,
    postToGlassdoor: false,
    postToMonster: false,
    enableAIMatching: false,
    searchExistingPool: false,
  });

  // State for preview mode
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  // Active tab state
  const [activeDescriptionTab, setActiveDescriptionTab] = useState<DescriptionTabId>("write-description");

  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;

  // Fetch job data
  useEffect(() => {
    const fetchJobData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/jobs/${jobId}`, {
          headers: {
            'Authorization': 'Bearer placeholder-token' // Replace with actual auth
          }
        });

        if (response.ok) {
          const jobData = await response.json();
          
          // Set form data
          setFormData({
            jobTitle: jobData.jobTitle,
            category: jobData.category,
            location: jobData.location,
            employmentType: jobData.employmentType,
            salaryRange: jobData.salaryRange,
            jobDescription: jobData.jobDescription,
            requiredSkills: Array.isArray(jobData.requiredSkills) 
              ? jobData.requiredSkills.join(', ') 
              : jobData.requiredSkills,
            requiredExperience: jobData.requiredExperience,
            status: jobData.status
          });

          // Set switch states
          setSwitchStates({
            postToLinkedIn: jobData.postToLinkedIn,
            postToIndeed: jobData.postToIndeed,
            postToGlassdoor: jobData.postToGlassdoor,
            postToMonster: jobData.postToMonster,
            enableAIMatching: jobData.enableAIMatching,
            searchExistingPool: jobData.searchExistingPool,
          });
        } else {
          toast.error('Failed to load job', {
            description: 'Could not load the job details. Please try again.'
          });
          router.push('/jobs');
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        toast.error('Error loading job', {
          description: 'An error occurred while loading the job details.'
        });
        router.push('/jobs');
      } finally {
        setIsLoading(false);
      }
    };

    if (jobId) {
      fetchJobData();
    }
  }, [jobId, router, toast]);

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

  // Handle switch change
  const handleSwitchChange = (name: keyof SwitchStates) => {
    setSwitchStates((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSubmit = async (e: React.FormEvent, status?: JobStatus) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.jobTitle || !formData.category || !formData.location || !formData.employmentType) {
      toast.error('Missing required fields', {
        description: 'Please fill in all required job details.'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer placeholder-token' // This is a placeholder, replace with actual auth
        },
        body: JSON.stringify({
          jobTitle: formData.jobTitle,
          category: formData.category,
          location: formData.location,
          employmentType: formData.employmentType,
          salaryRange: formData.salaryRange,
          jobDescription: formData.jobDescription,
          requiredSkills: formData.requiredSkills.split(',').map((skill: string) => skill.trim()),
          requiredExperience: formData.requiredExperience,
          postToLinkedIn: switchStates.postToLinkedIn,
          postToIndeed: switchStates.postToIndeed,
          postToGlassdoor: switchStates.postToGlassdoor,
          postToMonster: switchStates.postToMonster,
          enableAIMatching: switchStates.enableAIMatching,
          searchExistingPool: switchStates.searchExistingPool,
          status: status || formData.status
        })
      });

      if (response.ok) {
        // Show success toast
        if (status === 'published') {
          toast.success('Job Published', {
            description: 'Your job has been published successfully.'
          });
        } else {
          toast.success('Job Updated', {
            description: 'Your job has been updated successfully.'
          });
        }
        
        // Redirect to jobs list
        router.push('/jobs');
      } else {
        const errorData = await response.json();
        console.error('Error updating job:', errorData);
        toast.error('Failed to update job', {
          description: 'Please try again later.'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred', {
        description: 'Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle preview mode
  const togglePreview = () => {
    // Validate form before showing preview
    if (!formData.jobTitle || !formData.category || !formData.location || !formData.employmentType) {
      toast.error('Please fill in all required fields before preview', {
        description: 'Job title, category, location and employment type are required.'
      });
      return;
    }
    setIsPreviewMode(!isPreviewMode);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-[#1231AA] mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Main form content - hidden when in preview mode */}
      <div className={isPreviewMode ? 'hidden' : ''}>
      {/* Breadcrumb navigation */}
      <div className="flex items-center text-sm mb-6 text-gray-500">
        <Link href="/dashboard" className="hover:text-gray-700">Dashboard</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/jobs" className="hover:text-gray-700">Jobs</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-900">Edit Job</span>
      </div>

      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>

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
                <Select 
                  value={formData.employmentType} 
                  onValueChange={(value) => handleSelectChange("employmentType", value)}
                >
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
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">LinkedIn</h4>
                  <p className="text-xs text-gray-500">Company careers network</p>
                </div>
              </div>
              <Switch 
                checked={switchStates.postToLinkedIn}
                onCheckedChange={() => handleSwitchChange('postToLinkedIn')}
              />
            </div>

            {/* Indeed */}
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>  
                <div>
                  <h4 className="text-sm font-medium">Indeed</h4>
                  <p className="text-xs text-gray-500">Global job board</p>
                </div>
              </div>
              <Switch 
                checked={switchStates.postToIndeed}
                onCheckedChange={() => handleSwitchChange('postToIndeed')}
              />
            </div>

            {/* Glassdoor */}
            <div className="flex items-center justify-between p-3 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Glassdoor</h4>
                  <p className="text-xs text-gray-500">Company reviews and jobs</p>
                </div>
              </div>
              <Switch 
                checked={switchStates.postToGlassdoor}
                onCheckedChange={() => handleSwitchChange('postToGlassdoor')}
              />
            </div>

            {/* Monster */}
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Monster</h4>
                  <p className="text-xs text-gray-500">Global job marketplace</p>
                </div>
              </div>
              <Switch 
                checked={switchStates.postToMonster}
                onCheckedChange={() => handleSwitchChange('postToMonster')}
              />
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
              <Switch 
                checked={switchStates.enableAIMatching}
                onCheckedChange={() => handleSwitchChange('enableAIMatching')}
              />
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
              <Switch 
                checked={switchStates.searchExistingPool}
                onCheckedChange={() => handleSwitchChange('searchExistingPool')}
              />
            </div>
          </div>
        </div>
              
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <Button 
            variant="outline" 
            className="rounded-3xl text-black hover:bg-[#1231AA] hover:text-white"
            onClick={(e) => handleSubmit(e)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <Circle className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </span>
            ) : (
              'Save Changes'
            )}
          </Button>
          <Button 
            variant="outline" 
            className="rounded-full bg-[#1231AA] text-white hover:bg-[#1231AA]/90 hover:text-white"
            onClick={togglePreview}
            type="button"
            disabled={isSubmitting}
          >
            {isPreviewMode ? 'Edit Job' : 'Preview'}
          </Button>
          {formData.status !== 'published' && (
            <Button 
              className="rounded-full bg-green-600 hover:bg-green-700"
              onClick={(e) => handleSubmit(e, 'published')}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <Circle className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </span>
              ) : (
                'Publish Job'
              )}
            </Button>
          )}
        </div>
      </div>
      </div>

      {/* Preview Modal */}
      {isPreviewMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Job Preview</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={togglePreview}
                  className="rounded-full hover:bg-gray-200"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold">{formData.jobTitle || 'Job Title'}</h3>
                  <p className="text-gray-500">{formData.category || 'Category'} • {formData.location || 'Location'}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {formData.employmentType || 'Employment Type'}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {formData.salaryRange || 'Salary Range'}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Job Description</h4>
                  <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                    {formData.jobDescription || 'No description provided.'}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.requiredSkills ? 
                      formData.requiredSkills.split(',').map((skill, index) => (
                        <Badge key={index} className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                          {skill.trim()}
                        </Badge>
                      )) : 
                      <p className="text-gray-500">No skills specified</p>
                    }
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Required Experience</h4>
                  <p>{formData.requiredExperience || 'No experience requirements specified.'}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Distribution</h4>
                  <div className="flex gap-2">
                    {switchStates.postToLinkedIn && (
                      <Badge className="bg-blue-600 hover:bg-blue-700">LinkedIn</Badge>
                    )}
                    {switchStates.postToIndeed && (
                      <Badge className="bg-blue-400 hover:bg-blue-500">Indeed</Badge>
                    )}
                    {switchStates.postToGlassdoor && (
                      <Badge className="bg-green-600 hover:bg-green-700">Glassdoor</Badge>
                    )}
                    {switchStates.postToMonster && (
                      <Badge className="bg-purple-600 hover:bg-purple-700">Monster</Badge>
                    )}
                    {!switchStates.postToLinkedIn && !switchStates.postToIndeed && 
                     !switchStates.postToGlassdoor && !switchStates.postToMonster && (
                      <p className="text-gray-500">No distribution channels selected</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-4">
                <Button 
                  variant="outline" 
                  onClick={togglePreview}
                  className="rounded-3xl text-black hover:bg-[#1231AA] hover:text-white"
                  disabled={isSubmitting}
                >
                  Back to Edit
                </Button>
                {formData.status !== 'published' && (
                  <Button 
                    className="rounded-3xl bg-green-600 hover:bg-green-700"
                    onClick={(e) => handleSubmit(e, 'published')}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <Circle className="mr-2 h-4 w-4 animate-spin" />
                        Publishing...
                      </span>
                    ) : (
                      'Publish Job'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
