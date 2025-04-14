// import { DashboardHeader } from "@/components/dashboard-header"
// import { DashboardShell } from "@/components/dashboard-shell"
// import { SettingsForm } from "@/components/settings-form"

// export default function SettingsPage() {
//   return (
//     <DashboardShell>
//       <DashboardHeader heading="Settings" text="Manage your scraping preferences" />
//       <SettingsForm />
//     </DashboardShell>
//   )
// }


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Mail, 
  BellDot,
  AlertCircle,
  Globe,
  Clock,
  Shield,
  ChevronRight,
  History,
  Lock,
  Phone,
  Briefcase,
  Circle,
  Calendar
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("account");
  
  // Tab data
  const tabItems = [
    { id: "account", label: "Account" },
    { id: "company", label: "Company" },
    { id: "teams", label: "Teams" },
    { id: "integrations", label: "Integrations" },
    { id: "notifications", label: "Notifications" },
    { id: "billing", label: "Billing" },
    { id: "security", label: "Security" }
  ];

  // Preferences data
  const preferencesData = [
    {
      id: "email-notifications",
      title: "Email Notifications",
      description: "Receive daily summaries and candidate updates",
      icon: <Mail className="h-5 w-5 text-blue-600" />,
      enabled: true
    },
    {
      id: "sms-notifications",
      title: "SMS Notifications",
      description: "Receive urgent alerts by text message",
      icon: <BellDot className="h-5 w-5 text-blue-600" />,
      enabled: true
    },
    {
      id: "calendar-integration",
      title: "Calendar Integration",
      description: "Sync meetings with your calendar",
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
      enabled: true
    },
    {
      id: "language",
      title: "Language",
      description: "English (US)",
      icon: <Globe className="h-5 w-5 text-blue-600" />,
      select: true,
      selectValue: "en-US"
    },
    {
      id: "timezone",
      title: "Time Zone",
      description: "Pacific Time (UTC-08:00)",
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      select: true,
      selectValue: "PT"
    }
  ];

  // Security settings data
  const securitySettings = [
    {
      id: "two-factor",
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security",
      icon: <Shield className="h-5 w-5 text-blue-600" />,
      enabled: true,
      hasAction: true
    },
    {
      id: "password",
      title: "Password",
      description: "Last changed 90 days ago",
      icon: <Lock className="h-5 w-5 text-blue-600" />,
      hasAction: true
    },
    {
      id: "login-history",
      title: "Login History",
      description: "View recent activity",
      icon: <History className="h-5 w-5 text-blue-600" />,
      hasAction: true
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
          <span className="text-foreground">Settings</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        </div>

        {/* Custom Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 overflow-x-auto">
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

        {/* Profile Information Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Profile Information</h2>
          </div>
          <div className="bg-white rounded-md p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input 
                type="text" 
                defaultValue="Joe Morgan"
                className="max-w-full rounded-3xl"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Input 
                  type="email" 
                  defaultValue="joe.morgan@recruitco.com"
                  className="max-w-full rounded-3xl pr-10"
                  readOnly
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Title</label>
              <Input 
                type="text" 
                defaultValue="Recruitment Manager"
                className="max-w-full rounded-3xl"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <div className="relative">
                <Input 
                  type="tel" 
                  defaultValue="+1 (888) 123-4567"
                  className="max-w-full rounded-3xl pr-10"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Phone className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <Textarea 
                defaultValue="Experienced recruitment manager with 8+ years in tech hiring. Specialized in engineering and product talent acquisition."
                className="min-h-24 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Preferences</h2>
          </div>
          <div className="bg-white rounded-md">
            {preferencesData.map((preference, index) => (
              <div 
                key={preference.id} 
                className={`flex items-center justify-between p-4 ${
                  index !== preferencesData.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                    {preference.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{preference.title}</div>
                    <div className="text-xs text-gray-500">{preference.description}</div>
                  </div>
                </div>
                {preference.select ? (
                  <div className="flex items-center">
                    <Select defaultValue={preference.selectValue}>
                      <SelectTrigger className="w-24 border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {preference.id === "language" ? (
                          <>
                            <SelectItem value="en-US">English (US)</SelectItem>
                            <SelectItem value="en-GB">English (UK)</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="PT">Pacific Time (UTC-08:00)</SelectItem>
                            <SelectItem value="MT">Mountain Time (UTC-07:00)</SelectItem>
                            <SelectItem value="CT">Central Time (UTC-06:00)</SelectItem>
                            <SelectItem value="ET">Eastern Time (UTC-05:00)</SelectItem>
                            <SelectItem value="UTC">UTC</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                    
                  </div>
                ) : (
                  <Switch 
                    checked={preference.enabled} 
                    onCheckedChange={() => {}}
                    className="data-[state=checked]:bg-blue-600"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Security Section */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Security</h2>
          </div>
          <div className="bg-white rounded-md">
            {securitySettings.map((setting, index) => (
              <div 
                key={setting.id} 
                className={`flex items-center justify-between p-4 ${
                  index !== securitySettings.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center">
                    {setting.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{setting.title}</div>
                    <div className="text-xs text-gray-500">{setting.description}</div>
                  </div>
                </div>
                {setting.id === "two-factor" ? (
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    <Switch 
                      checked={setting.enabled} 
                      onCheckedChange={() => {}}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>
                ) : setting.hasAction ? (
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Switch 
                    checked={setting.enabled} 
                    onCheckedChange={() => {}}
                    className="data-[state=checked]:bg-blue-600"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button
            variant="default"
            className="rounded-3xl   bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Changes
          </Button>
          <Button
            variant="outline"
            className="rounded-3xl text-black hover:bg-blue-700 hover:text-white"
          >
            Cancel
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}

