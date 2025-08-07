"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, Folder, MessageSquare, MoreVertical, Plus, Users, Briefcase, FileText, ClipboardList, Pencil, Mail, Shapes, Check, Circle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

// Tab data
const tabItems = [
  { id: "all-candidates", label: "All Candidates" },
  { id: "shortlisted", label: "Shortlisted" },
  { id: "interviewing", label: "Interviewing" },
  { id: "offer  ", label: "Offer" },
  { id: "hired", label: "Hired" },
  { id: "rejected", label: "Rejected" }
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all-candidates");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
    }
  }, [router]);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const recentJobs = [
    {
      title: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      postedDate: "Posted 2 days ago",
      candidates: 12,
    },
    {
      title: "Product Manager",
      company: "InnovaTech",
      postedDate: "Posted 5 days ago",
      candidates: 8,
    },
    {
      title: "UX Designer",
      company: "Creative Solutions",
      postedDate: "Posted 1 week ago",
      candidates: 15,
    },
    {
      title: "Marketing Specialist",
      company: "Growth Partners",
      postedDate: "Posted 1 week ago",
      candidates: 6,
    },
  ];

  const candidates = [
    {
      name: "John Smith",
      position: "Senior Software Engineer",
      match: "92% match",
      avatar: "JS",
    },
    {
      name: "Sarah Johnson",
      position: "Product Manager",
      match: "88% match",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      position: "UX Designer",
      match: "84% match",
      avatar: "MC",
    },
  ];

  const upcomingTasks = [
    {
      title: "Review CVs for Software Engineer position",
      type: "document",
      info: "Due Today • High Priority",
    },
    {
      title: "Schedule interview with Sarah Johnson",
      type: "meeting",
      info: "Due tomorrow • Medium Priority",
    },
    {
      title: "Prepare offer for Michael Chen",
      type: "offer",
      info: "Due in 2 days • High Priority",
    },
  ];

  const getTaskIcon = (type: any) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5 text-blue-600" />;
      case "meeting":
        return <Clock className="h-5 w-5 text-blue-600" />;
      case "offer":
        return <Briefcase className="h-5 w-5 text-blue-600" />;
      default:
        return <ClipboardList className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="mx-auto space-y-6 p-0 md:p-6">
      {/* Navigation path */}
      <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
        <Link href="/dashboard" className="hover:text-gray-700">Dashboard</Link>
        <span>{'>'}</span>
        <span className="text-gray-700">Overview</span>
      </div>

      {/* Removed box border around header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Recruitment Dashboard</h1>
      </div>

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
              asChild
            >
              <Link href="/jobs">View All</Link>
            </Button>
          </div>
        </Card>

        {/* Candidates Card */}
        <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
          <div className="flex flex-col items-start">
            <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-[#1231AA] fill-[#1231AA]" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">CANDIDATES</p>
            <div className="text-2xl font-bold">158</div>
            <p className="text-xs text-muted-foreground mt-1 mb-3">25 new this month</p>
            <Button
              variant="default"
              size="sm"
              className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
              asChild
            >
              <Link href="/candidates">Review</Link>
            </Button>
          </div>
        </Card>

        {/* Pending Tasks Card */}
        <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
          <div className="flex flex-col items-start">
            <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
              <ClipboardList className="h-5 w-5 text-[#1231AA] fill-[#1231AA]" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">PENDING TASKS</p>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground mt-1 mb-3">5 high priority</p>
            <Button
              variant="default"
              size="sm"
              className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
              asChild
            >
              <Link href="/tasks">Manage Tasks</Link>
            </Button>
          </div>
        </Card>

        {/* CV Reviewing Card */}
        <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
          <div className="flex flex-col items-start">
            <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
              <FileText className="h-5 w-5 text-[#1231AA] fill-[#1231AA]" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">CV REVIEWING</p>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground mt-1 mb-3">10 completed today</p>
            <Button
              variant="default"
              size="sm"
              className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
            >
              Review Now
            </Button>
          </div>
        </Card>
      </div>

      {/* Vertical stacked layout */}
      <div className="space-y-6">
        {/* Recent Jobs Card */}
        <div className="">
          <div className="p-6 pb-3">
            <h2 className="text-lg font-semibold">Recent Jobs</h2>
          </div>
          <div className="px-6">
            {recentJobs.map((job, index) => (
              <div key={index} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Briefcase className="h-5 w-5 text-[#000000] fill-[#000000]" />
                  </div>
                  <div className="flex flex-row items-center space-x-4">
                    <h4 className="text-sm font-medium w-48">{job.title}</h4>
                    <p className="text-xs text-muted-foreground w-32">{job.company}</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{job.postedDate}</div>
                <div className="text-xs font-medium ml-6 mr-6">{job.candidates} candidates</div>
                <div className="flex items-center">
                  <div className="flex ml-auto space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:text-white"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:text-white"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 pt-2">
            <Button
              variant="default"
              size="sm"
              className="bg-[#1231AA] hover:bg-[#1231AA]/90 text-white rounded-3xl"
            >
              Create New Job
            </Button>
          </div>
        </div>

        {/* Candidate Pipeline Card */}
        <div className="">
          <div className="p-6 pb-3">
            <h2 className="text-lg font-semibold">Candidate Pipeline</h2>
          </div>

          {/* Custom Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center py-4 px-1 text-sm font-medium ${activeTab === tab.id
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

          <div>
            {candidates.map((candidate, index) => (
              <div key={index} className="flex items-center justify-between py-4 px-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                      {candidate.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-medium">{candidate.name}</h4>
                    <p className="text-xs text-muted-foreground">{candidate.position}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                    <Shapes className="h-4 w-4 " />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 pt-2">
            <Button
              variant="default"
              size="lg"
              className="bg-[#1231AA] text-white rounded-3xl"
            >
              View All Candidates
            </Button>
          </div>
        </div>

        {/* Upcoming Tasks Card */}
        <div className="">
          <div className="p-6 pb-3">
            <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
          </div>
          <div>
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between py-4 px-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
                      {getTaskIcon(task.type)}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-sm font-medium">{task.title}</h4>
                    <p className="text-xs text-muted-foreground">{task.info}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-[#000000] flex items-center justify-center mb-2"
                >
                  <Check className="h-4 w-4 text-white" />
                </Button>
              </div>
            ))}
          </div>
          <div className="p-6 pt-2">
            <Button
              variant="default"
              size="lg"
              className="bg-[#1231AA] text-white rounded-3xl"
            >
              Create New Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}