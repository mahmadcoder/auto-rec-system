"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, FileSignature, Linkedin, ArrowDownToLine, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CreateNew() {
    const [recentExports, setRecentExports] = useState([
        {
            filename: "sofia_Smith_CV_Corporate.pdf/Corporate Template",
            company: "ABC Corp",
            date: "Today, 10:45 AM",
        },
        {
            filename: "mark_Johnson_CV_TechnicalFocus.pdf/Technical Template",
            company: "TechSolutions Inc",
            date: "Yesterday, 3:22 PM",
        },
        {
            filename: "andrew_Brown_CV_Executive.pdf/Executive Template",
            company: "Global Enterprises",
            date: "Oct 12, 2023",
        },
    ]);

    return (
        <DashboardShell>
            <div className="mx-auto space-y-6 p-0 md:p-6">
                {/* Navigation path */}
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                    <Link href="/dashboard" className="hover:text-gray-700">Dashboard</Link>
                    <span>{'>'}</span>
                    <Link href="/cv-reviewer" className="hover:text-gray-700">CV Rebrander</Link>
                    <span>{'>'}</span>
                    <span className="text-gray-700">Create New</span>
                </div>

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">CV Rebrander</h1>
                    <p className="text-sm text-gray-500">Transform candidate CVs with your company branding and formatting</p>
                </div>

                {/* Main Options Cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Upload CV Card */}
                    <Card className="rounded-3xl bg-[#1231AA0D] border-0">
                        <CardContent className="p-6 flex flex-col h-full">
                            <div className="flex flex-col items-start mb-4">
                                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                                    <Upload className="h-4 w-4 text-blue-600" />
                                </div>
                                <h3 className="text-base font-medium">Upload CV</h3>
                            </div>
                            <p className="text-sm text-gray-500 mb-auto">Upload a candidate's CV to begin the rebranding process</p>
                            <Button
                                variant="default"
                                size="sm"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-3xl mt-6"
                            >
                                Upload File
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Recent Templates Card */}
                    <Card className="rounded-3xl bg-[#1231AA0D] border-0">
                        <CardContent className="p-6 flex flex-col h-full">
                            <div className="flex flex-col items-start mb-4">
                                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                </div>
                                <h3 className="text-base font-medium">Recent Templates</h3>
                            </div>
                            <p className="text-sm text-gray-500 mb-auto">Select from your recently used templates</p>
                            <Button
                                variant="default"
                                size="sm"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-3xl mt-6"
                            >
                                Browse All
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Client Branding Card */}
                    <Card className="rounded-3xl bg-[#1231AA0D] border-0">
                        <CardContent className="p-6 flex flex-col h-full">
                            <div className="flex flex-col items-start mb-4">
                                <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                </div>
                                <h3 className="text-base font-medium">Client Branding</h3>
                            </div>
                            <p className="text-sm text-gray-500 mb-auto">Apply your client's branding to the CV</p>
                            <Button
                                variant="default"
                                size="sm"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-3xl mt-6"
                            >
                                Manage Brands
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* CV Preview Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">CV Preview</h2>
                        <Button
                            variant="default"
                            size="sm"
                            className="rounded-3xl bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => window.location.href = '/cv-reviewer/create-new/create-custom'}
                        >
                            Export Options
                        </Button>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Original CV Card */}
                        <Card className="rounded-3xl bg-[#1231AA0D] border-0 overflow-hidden flex flex-col">
                            <div className="p-4">
                                <h3 className="text-xs font-semibold text-black uppercase">ORIGINAL CV</h3>
                                <h4 className="text-lg font-bold text-black">Source Document</h4>
                                <p className="text-xs text-black mb-4">Original CV uploaded by the candidate</p>
                                <div className="flex justify-start space-x-2">
                                    <Button variant="default" size="sm" className="rounded-3xl bg-blue-700 hover:bg-blue-600 text-white text-sm">
                                        Replace
                                    </Button>
                                    <Button variant="secondary" size="sm" className="bg-[#1231AA0D] rounded-3xl text-[#1231AA] text-sm">
                                        Download
                                    </Button>
                                </div>
                            </div>
                            <div className="flex-grow h-64 flex items-center justify-center">
                                {/* This would be the CV preview */}
                            </div>
                        </Card>

                        {/* Rebranded CV Card */}
                        <Card className="rounded-3xl bg-[#1231AA0D] border-0 overflow-hidden flex flex-col">
                            <div className="p-4">
                                <h3 className="text-xs font-semibold text-black uppercase">REBRANDED CV</h3>
                                <h4 className="text-lg font-bold text-black">Corporate Template</h4>
                                <p className="text-xs text-black mb-4">Rebranded CV enhanced with your client's branding</p>
                                <div className="flex justify-start space-x-2">
                                    <Button variant="default" size="sm" className="rounded-3xl bg-blue-700 hover:bg-blue-600 text-white text-sm">
                                        Edit Content
                                    </Button>
                                    <Button variant="secondary" size="sm" className="bg-[#1231AA0D] rounded-3xl text-[#1231AA] text-sm">
                                        Change Template
                                    </Button>
                                </div>
                            </div>
                            <div className="flex-grow h-64 flex items-center justify-center">
                                {/* This would be the rebranded CV preview */}
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Additional Options Section */}
                <div className="pt-4">
                    <h2 className="text-lg font-semibold mb-4">Additional Options</h2>
                    <div className="flex flex-wrap gap-3">
                        <Button variant="outline" size="sm" className="rounded-3xl hover:bg-blue-700 hover:text-white text-black text-sm">
                            Generate Cover Letter
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-3xl hover:bg-blue-700 hover:text-white text-black text-sm">
                            Generate Job Description
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-3xl hover:bg-blue-700 hover:text-white text-black text-sm">
                            Generate LinkedIn Post
                        </Button>
                    </div>
                </div>

                {/* Recent Exports Section */}
                <div className="pt-4">
                    <h2 className="text-lg font-semibold mb-4">Recent Exports</h2>
                    <div className="space-y-2">
                        {recentExports.map((export_, index) => (
                            <div key={index} className="flex items-center justify-between p-3">
                                <div className="flex items-center space-x-3 flex-1">
                                    <FileText className="h-6 w-6 text-black" />
                                    <div>
                                        <p className="text-sm font-medium">{export_.filename}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 min-w-[300px]">
                                    <p className="text-sm text-gray-500 w-32">{export_.company}</p>
                                    <p className="text-sm text-gray-500 w-32">{export_.date}</p>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-white">
                                            <ArrowDownToLine className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-white">
                                            <Share2 className="h-4 w-4" />
                                        </Button>
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