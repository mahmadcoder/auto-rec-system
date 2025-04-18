"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Users, 
  Mail, 
  BarChart, 
  Wifi, 
  ChevronsRight, 
  Code, 
  Zap, 
  RefreshCcw,
  Database,
  ChartBar,
  Circle,
  TrendingUp,
  User
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CRMIntegrationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Tab data
  const tabItems = [
    { id: "overview", label: "Overview" },
    { id: "customer-data", label: "Customer Data" },
    { id: "email-campaigns", label: "Email Campaigns" },
    { id: "settings", label: "Settings" }
  ];

  // Stats cards data
  const statsData = [
    {
      title: "CONTACTS",
      value: "1,245",
      description: "Total contacts tracked",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      buttonText: "View All",
      buttonVariant: "outline"
    },
    {
      title: "CAMPAIGNS",
      value: "8",
      description: "Active email campaigns",
      icon: <Mail className="h-5 w-5 text-blue-600" />,
      buttonText: "Manage",
      buttonVariant: "primary"
    },
    {
      title: "ENGAGEMENT",
      value: "68%",
      description: "Average email open rate",
      icon: <TrendingUp className="h-5 w-5 text-blue-600" />,
      buttonText: "Analytics",
      buttonVariant: "primary"
    },
    {
      title: "SYNC STATUS",
      value: "Connected",
      description: "Last synced 10 minutes ago",
      icon: <RefreshCcw className="h-5 w-5 text-blue-600" />,
      buttonText: "Sync Now",
      buttonVariant: "primary"
    }
  ];

  // Recent interactions data
  const recentInteractions = [
    {
      id: 1,
      name: "John Smith",
      action: "Email Opened",
      campaign: "Campaign: New Job Alert",
      time: "2 hours ago",
      progress: "45% profile complete"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      action: "Clicked Link",
      campaign: "Campaign: Interview Tips",
      time: "Yesterday",
      progress: "78% profile complete"
    },
    {
      id: 3,
      name: "Michael Brown",
      action: "Replied",
      campaign: "Campaign: Follow-up",
      time: "2 days ago",
      progress: "92% profile complete"
    },
    {
      id: 4,
      name: "Emily Davis",
      action: "Unsubscribed",
      campaign: "Campaign: Monthly Newsletter",
      time: "3 days ago",
      progress: "34% profile complete"
    },
    {
      id: 5,
      name: "David Wilson",
      action: "New Contact",
      campaign: "Added via Website Form",
      time: "1 week ago",
      progress: "12% profile complete"
    }
  ];

  // Integration settings data
  const integrationSettings = [
    {
      id: "website-form",
      title: "Website Form Integration",
      description: "Automatically identify form on your website",
      icon: <Code className="h-5 w-5 text-blue-600" />,
      enabled: true
    },
    {
      id: "automated-email",
      title: "Automated Email Responses",
      description: "Send personalized emails based on triggers",
      icon: <Zap className="h-5 w-5 text-blue-600" />,
      enabled: true
    },
    {
      id: "contact-sync",
      title: "Contact Synchronization",
      description: "Keep contacts in sync with recruitment database",
      icon: <RefreshCcw className="h-5 w-5 text-blue-600" />,
      enabled: true
    },
    {
      id: "analytics",
      title: "Analytics Integration",
      description: "Track campaign performance metrics",
      icon: <ChartBar className="h-5 w-5 text-blue-600" />,
      enabled: true
    }
  ];

  // Simulate data loading
  useEffect(() => {
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
          <Link href="/crm" className="hover:text-foreground">
            CRM
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Integration</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">CRM Integration</h1>
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

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          {statsData.map((stat, index) => (
            <Card key={index} className="rounded-3xl bg-[#1231AA0D] border-0">
              <CardContent className="p-6">
                <div className="flex flex-col items-start">
                  <div className="flex items-center justify-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                      {stat.icon}
                    </div>
                  </div>
                  <p className="text-xs font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-lg font-bold mb-1">{stat.value}</h3>
                  <p className="text-xs text-gray-500 mb-3">{stat.description}</p>
                  <Button
                    variant={stat.buttonVariant === "primary" ? "default" : "outline"}
                    size="sm"
                    className={`mt-auto text-xs ${
                      stat.buttonVariant === "primary" 
                        ? "bg-blue-600 hover:bg-blue-700 text-white rounded-3xl" 
                        : "bg-blue-600 hover:bg-blue-700 text-white rounded-3xl "
                    }`}
                  >
                    {stat.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Interactions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Interactions</h2>
          </div>
          <div className="bg-white rounded-md">
            
            {recentInteractions.map((interaction, index) => (
              <div 
                key={interaction.id} 
                className={`grid grid-cols-5 gap-4 p-4 items-center ${
                  index !== recentInteractions.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-black" />
                  <span className="text-sm font-medium">{interaction.name}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {interaction.action}
                </div>
                <div className="text-sm text-gray-500">
                  {interaction.campaign}
                </div>
                <div className="text-sm text-gray-500">
                  {interaction.time}
                </div>
                <div className="text-sm text-gray-500">
                  {interaction.progress}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Campaign Setup Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Email Campaign Setup</h2>
          </div>
          <div className="bg-white rounded-md p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Campaign Name</label>
              <Input 
                type="text" 
                placeholder="Enter campaign name" 
                className="max-full pr-10 rounded-3xl"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Audience</label>
              <Select>
                <SelectTrigger className="w-full rounded-3xl pr-4">
                  <SelectValue placeholder="Select audience segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-candidates">New Candidates</SelectItem>
                  <SelectItem value="active-candidates">Active Candidates</SelectItem>
                  <SelectItem value="placed-candidates">Placed Candidates</SelectItem>
                  <SelectItem value="clients">Clients</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Subject</label>
              <Input 
                type="text" 
                placeholder="Enter email subject line" 
                className="max-full pr-10 rounded-3xl"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Content</label>
              <Textarea 
                placeholder="Compose your email content here..." 
                className="min-h-32"
              />
            </div>
            
            <div className="flex space-x-4 pt-4">
              <Button variant="outline" className="text-black hover:bg-blue-700 hover:text-white rounded-3xl">
                Save as Draft
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl">
                Schedule Campaign
              </Button>
            </div>
          </div>
        </div>

        {/* Integration Settings Section */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Integration Settings</h2>
          </div>
          <div className="bg-white rounded-md">
            {integrationSettings.map((setting, index) => (
              <div 
                key={setting.id} 
                className={`flex items-center justify-between p-4 ${
                  index !== integrationSettings.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                    {setting.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{setting.title}</div>
                    <div className="text-xs text-gray-500">{setting.description}</div>
                  </div>
                </div>
                <Switch 
                  checked={setting.enabled} 
                  onCheckedChange={() => {}}
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}