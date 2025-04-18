"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Clock,
  Globe,
  Save,
  CheckCircle,
  Eye,
  FileText,
  Settings,
  Users,
  CircleHelp,
  Clock4,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LinkedInTemplatePage() {
  const [templateName, setTemplateName] = useState("Senior Software Engineer at ACME Corporation");
  const [jobDescription, setJobDescription] = useState(
    "We're looking for a talented Senior Software Engineer to join our innovative team at ACME Corporation. With over 5,000 employees and a global impact in dozens of countries worldwide, RecruitFlow is a fast-developing AI recruitment and job board platform. Collaborate with cross-functional teams to design, develop, and implement complex applications that enhance our service deployments. 3+ years experience with modern JavaScript frameworks • Strong understanding of software architecture • Experience with cloud services • Competitive salary package • Bachelor or higher degree of Computer Science or equivalent field • Flexible work arrangements • Health insurance • Competitive salary and equity package • Professional development budget ready now to join our team!"
  );

  const linkedInDetails = [
    {
      icon: <Eye className="h-4 w-4 text-slate-600" />,
      label: "Visibility",
      value: "Public - All LinkedIn Members"
    },
    {
      icon: <CheckCircle className="h-4 w-4 text-slate-600" />,
      label: "Application Method",
      value: "Easy Apply Enabled"
    },
    {
      icon: <CircleHelp className="h-4 w-4 text-slate-600" />,
      label: "Screening Questions",
      value: "2 Questions Included"
    },
    {
      icon: <Building2 className="h-4 w-4 text-slate-600" />,
      label: "Company Logo",
      value: "Included"
    },
    {
      icon: <Clock4 className="h-4 w-4 text-slate-600" />,
      label: "Estimated Reach",
      value: "5,000-7,500 potential candidates"
    }
  ];

  return (
    <DashboardShell>
      <div className="mx-auto space-y-6 p-0 md:p-6">
        {/* Header with Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-sm">
            <Link href="/dashboard" className="text-muted-foreground">Dashboard</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/jobs" className="text-muted-foreground">Jobs</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/jobs/linkedin" className="text-muted-foreground">LinkedIn</Link>
            <span className="text-muted-foreground">/</span>
            <span>Template Preview</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/jobs/linkedin">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold tracking-tight">LinkedIn Posting Preview</h1>
            </div>
          </div>
        </div>

        {/* Main content area with two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Template Settings Card */}
          <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-6">
            <div className="flex flex-col items-start mb-4">
              <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                <Settings className="h-4 w-4 text-blue-600" />
              </div>
              <h2 className="font-bold">Template Settings</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Adjust your template settings before posting</p>
            <Button 
              variant="default" 
              className="bg-blue-700 hover:bg-blue-800 text-white rounded-3xl"
            >
              Edit Template
            </Button>
          </Card>

          {/* Post to LinkedIn Card */}
          <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-6">
            <div className="flex flex-col  items-start mb-4">
              <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <h2 className="font-bold">Post to LinkedIn</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Create job on posting using this template</p>
            
            <Button 
              variant="default" 
              className="bg-blue-700 hover:bg-blue-800 text-white rounded-3xl"
            >
              Create Posting
            </Button>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-6">Preview</h2>
          
          <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-6">
            <div className="flex flex-col  items-start mb-4">
              <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center mr-3">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
                <h3 className="font-bold">ACME Corporation</h3>
            <h2 className="text-xl font-bold mb-2">{templateName}</h2>
            
            <div className="text-sm whitespace-pre-wrap mb-6">{jobDescription}</div>
            <div className="flex gap-3">
              <Button 
                variant="default" 
                className="bg-blue-700 hover:bg-blue-800 text-white rounded-3xl"
              >
                Apply with LinkedIn
              </Button>
              <Button 
                variant="outline" 
                className="text-black hover:bg-blue-800 hover:text-white rounded-3xl"
              >
                Save Job
              </Button>
            </div>
          </Card>
        </div>

        {/* LinkedIn Posting Details */}
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-6">LinkedIn Posting Details</h2>
          
          <div className="space-y-4">
            {linkedInDetails.map((detail, index) => (
              <div key={index} className="flex items-start py-3 border-b">
                <div className="flex items-center gap-3 w-full">
                  {detail.icon}
                  <div className="grid grid-cols-[250px_1fr] w-full">
                    <span className="font-medium">{detail.label}</span>
                    <p className="text-sm text-muted-foreground">{detail.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}