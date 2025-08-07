"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Circle, Upload, FileText, ArrowDownToLine, ArrowUpFromLine, Send } from "lucide-react";

// Tab items for the process
const tabItems = [
    { id: "upload", label: "Upload" },
    { id: "parse-data", label: "Parse Data" },
    { id: "apply-template", label: "Apply Template" },
    { id: "preview", label: "Preview" }
];

export default function ProcessCV() {
    const [activeTab, setActiveTab] = useState("preview");

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
                    <span className="text-foreground">Process CV</span>
                </div>

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">Process CV</h1>
                    <p className="text-sm text-gray-500">Review and finalize your CV template</p>
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

                {/* Content based on active tab */}
                {activeTab === "preview" && (
                    <div className="mt-6 space-y-6">
                        {/* Export Button */}
                        <div className="flex justify-end">
                            <Button 
                                variant="default"
                                size="lg"
                                className="rounded-3xl bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                <ArrowDownToLine className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                        </div>
                        {/* CV Preview Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* Template 1 */}
                            <Card className="rounded-lg overflow-hidden">
                                <div className="aspect-[3/4] bg-[#1231AA0D] p-4">
                                    <img 
                                        src="/template1-preview.png" 
                                        alt="CV Template 1" 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </Card>

                            {/* Template 2 */}
                            <Card className="rounded-lg overflow-hidden">
                                <div className="aspect-[3/4] bg-[#1231AA0D] p-4">
                                    <img 
                                        src="/template2-preview.png" 
                                        alt="CV Template 2" 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </Card>
                        </div>

                        {/* How it works section */}
                        <div className="mt-12 space-y-8">
                            <h2 className="text-3xl font-bold text-center">How it works?</h2>
                            <div className="flex items-center justify-between max-w-4xl mx-auto">
                                <div className="flex flex-col items-center">
                                    <Button 
                                        variant="default"
                                        className="bg-blue-600 text-white rounded-3xl px-8 py-2 mb-4"
                                    >
                                        <ArrowUpFromLine className="h-4 w-4 " />
                                        Upload
                                    </Button>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Button 
                                        variant="default"
                                        className="bg-blue-600 text-white rounded-3xl px-8 py-2 mb-4"
                                    >
                                        AI Creates stunning content
                                    </Button>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Button 
                                        variant="default"
                                        className="bg-blue-600 text-white rounded-3xl px-8 py-2 mb-4"
                                    >
                                        <span className="flex items-center">
                                            <Send className="h-4 w-4 mr-2" />
                                            Sent to your client
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                )}
            </div>
        </DashboardShell>
    );
} 