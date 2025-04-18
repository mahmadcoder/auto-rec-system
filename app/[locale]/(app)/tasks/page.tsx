  "use client";

  import { useState, useEffect } from "react";
  import Link from "next/link";
  import { DashboardShell } from "@/components/dashboard-shell";
  import { Button } from "@/components/ui/button";
  import { Card, CardContent } from "@/components/ui/card";
  import { 
    CheckCircle, Clock, Plus, Search, Edit, MoreVertical, Calendar,
    FileText, Circle, Users, ChevronDown, ChevronRight, 
    Eye, CircleCheck, CircleAlert, Building2, Ellipsis
  } from "lucide-react";
  import { LucideProps } from "lucide-react"; // Import LucideProps type for TypeScript
  import { Avatar, AvatarFallback } from "@/components/ui/avatar";
  import { Badge } from "@/components/ui/badge";
  import { Input } from "@/components/ui/input";
  import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

  export default function TasksPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all-tasks");
    
    // Stats data
    const statsData = [
      {
        title: "PENDING TASKS",
        value: "18",
        icon: <Ellipsis className="h-4 w-4 text-blue-600" />,
        buttonText: "View All",
        bgColor: "bg-[#1231AA0D]",
        status: "Required Attention",
      },
      {
        title: "DUE TODAY",
        value: "7",
        icon: <Calendar className="h-4 w-4 text-blue-600" />,
        buttonText: "View Now",
        bgColor: "bg-[#1231AA0D]",
        status: "High Priority",
      },
      {
        title: "COMPLETED",
        value: "42",
        icon: <CheckCircle className="h-4 w-4 text-blue-600" />,
        buttonText: "View History",
        bgColor: "bg-[#1231AA0D]",
        status: "Last 30 Days",
      },
      {
        title: "NEW TASK",
        value: "Create Task",
        icon: <Plus className="h-4 w-4 text-blue-600" />,
        buttonText: "Create New",
        bgColor: "bg-[#1231AA0D]",
        status: "Add Recruitment activity",
      }
    ];

    // Tab data
    const tabItems = [
      { id: "all-tasks", label: "All Tasks" },
      { id: "my-tasks", label: "My Tasks" },
      { id: "team-tasks", label: "Team Tasks" },
      { id: "completed", label: "Completed" }
    ];

    // Due Today tasks
    const dueTodayTasks = [
      {
        id: 1,
        title: "Interview Scheduling",
        assignee: "Michael Johnson",
        dueIn: "Due in 3 hours",
        position: "Senior Software Engineer",
        icon: <CircleAlert className="h-4 w-4 text-gray-500" />
      },
      {
        id: 2,
        title: "Reference Check",
        assignee: "Sarah Williams",
        dueIn: "Due in 5 hours",
        position: "Product Manager",
        icon: <CircleAlert className="h-4 w-4 text-gray-500" />
      },
      {
        id: 3,
        title: "Offer Preparation",
        assignee: "David Chen",
        dueIn: "Due in 5 hours",
        position: "UX Designer",
        icon: <CircleAlert className="h-4 w-4 text-gray-500" />
      }
    ];

    // Upcoming tasks
    const upcomingTasks = [
      {
        id: 4,
        title: "CV Review",
        assignee: "Emily Rodriguez",
        dueIn: "Due tomorrow",
        position: "Marketing Specialist",
        icon: <Calendar className="h-4 w-4 text-black" />
      },
      {
        id: 5,
        title: "Technical Assessment",
        assignee: "James Wilson",
        dueIn: "Due tomorrow",
        position: "Data Analyst",
        icon: <Calendar className="h-4 w-4 text-black" />
      },
      {
        id: 6,
        title: "Client Presentation",
        assignee: "Lisa Thompson",
        dueIn: "Due in 2 days",
        position: "Project Manager",
        icon: <Calendar className="h-4 w-4 text-black" />
      },
      {
        id: 7,
        title: "Feedback Collection",
        assignee: "Robert Garcia",
        dueIn: "Due in 3 days",
        position: "Sales Director",
        icon: <Calendar className="h-4 w-4 text-black" />
      }
    ];

    // Task Categories
    const taskCategories = [
      {
        title: "Interviews",
        count: "23 scheduled",
        icon: <Users className="h-5 w-5 text-blue-600" />,
        color: "bg-[#E0E4F0]"
      },
      {
        title: "CV Reviews",
        count: "14 pending",
        icon: <FileText className="h-5 w-5 text-blue-600" />,
        color: "bg-[#E0E4F0]"
      },
      {
        title: "Client Meetings",
        count: "8 upcoming",
        icon: <Building2 className="h-5 w-5 text-blue-600" />,
        color: "bg-[#E0E4F0]"
      },
      {
        title: "Assessments",
        count: "19 to review",
        icon: <CheckCircle className="h-5 w-5 text-blue-600" />,
        color: "bg-[#E0E4F0]"
      }
    ];

    // Team workload
    const teamWorkload = [
      {
        name: "Alex Morgan",
        tasks: "9 active tasks",
        initials: "AM"
      },
      {
        name: "Jessica Lee",
        tasks: "6 active tasks",
        initials: "JL"
      },
      {
        name: "Mark Taylor",
        tasks: "8 active tasks",
        initials: "MT"
      },
      {
        name: "Sophia Kim",
        tasks: "5 active tasks",
        initials: "SK"
      }
    ];

    // Define EyeIcon component with proper TypeScript type
    const EyeIcon = (props: LucideProps) => {
      return <Eye {...props} />;
    };

    useEffect(() => {
      // Simulate loading data
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }, []);

    return (
      <DashboardShell>
        <div className="mx-auto space-y-6 p-0 md:p-6">
          {/* Breadcrumb navigation */}
          <div className="flex items-center text-sm font-medium">
            <Link href="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Tasks</span>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          </div>

          {/* Statistics Cards */}
          <div className="grid gap-6 md:grid-cols-4">
            {statsData.map((stat, index) => (
              <Card key={index} className={`rounded-3xl ${stat.bgColor} border-0`}>
                <CardContent className="p-4">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                        {stat.icon}
                      </div>
                    </div>
                    <p className="text-xs font-medium">{stat.title}</p>
                    <h3 className="text-xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-xs text-gray-500 mb-2">{stat.status}</p>
                    <Button
                      variant="default"
                      size="sm"
                      className={`mt-auto text-xs rounded-full ${
                        index === 3 ? "bg-blue-600" : "bg-blue-600"
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
          <div className="flex justify-between items-center">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search tasks..."
                className="pl-2 rounded-xl w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-4 w-4 absolute right-2.5 top-2.5 font-medium" />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border rounded-xl"
            >
              Filter <ChevronDown className="ml-2 h-4 w-4" />
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

          {/* Due Today Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold">Due Today</h2>
            </div>
            <div className="space-y-2">
              {dueTodayTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {task.icon}
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                      <h4 className="text-sm font-medium w-48">{task.title}</h4>
                      <p className="text-xs font-medium w-32">{task.assignee}</p>
                      <div className="text-xs text-gray-500">{task.dueIn}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 w-1/6 text-center">
                    <span className="text-xs text-gray-500">{task.position}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                        <CircleCheck className="h-4 w-4" />
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

          {/* Upcoming Tasks Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
            </div>
            <div className="space-y-2">
              {upcomingTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {task.icon}
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                      <h4 className="text-sm font-medium w-48">{task.title}</h4>
                      <p className="text-xs font-medium w-32">{task.assignee}</p>
                      <div className="text-xs text-gray-500">{task.dueIn}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 w-1/6 text-center">
                    <span className="text-xs text-gray-500">{task.position}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                        <CircleCheck className="h-4 w-4" />
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

          {/* Task Categories */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Task Categories</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              {taskCategories.map((category, index) => (
                <Card key={index} className="rounded-3xl bg-[#1231AA0D] border-0">
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <div className={`h-10 w-10 rounded-full ${category.color} flex items-center justify-center mb-2`}>
                        {category.icon}
                      </div>
                      <h3 className="text-base font-medium mb-1">{category.title}</h3>
                      <p className="text-xs text-gray-500 mb-4">{category.count}</p>
                      <div className="flex gap-2 mt-auto">
                        <Button
                          variant="default"
                          size="sm"
                          className="text-xs rounded-3xl bg-blue-700 text-white hover:bg-blue-50"
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs rounded-full  text-black hover:bg-blue-700 hover:text-white"
                        >
                          Add New
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Workload */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Team Workload</h2>
            </div>
            <div className="space-y-3">
              {teamWorkload.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-gray-200">
                      <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{member.name}</div>
                      <div className="text-xs text-gray-500">{member.tasks}</div>
                    </div>
                  </div>
                  <div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardShell>
    );
  }