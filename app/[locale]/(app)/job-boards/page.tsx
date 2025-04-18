"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Search, Plus, Edit, Trash2, MoreHorizontal, ExternalLink,
    AlertCircle, Eye, Download, ChevronDown, BarChart3, LinkIcon,
    Check, PlusCircle, TrendingUp,Circle,
    MoreVertical,Briefcase, RefreshCcw,
    Building2,
    ChartNoAxesColumn
} from "lucide-react";
import { LucideProps } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function JobBoardsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all-boards");

    // Stats data
    const statsData = [
        {
            title: "ACTIVE POSTINGS",
            value: "24",
            buttonText: "View All",
            bgColor: "bg-[#1231AA0D]",
            icon: "document",
            description: "Across all platforms"
        },
        {
            title: "APPLICATIONS",
            value: "187",
            buttonText: "Review",
            bgColor: "bg-[#1231AA0D]",
            icon: "trending-up",
            description: "Last 30 days"
        },
        {
            title: "TOTAL VIEWS",
            value: "3,452",
            buttonText: "Analytics",
            bgColor: "bg-[#1231AA0D]",
            icon: "eye",
            description: "Across all postings"
        },
        {
            title: "NEW POSTING",
            value: "Create Job",
            buttonText: "Post New",
            bgColor: "bg-[#1231AA0D]",
            icon: "plus",
            description: "Create a new job posting"
        }
    ];

    // Tab data
    const tabItems = [
        { id: "all-boards", label: "All Boards" },
        { id: "connected", label: "Connected" },
        { id: "premium", label: "Premium" },
        { id: "free", label: "Free" }
    ];

    // Connected Job Boards data
    const connectedJobBoards = [
        {
            id: 1,
            name: "LinkedIn Jobs",
            description: "Connected • 8 active postings",
            icon: <Briefcase className="h-4 w-4 text-blue-700" />
        },
        {
            id: 2,
            name: "Indeed",
            description: "Connected • 6 active postings",
            icon: <Briefcase className="h-4 w-4 text-blue-700" />
        },
        {
            id: 3,
            name: "Glassdoor",
            description: "Connected • 5 active postings",
            icon: <Briefcase className="h-4 w-4 text-blue-700" />
        },
        {
            id: 4,
            name: "Monster",
            description: "Connected • 3 active postings",
            icon: <Briefcase className="h-4 w-4 text-blue-700" />
        },
        {
            id: 5,
            name: "ZipRecruiter",
            description: "Connected • 7 active postings",
            icon: <Briefcase className="h-4 w-4 text-blue-700" />
        }
    ];

    // Available Job Boards data
    const availableJobBoards = [
        {
            id: 6,
            name: "AngelList",
            description: "Premium integration",
            icon: <Building2 className="h-4 w-4 text-blue-700" />,
            buttonText: "Connect",
            learnMoreUrl: "#"
        },
        {
            id: 7,
            name: "Dice",
            description: "Premium integration",
            icon: <Building2 className="h-4 w-4 text-blue-700" />,
            buttonText: "Connect",
            learnMoreUrl: "#"
        },
        {
            id: 8,
            name: "SimplyHired",
            description: "Free integration",
            icon: <Building2 className="h-4 w-4 text-blue-700" />,
            buttonText: "Connect",
            learnMoreUrl: "#"
        },
        {
            id: 9,
            name: "CareerBuilder",
            description: "Premium integration",
            icon: <Building2 className="h-4 w-4 text-blue-700" />,
            buttonText: "Connect",
            learnMoreUrl: "#"
        }
    ];

    // Recent Job Postings data
    const recentJobPostings = [
        {
            id: 1,
            title: "Senior Software Engineer",
            platform: "LinkedIn, Indeed, Glassdoor",
            postedDate: "Posted 2 days ago",
            applications: "12 applications"
        },
        {
            id: 2,
            title: "Product Manager",
            platform: "LinkedIn, Monster",
            postedDate: "Posted 3 days ago",
            applications: "8 applications"
        },
        {
            id: 3,
            title: "UX Designer",
            platform: "LinkedIn, Glassdoor",
            postedDate: "Posted 5 days ago",
            applications: "15 applications"
        },
        {
            id: 4,
            title: "Marketing Specialist",
            platform: "Indeed, ZipRecruiter",
            postedDate: "Posted 1 week ago",
            applications: "9 applications"
        },
        {
            id: 5,
            title: "Data Analyst",
            platform: "LinkedIn, Monster, Glassdoor",
            postedDate: "Posted 1 week ago",
            applications: "7 applications"
        }
    ];

    // Job Board Performance data
    const jobBoardPerformance = [
        {
            id: 1,
            name: "LinkedIn Jobs",
            applications: 67,
            views: 1553
        },
        {
            id: 2,
            name: "Indeed",
            applications: 52,
            views: 890
        },
        {
            id: 3,
            name: "Glassdoor",
            applications: 34,
            views: 742
        },
        {
            id: 4,
            name: "Monster",
            applications: 15,
            views: 328
        },
        {
            id: 5,
            name: "ZipRecruiter",
            applications: 19,
            views: 453
        }
    ];

    useEffect(() => {
        // Simulate loading data
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    }, []);

    // Icon components
    const getStatsIcon = (iconType: any) => {
        switch (iconType) {
            case "document":
                return <BarChart3 className="h-5 w-5 text-blue-600" />;
            case "chart":
                return <BarChart3 className="h-5 w-5 text-blue-600" />;
            case "eye":
                return <Eye className="h-5 w-5 text-blue-600" />;
            case "plus":
                return <Plus className="h-5 w-5 text-blue-600" />;
                case "trending-up":
                return <TrendingUp className="h-5 w-5 text-blue-600" />;
            default:
                return <AlertCircle className="h-5 w-5 text-blue-600" />;
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
                    <span className="text-foreground">Job Boards</span>
                </div>

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">Job Boards</h1>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-6 md:grid-cols-4">
                    {statsData.map((stat, index) => (
                        <Card key={index} className={`rounded-3xl ${stat.bgColor} border-0`}>
                            <CardContent className="p-4">
                                <div className="flex flex-col items-start">
                                    <div className="flex items-center justify-between w-full mb-2">
                                        <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                                            {getStatsIcon(stat.icon)}
                                        </div>
                                    </div>
                                    <p className="text-xs font-medium text-gray-500">{stat.title}</p>
                                    <h3 className="text-xl font-bold mb-2">{stat.value}</h3>
                                    {stat.description && (
                                        <p className="text-xs text-gray-500 mb-2">{stat.description}</p>
                                    )}
                                    <Button
                                        variant="default"
                                        size="sm"
                                        className={`mt-2 text-xs rounded-3xl ${index === 3 ? "bg-blue-600" : "bg-blue-600"
                                            } hover:bg-blue-700 text-white`}
                                    >
                                        {stat.buttonText}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Search and Filter Section */}
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            placeholder="Search job postings..."
                            className="pl-4 rounded-3xl"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="h-4 w-4 absolute right-2.5 top-2.5 text-gray-500" />
                    </div>
                    <Button
                        variant="default"
                        size="sm"
                        className="rounded-3xl bg-blue-700  text-white"
                    >
                        Filter
                    </Button>
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

                {/* Connected Job Boards Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Connected Job Boards</h2>
                    </div>
                    <div className="space-y-2">
                        {connectedJobBoards.map((board) => (
                            <div
                                key={board.id}
                                className="flex items-center justify-between p-4 "
                            >
                                <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                      {board.icon}
                    </div>
                                    <div>
                                        <div className="text-sm font-medium">{board.name}</div>
                                        <div className="text-xs text-gray-500">{board.description}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                                        <RefreshCcw className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Available Job Boards Section */}
                <div className="space-y-4">
                    <div className="flex items-center">
                        <h2 className="text-lg font-semibold">Available Job Boards</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4">
                        {availableJobBoards.map((board) => (
                            <Card key={board.id} className="rounded-3xl bg-[#1231AA0D] border-0">
                                <CardContent className="p-4">
                                    <div className="flex flex-col items-start text-center">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                      {board.icon}
                    </div>
                                        <h3 className="text-base font-medium mb-1">{board.name}</h3>
                                        <p className="text-xs text-gray-500 mb-4">{board.description}</p>
                                        <div className="flex gap-2 w-full">
                                            <Button
                                                variant="default"
                                                size="sm"
                                                className="text-xs rounded-3xl flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                            >
                                                {board.buttonText}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-xs rounded-3xl flex-1 text-black hover:bg-blue-700 hover:text-white"
                                            >
                                                Learn More
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Recent Job Postings Section */}
                <div className="space-y-4">
                    <div className="flex items-center">
                        <h2 className="text-lg font-semibold">Recent Job Postings</h2>
                    </div>
                    <div className="space-y-2">
                        {recentJobPostings.map((job) => (
                            <div
                                key={job.id}
                                className="flex items-center justify-between p-4 "
                            >
                                <div className="flex items-center gap-4">
                                <div className="flex-shrink-0  mb-2">
                                <Briefcase className="h-4 w-4 text-black fill-black" />
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                      <h4 className="text-sm font-medium w-48">{job.title}</h4>
                      <p className="text-xs font-medium w-32">{job.platform}</p>
                      <div className="text-xs text-gray-500">{job.postedDate}</div>
                    </div>
                                </div>
                                    <div className="text-xs font-medium">{job.applications}</div>
                                <div className="flex items-center gap-6">
                                    <div className="flex space-x-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Job Board Performance Section */}
                <div className="space-y-4">
                    <div className="flex items-center">
                        <h2 className="text-lg font-semibold">Job Board Performance</h2>
                    </div>
                    <div className="space-y-2">
                        {jobBoardPerformance.map((board) => (
                            <div
                                key={board.id}
                                className="flex items-center justify-between p-4 "
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                                        <TrendingUp className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">{board.name}</div>
                                    <div className="text-xs text-gray-500">{board.applications} applications • {board.views} views</div>
                                    </div>
                                </div>
                                <div>
                                    <ChartNoAxesColumn className="h-4 w-4 text-black " />
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}