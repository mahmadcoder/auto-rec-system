"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Layout, Type, Palette, AlignLeft, Columns, User, FileImage, Circle, SpellCheck, Building2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function CreateCustomTemplate() {
  const [templateName, setTemplateName] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("design");
  
  // Design Options Cards data
  const designOptions = [
    {
      title: "Layout",
      description: "Choose the overall structure",
      icon: <Layout className="h-5 w-5 text-blue-600" />,
      bgColor: "bg-[#1231AA0D]"
    },
    {
      title: "Typography",
      description: "Select fonts and text styles",
      icon: <SpellCheck className="h-5 w-5 text-blue-600" />,
      bgColor: "bg-[#1231AA0D]"
    },
    {
      title: "Colors",
      description: "Define color scheme",
      icon: <Palette className="h-5 w-5 text-blue-600" />,
      bgColor: "bg-[#1231AA0D]"
    }
  ];

  // Header Style options data
  const headerStyleOptions = [
    {
      title: "Minimal",
      description: "Clean, text-only header",
      icon: <Type className="h-4 w-4 text-blue-600" />,
      showToggle: true
    },
    {
      title: "Standard",
      description: "Name, contact info, and summary",
      icon: <User className="h-4 w-4 text-blue-600" />,
      showToggle: false
    },
    {
      title: "Professional",
      description: "With logo and contact details",
      icon: <Building2 className="h-4 w-4 text-blue-600" />,
      showToggle: false
    }
  ];

  // Page Format options data
  const pageFormatOptions = [
    {
      title: "Single Column",
      description: "Traditional full-width layout",
      icon: <AlignLeft className="h-4 w-4 text-blue-600" />,
      showToggle: true
    },
    {
      title: "Two Column",
      description: "Side panel with main content",
      icon: <Columns className="h-4 w-4 text-blue-600" />,
      showToggle: false
    }
  ];

  // Tab items data
  const tabItems = [
    { id: "design", label: "Design" },
    { id: "sections", label: "Sections" },
    { id: "preview", label: "Preview" }
  ];
  
  return (
    <DashboardShell>
      <div className="mx-auto space-y-6 p-0 md:p-6">
        {/* Navigation path */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
          <Link href="/dashboard" className="hover:text-gray-700">Dashboard</Link>
          <span>{'>'}</span>
          <Link href="/cv-reviewer" className="hover:text-gray-700">CV Rebrander</Link>
          <span>{'>'}</span>
          <Link href="/cv-reviewer/create-new" className="hover:text-gray-700">Create New</Link>
          <span>{'>'}</span>
          <span className="text-gray-700">Create Custom</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Create Custom Template</h1>
          <p className="text-sm text-gray-500">Design your own template with custom sections and formatting</p>
        </div>

        {/* Template Name Input */}
        <div className="mb-6">
          <Label htmlFor="templateName" className="font-medium">Template Name</Label>
          <Input 
            id="templateName"
            placeholder="Enter a name for your template" 
            className="mt-2 max-w-md rounded-3xl"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
        </div>

        {/* Custom Tab Navigation - styled like tasks page */}
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

        {/* Content based on active tab */}
        {activeTab === "design" && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Design Options</h2>
            
            {/* Design Options Grid */}
            <div className="grid gap-6 md:grid-cols-3">
              {designOptions.map((option, index) => (
                <Card key={index} className={`rounded-3xl ${option.bgColor} border-0`}>
                  <CardContent className="p-6 flex flex-col items-start">
                    <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                      {option.icon}
                    </div>
                    <h3 className="text-base font-medium">{option.title}</h3>
                    <p className="text-sm text-gray-500 mt-2">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Header Style Section */}
            <div className="mt-8">
              <h3 className="text-md font-semibold mb-4">Header Style</h3>
              
              <div className="space-y-4">
                {headerStyleOptions.map((option, index) => (
                  <div key={index} className="flex items-center justify-between p-4 ">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-[#E0E4F0] flex items-center justify-center mr-4">
                        {option.icon}
                      </div>
                      <div>
                        <p className="font-medium">{option.title}</p>
                        <p className="text-sm text-gray-500">{option.description}</p>
                      </div>
                    </div>
                    {option.showToggle && <Switch id={`header-style-${index}`} />}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Page Format Section */}
            <div className="mt-8">
              <h3 className="text-md font-semibold mb-4">Page Format</h3>
              
              <div className="space-y-4">
                {pageFormatOptions.map((option, index) => (
                  <div key={index} className="flex items-center justify-between p-4 ">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-[#E0E4F0] flex items-center justify-center mr-4">
                        {option.icon}
                      </div>
                      <div>
                        <p className="font-medium">{option.title}</p>
                        <p className="text-sm text-gray-500">{option.description}</p>
                      </div>
                    </div>
                    {option.showToggle && <Switch id={`page-format-${index}`} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "sections" && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Template Sections</h2>
            <p className="text-sm text-gray-500 mb-6">
              Configure the sections that will appear in your custom template
            </p>
            
            {/* Placeholder content for Sections tab */}
            <div className="bg-gray-50 p-8 rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center">
              <p className="text-gray-500">Section configuration will be implemented here</p>
            </div>
          </div>
        )}

        {activeTab === "preview" && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Template Preview</h2>
            <p className="text-sm text-gray-500 mb-6">
              Preview how your template will look with sample data
            </p>
            
            {/* Placeholder content for Preview tab */}
            <div className="bg-gray-50 p-8 rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center min-h-[400px]">
              <p className="text-gray-500">Template preview will be shown here</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" className="rounded-3xl text-black hover:bg-blue-600 hover:text-white">
            Cancel
          </Button>
          <Button 
            variant="default" 
            className="rounded-3xl bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              if (activeTab === "design") {
                window.location.href = '/cv-reviewer/create-new/create-custom/process-cv';
              }
              else if (activeTab === "sections") setActiveTab("preview");
              // Save template functionality would go here for preview tab
            }}
          >
            {activeTab === "design" ? "Continue to Sections" : 
             activeTab === "sections" ? "Continue to Preview" : "Save Template"}
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}