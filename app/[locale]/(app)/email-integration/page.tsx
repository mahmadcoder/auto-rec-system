"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  EyeOff, 
  Eye, 
  ChevronRight,
  Mail,
  User,
  Lock,
  Send,
  Shield,
  Clock,
  AlertCircle,
  RefreshCw,
  Circle,
  Link2Off,
  Users,
  ShieldCheck
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EmailIntegrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [smtpPassword, setSmtpPassword] = useState("••••••••••••");
  const [useTLS, setUseTLS] = useState(true);
  const [spfEnabled, setSpfEnabled] = useState(true);
  const [dkimEnabled, setDkimEnabled] = useState(true);
  const [dmarcEnabled, setDmarcEnabled] = useState(true);
  const [unsubscribeEnabled, setUnsubscribeEnabled] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");


  const tabItems = [
    { id: "smtp", label: "SMTP Configuration" },
    { id: "email-temp", label: "Email Templates" },
    { id: "delivery-reports", label: "Delivery Reports" },
  ];


  return (
    <DashboardShell>
      <div className="mx-auto space-y-6 p-0 md:p-6 max-w-4xl">
        {/* Breadcrumb navigation */}
        <div className="flex items-center text-sm font-medium">
          <Link href="/tools" className="text-gray-500 hover:text-gray-700">
            Tools
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900">Email Integration</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Email Integration</h1>
          <p className="text-sm text-gray-500 mt-1">Configure email settings to ensure reliable delivery of recruitment communications.</p>
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

        {/* SMTP Server Configuration Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">SMTP Server Configuration</h2>
            <p className="text-sm text-gray-500 mt-1">Configure SMTP settings to ensure emails are delivered properly and not marked as spam.</p>
          </div>

          <div className=" ">
            <div className="space-y-2">
              <label className="text-sm font-medium">SMTP Server</label>
              <div className="relative">
                <Input 
                  type="text" 
                  defaultValue="smtp.companyserver.com"
                  className="pr-10 rounded-3xl"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Button variant="ghost" className="h-7 w-7 p-0" onClick={() => {}}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Port</label>
              <div className="relative">
                <Select defaultValue="587">
                  <SelectTrigger className="w-full rounded-3xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25 (SMTP)</SelectItem>
                    <SelectItem value="587">587 (TLS)</SelectItem>
                    <SelectItem value="465">465 (SSL)</SelectItem>
                  </SelectContent>
                </Select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <div className="relative">
                <Input 
                  type="text" 
                  defaultValue="your_email@companyname.com"
                  className="pr-10 rounded-3xl"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  value={smtpPassword}
                  onChange={(e) => setSmtpPassword(e.target.value)}
                  className="pr-10 rounded-3xl"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Button 
                    variant="ghost" 
                    className="h-7 w-7 p-0" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-4">
  <div className="flex items-center space-x-3">
    <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center">
      <ShieldCheck className="h-5 w-5 text-blue-600" />
    </div>
    <div>
      <div className="text-sm font-medium">Use SSL/TLS</div>
      <div className="text-xs text-gray-500">Secure connection to SMTP server</div>
    </div>
  </div>
  <Switch 
    id="use-tls" 
    checked={useTLS}
    onCheckedChange={setUseTLS}
    className="data-[state=checked]:bg-blue-600"
  />
</div>
          </div>
        </div>
        
        {/* Sender Information Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Sender Information</h2>
          <div className="">
            <div className="space-y-2 pb-2">
              <label className="text-sm font-medium">From Name</label>
              <div className="relative">
                <Input 
                  type="text" 
                  defaultValue="RecruitPro Team"
                  className="pr-10 rounded-3xl"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2 pb-2">
              <label className="text-sm font-medium pt-2">From Email</label>
              <div className="relative">
                <Input 
                  type="email" 
                  defaultValue="no-reply@companyname.com"
                  className="pr-10 rounded-3xl"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Reply-To Email</label>
              <div className="relative">
                <Input 
                  type="email" 
                  defaultValue="support@companyname.com"
                  className="pr-10 rounded-3xl"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Send className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Anti-Spam Compliance Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Anti-Spam Compliance</h2>
          <div className="">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">SPF Record</div>
                  <div className="text-xs text-gray-500">Domain Policy Framework verification</div>
                </div>
              </div>
              <Switch 
                checked={spfEnabled}
                onCheckedChange={setSpfEnabled}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">DKIM Authentication</div>
                  <div className="text-xs text-gray-500">DomainKeys Identified Mail signature</div>
                </div>
              </div>
              <Switch 
                checked={dkimEnabled}
                onCheckedChange={setDkimEnabled}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">DMARC Policy</div>
                  <div className="text-xs text-gray-500">Domain-based Message Authentication</div>
                </div>
              </div>
              <Switch 
                checked={dmarcEnabled}
                onCheckedChange={setDmarcEnabled}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Bulk Email Settings Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Bulk Email Settings</h2>
          <div className="">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Batch Size</div>
                  <div className="text-xs text-gray-500">Maximum emails per email batch</div>
                </div>
              </div>
              <div className="w-32">
                <Select defaultValue="50">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="200">200</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Sending Interval</div>
                  <div className="text-xs text-gray-500">Time between email batches</div>
                </div>
              </div>
              <div className="w-32">
                <Select defaultValue="5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 minute</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                  <Link2Off className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Unsubscribe Link</div>
                  <div className="text-xs text-gray-500">Include opt-out option in all emails</div>
                </div>
              </div>
              <Switch 
                checked={unsubscribeEnabled}
                onCheckedChange={setUnsubscribeEnabled}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Email Testing Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Email Testing</h2>
          <div className="">
            <div className="space-y-2">
              <label className="text-sm font-medium">Test Email Address</label>
              <div className="relative">
                <Input 
                  type="email" 
                  defaultValue="your_email@gmail.com"
                  className="pr-10 rounded-3xl"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl">
                Send Test Email
              </Button>
              <Button 
                variant="outline" 
                className="text-black hover:bg-blue-700 hover:text-white rounded-3xl"
              >
                Run Spam Check
              </Button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
          >
            Save Configuration
          </Button>
          <Button
            variant="outline"
            className="text-black hover:bg-blue-700 hover:text-white rounded-3xl"
          >
            Cancel
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}