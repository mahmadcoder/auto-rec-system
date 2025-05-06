"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle, Clock, Folder, MessageSquare, MoreHorizontal, Plus,
  Users, Briefcase, FileText, ClipboardList, Pencil, Mail, Shapes,
  Check, Search, MoreVertical, Edit, Trash, FilePlus, FileChartColumn,
  Copy, Link2, Circle, Loader2
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Define types
type JobStatus = 'draft' | 'published' | 'closed' | 'archived';
type TabId = 'all-jobs' | 'active' | 'drafts' | 'closed' | 'archived';
type ToastVariant = 'default' | 'success' | 'error' | 'warning' | null | undefined;

// Tab data
const tabItems = [
  { id: "all-jobs" as TabId, label: "All Jobs" },
  { id: "active" as TabId, label: "Active" }, 
  { id: "drafts" as TabId, label: "Drafts" },
  { id: "closed" as TabId, label: "Closed" },
  { id: "archived" as TabId, label: "Archived" }
];

// Job type definition
interface Job {
  id: number;
  jobTitle: string;
  category: string;
  location: string;
  employmentType: string;
  salaryRange: string;
  jobDescription: string;
  requiredSkills: string[];
  requiredExperience: string;
  postToLinkedIn: boolean;
  postToIndeed: boolean;
  postToGlassdoor: boolean;
  postToMonster: boolean;
  enableAIMatching: boolean;
  searchExistingPool: boolean;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
};

export default function JobsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("all-jobs");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        // Filter by status if not on "all-jobs" tab
        const statusParam = activeTab !== "all-jobs" ? `?status=${activeTab}` : "";
        const response = await fetch(`/api/jobs${statusParam}`, {
          headers: {
            'Authorization': 'Bearer placeholder-token' // Replace with actual auth token
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        } else {
          console.error('Failed to fetch jobs');
          toast.error('Failed to load jobs', {
            description: 'Please try again later.'
          });
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Error loading jobs', {
          description: 'Please try again later.'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [activeTab, toast]);

  // Handle edit job
  const handleEditJob = (jobId: number) => {
    router.push(`/jobs/edit/${jobId}`);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Posted today";
    if (diffDays === 1) return "Posted yesterday";
    if (diffDays < 7) return `Posted ${diffDays} days ago`;
    if (diffDays < 30) return `Posted ${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `Posted ${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  };

  // Filter jobs by search term
  const filteredJobs = jobs.filter(job => 
    job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const jobIntegrations = [
    {
      name: "LinkedIn",
      status: "Connected",
      activeJobs: 12,
      postingType: "Premium",
      connected: true,
      href: "/jobs/linkedin",
    },
    {
      name: "Indeed",
      status: "Connected",
      activeJobs: 8,
      postingType: "Standard",
      connected: true,
    },
    {
      name: "Glassdoor",
      status: "Connected",
      activeJobs: 5,
      postingType: "Basic",
      connected: true,
    },
  ];

  const jobTemplates = [
    {
      title: "Software Engineering",
      description: "Template for technical roles",
    },
    {
      title: "Product Management",
      description: "Template for product roles",
    },
    {
      title: "Marketing",
      description: "Template for marketing roles",
    },
  ];

  return (
    <DashboardShell>
      <div className="mx-auto space-y-6 p-0 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Jobs Management</h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Active Jobs Card */}
          <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
            <div className="flex flex-col items-start">
              <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
                <Briefcase className="h-5 w-5 text-[#1231AA] fill-[#1231AA]" />
              </div>
              <p className="text-sm font-medium text-[#11181C] mb-1">ACTIVE JOBS</p>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground mt-1 mb-3">10 in last 30 days</p>
              <Button
                variant="default"
                size="sm"
                className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
              >
                View All
              </Button>
            </div>
          </Card>

          {/* Draft Jobs Card */}
          <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
            <div className="flex flex-col items-start">
              <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
                <FilePlus className="h-5 w-5 text-[#1231AA] " />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">DRAFT JOBS</p>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1 mb-3">3 updated recently</p>
              <Button
                variant="default"
                size="sm"
                className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
              >
                Edit Drafts
              </Button>
            </div>
          </Card>

          {/* Total Applicants Card */}
          <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
            <div className="flex flex-col items-start">
              <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-[#1231AA] fill-[#1231AA]" />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">TOTAL APPLICANTS</p>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground mt-1 mb-3">35 new this week</p>
              <Button
                variant="default"
                size="sm"
                className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
              >
                View Candidates
              </Button>
            </div>
          </Card>

          {/* Conversion Rate Card */}
          <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
            <div className="flex flex-col items-start">
              <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
                <FileChartColumn className="h-5 w-5 text-[#1231AA]" />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">CONVERSION RATE</p>
              <div className="text-2xl font-bold">18%</div>
              <p className="text-xs text-muted-foreground mt-1 mb-3">+3% from last month</p>
              <Button
                variant="default"
                size="sm"
                className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
              >
                View Analytics
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Jobs Search & Create Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search jobs..."
                className="w-[250px] pl-4 rounded-3xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <Link href="/jobs/create-new-job">
            <Button
              variant="default"
              size="default"
              className="bg-[#1231AA] hover:bg-[#1231AA]/90 text-white rounded-3xl"
            >
              <Plus className="mr-2 h-4 w-4" /> Create New Job
            </Button>
          </Link>
        </div>

        {/* Custom Tab Navigation */}
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

        {/* Job Listings */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Job Listings</h2>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-[#1231AA]" />
              <span className="ml-2 text-[#1231AA]">Loading jobs...</span>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500">No jobs found. {searchTerm ? 'Try a different search term.' : 'Create your first job!'}</p>
              <Link href="/jobs/create-new-job">
                <Button
                  variant="default"
                  size="default"
                  className="mt-4 bg-[#1231AA] hover:bg-[#1231AA]/90 text-white rounded-3xl"
                >
                  <Plus className="mr-2 h-4 w-4" /> Create New Job
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between py-3 bg-white rounded-lg shadow-sm px-4">
                  <div className="flex items-center gap-3 w-1/3">
                    <div className="">
                      <Briefcase className="h-4 w-4 text-[#000000] fill-[#000000]" />
                    </div>
                    <div>
                      <div className="flex flex-row items-center space-x-4">
                        <h4 className="text-sm font-medium w-48">{job.jobTitle}</h4>
                        <p className="text-xs text-muted-foreground w-32">{job.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground w-1/4 text-center">{formatDate(job.createdAt)}</div>
                  <div className="flex items-center gap-1 w-1/6 text-center">
                    <Badge 
                      className={`${job.status === 'published' ? 'bg-green-100 text-green-800' : 
                        job.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`}
                    >
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                      <Users className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 hover:text-white"
                      onClick={() => handleEditJob(job.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Job Board Integration */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Job Board Integration</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {jobIntegrations.map((integration, index) => (
              <Card key={index} className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
                <div className="flex flex-col items-start">
                  <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                    <Link2 className="h-5 w-5 text-[#1231AA]" />
                  </div>
                  <h3 className="text-lg font-semibold">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {integration.status} • {integration.activeJobs} active jobs
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {integration.postingType}
                  </p>
                  <div className="mt-4 flex gap-2">
                    {integration.connected ? (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-[#1231AA] hover:bg-[#1231AA]/90 text-white rounded-3xl"
                          onClick={() => window.location.href = integration.href || '#'}
                        >
                          Manage
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs rounded-3xl text-[#1231AA] hover:bg-[#1231AA]/90 hover:text-[#ffff]"
                        >
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="default"
                        size="sm"
                        className="text-xs bg-[#1231AA] hover:bg-[#1231AA]/90 text-white rounded-3xl"
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Job Templates */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Job Templates</h2>
          </div>
          <div className="space-y-3">
            {jobTemplates.map((template, index) => (
              <div key={index} className="flex items-center justify-between py-3 bg-white rounded-lg shadow-sm px-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-blue-600  fill-[#1231AA]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{template.title}</h4>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                    <Edit className="h-4 w-4 " />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                    <Trash className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <Button
              variant="default"
              size="default"
              className="bg-[#1231AA] hover:bg-[#1231AA]/90 text-white rounded-3xl"
            >
              <Plus className="mr-2 h-4 w-4" /> Create New Template
            </Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}