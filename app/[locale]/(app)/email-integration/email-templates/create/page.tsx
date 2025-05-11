"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { User, Briefcase, Building2, ImagePlus, Edit2, Eye, MousePointerClick } from "lucide-react";

// Available template tags for dynamic content
const availableTags = [
  {
    icon: <User className="h-4 w-4 text-blue-600" />,
    title: "Candidate",
    tags: [
      "{{candidate.firstName}}",
      "{{candidate.lastName}}",
      "{{candidate.email}}"
    ]
  },
  {
    icon: <Briefcase className="h-4 w-4 text-blue-600" />,
    title: "Job",
    tags: [
      "{{job.title}}",
      "{{job.location}}",
      "{{job.salary}}"
    ]
  },
  {
    icon: <Building2 className="h-4 w-4 text-blue-600" />,
    title: "Company",
    tags: [
      "{{company.name}}",
      "{{company.address}}",
      "{{company.website}}"
    ]
  }
];

export default function CreateTemplatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    templateName: "",
    category: "",
    subjectLine: "",
    emailContent: "",
    includeSignature: false,
    trackOpens: false,
    trackClicks: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveTemplate = () => {
    // TODO: Implement template saving logic
    console.log("Saving template:", formData);
    router.push("/email-integration/email-templates");
  };

  const handleInsertTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      emailContent: prev.emailContent + " " + tag
    }));
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Breadcrumb navigation */}
      <div className="flex items-center text-sm font-medium mb-6">
        <Link href="/tools" className="text-gray-500 hover:text-gray-700">
          Tools
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link href="/email-integration" className="text-gray-500 hover:text-gray-700">
          Email Integration
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link href="/email-integration/email-templates" className="text-gray-500 hover:text-gray-700">
          Email Templates
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900">Create Template</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Create New Template</h1>
        <p className="text-gray-500">
          Design your email template with dynamic content tags and formatting options
        </p>
      </div>

      {/* Template Details Section */}
      <div className="space-y-6 mb-8">
        <h2 className="text-lg font-semibold">Template Details</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Template Name</label>
            <Input
              placeholder="Enter a descriptive name"
              value={formData.templateName}
              onChange={(e) => handleInputChange("templateName", e.target.value)}
              className="rounded-3xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger className="rounded-3xl">
                <SelectValue placeholder="Select or create category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="candidate">Candidate Communication</SelectItem>
                <SelectItem value="client">Client Communication</SelectItem>
                <SelectItem value="internal">Internal Communication</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subject Line</label>
            <Input
              placeholder="Enter email subject line"
              value={formData.subjectLine}
              onChange={(e) => handleInputChange("subjectLine", e.target.value)}
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>

      {/* Email Content Section */}
      <div className="space-y-6 mb-8">
        <h2 className="text-lg font-semibold">Email Content</h2>
        
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="rounded-3xl text-black hover:bg-blue-600 hover:text-white">Format Text</Button>
            <Button variant="outline" size="sm" className="rounded-3xl text-black hover:bg-blue-600 hover:text-white">Insert Tag</Button>
            <Button variant="outline" size="sm" className="rounded-3xl text-black hover:bg-blue-600 hover:text-white">
              <ImagePlus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </div>

          <Textarea
            placeholder="Compose your email content here..."
            className="min-h-[200px] rounded-3xl resize-none"
            value={formData.emailContent}
            onChange={(e) => handleInputChange("emailContent", e.target.value)}
          />
        </div>
      </div>

      {/* Available Tags Section */}
      <div className="space-y-6 mb-8">
        <div className="flex flex-col items-start">
          <h2 className="text-lg font-semibold mb-4">Available Tags</h2>
          <p className="text-sm text-black">Insert these tags to personalize your email with dynamic content</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {availableTags.map((category) => (
            <div key={category.title} className="p-4 rounded-3xl bg-[#1231AA0D] border-0">
              <div className="flex flex-col items-start space-y-4">
                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center">
                  {category.icon}
                </div>
                <h3 className="font-medium">{category.title}</h3>
                <div className="space-y-3 w-full">
                  {category.tags.map((tag) => (
                    <div
                      key={tag}
                      className="text-sm text-gray-600 cursor-pointer hover:text-blue-600"
                      onClick={() => handleInsertTag(tag)}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template Options Section */}
      <div className="space-y-6 mb-8">
        <h2 className="text-lg font-semibold">Template Options</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center">
                <Edit2 className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Include Signature</h3>
                <p className="text-sm text-gray-500">Append your default email signature</p>
              </div>
            </div>
            <Switch
              checked={formData.includeSignature}
              onCheckedChange={(checked) => handleInputChange("includeSignature", checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center">
                <Eye className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Track Opens</h3>
                <p className="text-sm text-gray-500">Monitor when recipients open this email</p>
              </div>
            </div>
            <Switch
              checked={formData.trackOpens}
              onCheckedChange={(checked) => handleInputChange("trackOpens", checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center">
                <MousePointerClick className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Track Clicks</h3>
                <p className="text-sm text-gray-500">Monitor link clicks in this email</p>
              </div>
            </div>
            <Switch
              checked={formData.trackClicks}
              onCheckedChange={(checked) => handleInputChange("trackClicks", checked)}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => router.push("/email-integration/email-templates")}
          className="rounded-3xl text-black hover:bg-blue-600 hover:text-white"
        >
          Cancel
        </Button>
        <div className="space-x-2">
          <Button variant="outline" className="rounded-3xl text-black hover:bg-blue-600 hover:text-white">Save as Draft</Button>
          <Button variant="outline" className="rounded-3xl text-black hover:bg-blue-600 hover:text-white">Preview</Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
            onClick={handleSaveTemplate}
          >
            Save Template
          </Button>
        </div>
      </div>
    </div>
  );
} 