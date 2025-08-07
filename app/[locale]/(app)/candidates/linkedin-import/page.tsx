"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Info, CheckCircle, User, Link2, Users, UserRoundSearch, ShieldCheck, ShieldAlert, Clock4, FileText, MoreHorizontal, Eye, EyeOff, MoreVertical, Sparkles, FolderClosed } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function LinkedInImportPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [consentManagement, setConsentManagement] = useState(false);
  const [dataRetention, setDataRetention] = useState(false);
  const [privacyNotice, setPrivacyNotice] = useState(false);
  const [autoCategorizeBySills, setAutoCategorizeBySills] = useState(false);
  const [defaultPool, setDefaultPool] = useState("");
  const [eyeStates, setEyeStates] = useState<{[key: number]: boolean}>({});

  // Recent imports data
  const recentImports = [
    {
      name: "Michael Johnson",
      position: "DevOps Engineer",
      importDate: "Imported today",
      pool: "DevOps pool",
      avatar: "MJ"
    },
    {
      name: "Emily Wilson",
      position: "Frontend Developer",
      importDate: "Imported today",
      pool: "Frontend pool",
      avatar: "EW"
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Initialize eye states for all imports
    const initialEyeStates: {[key: number]: boolean} = {};
    recentImports.forEach((_, index) => {
      initialEyeStates[index] = true; // true means eye is open
    });
    setEyeStates(initialEyeStates);
  }, []);

  const toggleEye = (index: number) => {
    setEyeStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <DashboardShell>
      <div className="mx-auto space-y-6 p-0 md:p-6">
        {/* Navigation path */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
          <Link href="/dashboard" className="hover:text-gray-700">Dashboard</Link>
          <span>{'>'}</span>
          <Link href="/candidates" className="hover:text-gray-700">Candidates</Link>
          <span>{'>'}</span>
          <span className="text-gray-700">LinkedIn Import</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">LinkedIn Import</h1>
        </div>

        {/* Connect to LinkedIn Card */}
        <Card className="rounded-3xl bg-[#1231AA0D] border-0">
          <CardContent className="p-6">
            <div className="flex flex-col items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                <Link2 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">Connect to LinkedIn</h3>
                <p className="text-sm text-gray-600 mb-4">Import candidate profiles from LinkedIn using SCRM compliance</p>
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-3xl bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Authorize Connection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Import Options */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Import Options</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Search */}
            <Card className="rounded-3xl bg-[#1231AA0D] border-0">
              <CardContent className="p-6">
                <div className="flex flex-col items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                    <UserRoundSearch className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1">Profile Search</h3>
                    <p className="text-sm text-gray-600 mb-4">Search and import specific LinkedIn profiles directly</p>
                    <Button
                      variant="default"
                      size="sm"
                      className="rounded-3xl bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Search Profiles
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connection List */}
            <Card className="rounded-3xl bg-[#1231AA0D] border-0">
              <CardContent className="p-6">
                <div className="flex flex-col items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1">Connection List</h3>
                    <p className="text-sm text-gray-600 mb-4">Import from your LinkedIn connections</p>
                    <Button
                      variant="default"
                      size="sm"
                      className="rounded-3xl bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      View Connections
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* GDPR Compliance */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">GDPR Compliance</h2>
          </div>
          
          <Card className="rounded-xl shadow-sm border-0">
            <CardContent className="p-6 space-y-4">
              {/* Consent Management */}
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                    <ShieldCheck className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Consent Management</h4>
                    <p className="text-xs text-gray-600">Automatically request candidate consent during import</p>
                  </div>
                </div>
                <Switch
                  checked={consentManagement}
                  onCheckedChange={setConsentManagement}
                />
              </div>

              {/* Data Retention Policy */}
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                    <Clock4 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Data Retention Policy</h4>
                    <p className="text-xs text-gray-600">Delete imported data after 6 months of inactivity</p>
                  </div>
                </div>
                <Switch
                  checked={dataRetention}
                  onCheckedChange={setDataRetention}
                />
              </div>

              {/* Privacy Notice */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                    <ShieldAlert className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Privacy Notice</h4>
                    <p className="text-xs text-gray-600">Send automated privacy notice to newly imported candidates</p>
                  </div>
                </div>
                <Switch
                  checked={privacyNotice}
                  onCheckedChange={setPrivacyNotice}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pool Assignment */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Pool Assignment</h2>
          </div>
          
          <Card className="rounded-xl shadow-sm border-0">
            <CardContent className="p-6 space-y-4">
              {/* Default Pool - Updated with input field */}
              <div className="flex flex-col space-y-2">
                <h4 className="text-sm font-medium">Default Pool for Imported Candidates</h4>
                <div className="relative">
                  <Input 
                    placeholder="Select pool or leave empty" 
                    className="pr-10 rounded-3xl"
                    value={defaultPool}
                    onChange={(e) => setDefaultPool(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FolderClosed className="h-4 w-4 text-black fill-black" />
                  </div>
                </div>
              </div>

              {/* Auto-categorize by Skills - Updated layout */}
              <div className="flex items-center justify-between py-3 mt-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Auto-categorize by Skills</h4>
                    <p className="text-xs text-gray-600">Automatically assign candidates to pools based on skills</p>
                  </div>
                </div>
                <Switch
                  checked={autoCategorizeBySills}
                  onCheckedChange={setAutoCategorizeBySills}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Imports - Updated to have all items in a row */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Recent Imports</h2>
          </div>
          
          <Card className="rounded-xl shadow-sm border-0">
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentImports.map((person, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 bg-blue-100 text-blue-700">
                        <AvatarFallback>{person.avatar}</AvatarFallback>
                      </Avatar>
                      <h4 className="text-sm font-medium w-32">{person.name}</h4>
                      <p className="text-xs text-gray-600 w-32">{person.position}</p>
                    </div>
                    <div className="text-xs text-gray-600">
                      {person.importDate}
                    </div>
                    <div>
                      <span className="text-xs">
                        Added to {person.pool}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:text-white"
                        onClick={() => toggleEye(index)}
                      >
                        {eyeStates[index] ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            size="sm"
            className="rounded-3xl flex items-center gap-2 hover:bg-blue-600 hover:text-white text-blue-600"
            asChild
          >
            <Link href="/candidates">
              <ArrowLeft className="h-4 w-4" />
              Back to Candidates
            </Link>
          </Button>
          
          <Button
            variant="default"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
          >
            Import History
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}