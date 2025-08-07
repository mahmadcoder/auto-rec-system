"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, Clock, Edit2, Copy, Trash2, Users, FileText, ArrowRight, RefreshCw, Download, Upload, Circle, ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Navigation tabs data
const tabItems = [
    { id: "smtp", label: "SMTP Configuration", href: "/email-integration" },
    { id: "templates", label: "Email Templates", href: "/email-integration/email-templates" },
    { id: "reports", label: "Delivery Reports", href: "/email-integration/delivery-reports" }
];

// Template categories with their email templates
const templateCategories = [
    {
        title: "Candidate Communication",
        templates: [
            {
                id: 1,
                icon: <Mail className="h-4 w-4" />,
                name: "Interview Invitation",
                lastEdited: "2 days ago",
                usageCount: "Used 28 times"
            },
            {
                id: 2,
                icon: <Mail className="h-4 w-4" />,
                name: "Application Acknowledgment",
                lastEdited: "1 week ago",
                usageCount: "Used 156 times"
            },
            {
                id: 3,
                icon: <Mail className="h-4 w-4" />,
                name: "Job Offer",
                lastEdited: "3 days ago",
                usageCount: "Used 12 times"
            },
            {
                id: 4,
                icon: <Mail className="h-4 w-4" />,
                name: "Rejection - After Interview",
                lastEdited: "2 weeks ago",
                usageCount: "Used 42 times"
            }
        ]
    },
    {
        title: "Client Communication",
        templates: [
            {
                id: 5,
                icon: <Mail className="h-4 w-4" />,
                name: "Candidate Presentation",
                lastEdited: "5 days ago",
                usageCount: "Used 18 times"
            },
            {
                id: 6,
                icon: <Mail className="h-4 w-4" />,
                name: "Weekly Progress Report",
                lastEdited: "1 day ago",
                usageCount: "Used 8 times"
            },
            {
                id: 7,
                icon: <Mail className="h-4 w-4" />,
                name: "New Job Confirmation",
                lastEdited: "3 weeks ago",
                usageCount: "Used 24 times"
            }
        ]
    }
];

// CRM integration options
const crmIntegrationOptions = [
    {
        id: "sync",
        icon: <RefreshCw className="h-4 w-4 text-blue-600" />,
        title: "Sync with CRM",
        description: "Automatically update templates in your CRM",
        hasToggle: true
    },
    {
        id: "import",
        icon: <Download className="h-4 w-4 text-blue-600" />,
        title: "Import from CRM",
        description: "Import existing templates from your CRM",
        hasArrow: true
    },
    {
        id: "export",
        icon: <Upload className="h-4 w-4 text-blue-600" />,
        title: "Export to CRM",
        description: "Export templates to your CRM system",
        hasArrow: true
    }
];

// Template settings options
const templateSettings = [
    {
        id: "signature",
        icon: <Edit2 className="h-4 w-4 text-blue-600" />,
        title: "Default Signature",
        description: "Manage your email signature",
        hasEdit: true
    },
    {
        id: "tags",
        icon: <FileText className="h-4 w-4 text-blue-600" />,
        title: "Personalization Tags",
        description: "Manage dynamic content tags",
        hasEdit: true
    },
    {
        id: "limit",
        icon: <Users className="h-4 w-4 text-blue-600" />,
        title: "Batch Sending Limit",
        description: "Maximum recipients per template",
        hasDropdown: true
    }
];

export default function EmailTemplatesPage() {
    const router = useRouter();
    // Set the initial activeTab to "templates" since we're on the templates page
    const [activeTab, setActiveTab] = useState("templates");

  const handleTabClick = (tabId: string, href: string) => {
    router.push(href);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Navigation path */}
      <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
        <Link href="/dashboard" className="hover:text-gray-700">Dashboard</Link>
        <span>{'>'}</span>
        <Link href="/email-integration" className="hover:text-gray-700">Email Integration</Link>
        <span>{'>'}</span>
        <span className="text-gray-700">Email Templates</span>
      </div>

      {/* Header */}
      <div className="mb-6 mt-6">
        <h1 className="text-2xl font-bold mb-2">Email Integration</h1>
        <p className="text-gray-500">Create and manage email templates for consistent recruitment communications</p>
      </div>

            {/* Custom Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
                <nav className="flex space-x-8">
                    {tabItems.map((tab) => (
                        <button
                            key={tab.id}
                            className={`flex items-center py-4 px-1 text-sm font-medium ${activeTab === tab.id
                                    ? "border-b-2 border-black text-black"
                                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            onClick={() => handleTabClick(tab.id, tab.href)}
                        >
                            <Circle className={`h-2 w-2 mr-2 ${activeTab === tab.id ? "fill-black" : ""}`} />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Template Library Section */}
            <div className="mb-12 mt-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Template Library</h2>
                    <Button
                        variant="default"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
                        onClick={() => router.push("/email-integration/email-templates/create")}
                    >
                        Create New Template
                    </Button>
                </div>

                {/* Template Categories */}
                {templateCategories.map((category, index) => (
                    <div key={index} className="mb-8">
                        <h3 className="text-base font-medium mb-4">{category.title}</h3>
                        <div className="space-y-4">
                            {category.templates.map((template) => (
                                <div key={template.id} className="grid grid-cols-12 items-center py-4 border-b border-gray-100">
                                    {/* Template name and icon - 4 columns */}
                                    <div className="col-span-4 flex items-center space-x-4">
                                        {template.icon}
                                        <span className="font-medium">{template.name}</span>
                                    </div>
                                    
                                    {/* Last edited - 3 columns */}
                                    <div className="col-span-3 text-sm text-gray-500">
                                        Last edited: {template.lastEdited}
                                    </div>
                                    
                                    {/* Usage count - 3 columns */}
                                    <div className="col-span-3 text-sm text-gray-500">
                                        {template.usageCount}
                                    </div>
                                    
                                    {/* Action buttons - 2 columns */}
                                    <div className="col-span-2 flex items-center justify-end space-x-2">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-white">
                                            <Edit2 className="h-4 w-4 hover:text-white" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-white">
                                            <Copy className="h-4 w-4 hover:text-white" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-white">
                                            <Trash2 className="h-4 w-4 hover:text-white" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* CRM Integration Section */}
            <div className="mb-12">
                <h2 className="text-lg font-semibold mb-4">CRM Integration</h2>
                <p className="text-sm text-gray-500 mb-6">Connect your templates with your CRM system for seamless communication</p>

                <div className="space-y-4">
                    {crmIntegrationOptions.map((option) => (
                        <div key={option.id} className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div className="flex items-center space-x-4">
                                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                                    {option.icon}
                                </div>
                                <div>
                                    <h3 className="font-medium">{option.title}</h3>
                                    <p className="text-sm text-gray-500">{option.description}</p>
                                </div>
                            </div>
                            {option.hasToggle && <Switch />}
                            {option.hasArrow && <ArrowRight className="h-4 w-4 text-black" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Template Settings Section */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Template Settings</h2>
                <div className="space-y-4">
                    {templateSettings.map((setting) => (
                        <div key={setting.id} className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div className="flex items-center space-x-4">
                                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                                    {setting.icon}
                                </div>
                                <div>
                                    <h3 className="font-medium">{setting.title}</h3>
                                    <p className="text-sm text-gray-500">{setting.description}</p>
                                </div>
                            </div>
                            {setting.hasEdit && <Edit2 className="h-4 w-4 text-black" />}
                            {setting.hasDropdown && (
                                <Select>
                                    <SelectTrigger className="w-32">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="50">50 recipients</SelectItem>
                                        <SelectItem value="100">100 recipients</SelectItem>
                                        <SelectItem value="200">200 recipients</SelectItem>
                                        <SelectItem value="500">500 recipients</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}