'use client';

import { useState } from 'react';
import {
    ArrowUpRightIcon,
    BellIcon,
    ChartBarIcon,
    CheckIcon,
    ClockIcon,
    MailIcon,
    EyeIcon,
    MousePointerClickIcon,
    MoreVerticalIcon,
    RotateCwIcon,
    TrashIcon,
    Circle,
    LineChartIcon,
    DownloadIcon,
    TrendingUpIcon,
    TrendingDownIcon,
    AlertCircleIcon,
    ChartNoAxesColumn,
    ChevronDownIcon,
} from 'lucide-react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';


interface DeliveryMetric {
    label: string;
    value: number;
    icon: React.ReactNode;
}

interface Campaign {
    name: string;
    sentDate: string;
    recipients: number;
}

interface TemplateStats {
    name: string;
    openRate: number;
    clickRate: number;
}

interface DeliveryIssue {
    email: string;
    type: string;
    date: string;
}

// Navigation tabs data
const tabItems = [
    { id: "smtp", label: "SMTP Configuration", href: "/email-integration" },
    { id: "templates", label: "Email Templates", href: "/email-integration/email-templates" },
    { id: "reports", label: "Delivery Reports", href: "/email-integration/delivery-reports" }
];

export default function DeliveryReports() {
    const router = useRouter();
    const [reportFrequency, setReportFrequency] = useState('weekly');
    const [bounceHandling, setBounceHandling] = useState(true);
    const [deliveryNotifications, setDeliveryNotifications] = useState(true);
    const [activeTab, setActiveTab] = useState("reports");

    const metrics: DeliveryMetric[] = [
        { label: 'Sent', value: 1248, icon: <MailIcon className="h-6 w-6 text-blue-600" /> },
        { label: 'Delivered', value: 1203, icon: <CheckIcon className="h-6 w-6 text-blue-600" /> },
        { label: 'Opened', value: 876, icon: <EyeIcon className="h-6 w-6 text-blue-600" /> },
        { label: 'Clicked', value: 342, icon: <MousePointerClickIcon className="h-6 w-6 text-blue-600" /> },
        { label: 'Bounced', value: 45, icon: <ClockIcon className="h-6 w-6 text-blue-600" /> },
    ];

    const campaigns: Campaign[] = [
        { name: 'Weekly Job Alerts', sentDate: 'May 15, 2023', recipients: 342 },
        { name: 'Interview Invitations', sentDate: 'May 12, 2023', recipients: 28 },
        { name: 'Candidate Follow-ups', sentDate: 'May 10, 2023', recipients: 156 },
        { name: 'Client Updates', sentDate: 'May 8, 2023', recipients: 24 },
    ];

    const templates: TemplateStats[] = [
        { name: 'Interview Invitation', openRate: 92, clickRate: 78 },
        { name: 'Application Acknowledgment', openRate: 87, clickRate: 42 },
        { name: 'Job Offer', openRate: 98, clickRate: 95 },
        { name: 'Rejection - After Interview', openRate: 76, clickRate: 12 },
    ];

    const deliveryIssues: DeliveryIssue[] = [
        { email: 'john.doe@example.com', type: 'Hard bounce', date: 'May 15, 2023' },
        { email: 'sarah.smith@company.net', type: 'Soft bounce', date: 'May 14, 2023' },
        { email: 'mike.jones@domain.org', type: 'Spam complaint', date: 'May 12, 2023' },
    ];

    const handleTabClick = (tabId: string, href: string) => {
        setActiveTab(tabId);
        router.push(href);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">

            {/* Navigation path */}
            <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                <Link href="/dashboard" className="hover:text-gray-700">Dashboard</Link>
                <span>{'>'}</span>
                <Link href="/email-integration" className="hover:text-gray-700">Email Integration</Link>
                <span>{'>'}</span>
                <span className="text-gray-700">Delivery Reports</span>
            </div>

            {/* Header */}
            <div className="mb-6 mt-6">
                <h1 className="text-2xl font-bold mb-2">Email Integration</h1>
                <p className="text-gray-500">Track email delivery performance and engagement metrics</p>
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

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Delivery Overview</h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition">
                    Export Report
                </button>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {metrics.map((metric) => (
                    <div key={metric.label} className="rounded-3xl bg-[#1231AA0D] border-0 p-6">
                        <div className="flex flex-col items-start">
                            <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                                {metric.icon}
                            </div>
                            <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
                            <div className="text-xl font-semibold">{metric.value.toLocaleString()}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Campaigns */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Recent Campaigns</h2>
                <div className="divide-y">
                    {campaigns.map((campaign, index) => (
                        <div
                            key={campaign.name}
                            className="flex items-center justify-between py-5"
                        >
                            <div className="flex items-center space-x-3 w-1/4">
                                <MailIcon className="w-5 h-5 text-black" />
                                <span className="font-medium">{campaign.name}</span>
                            </div>
                            <div className="col-span-3 text-sm text-gray-500">
                                Sent: {campaign.sentDate}
                            </div>
                            <div className="col-span-3 text-sm text-gray-500">
                                Recipients: {campaign.recipients}
                            </div>

                            <div className="flex items-center justify-end space-x-4 w-20">
                                <ChartNoAxesColumn className="w-5 h-5 text-black " />
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                                <DownloadIcon className="w-5 h-5  cursor-pointer" />
                  </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Template Performance */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Template Performance</h2>
                <div className="divide-y">
                    {templates.map((template, index) => (
                        <div
                            key={template.name}
                            className="flex items-center justify-between py-5"
                        >
                            <div className="flex items-center space-x-3 w-1/4">
                                <MailIcon className="w-5 h-5 text-black" />
                                <span className="font-medium">{template.name}</span>
                            </div>
                            <div className="col-span-3 text-sm text-gray-500">
                                    Open Rate: {template.openRate}
                                </div>
                                <div className="col-span-3 text-sm text-gray-500">
                                    Click Rate: {template.clickRate}
                                </div>
                            <div className="flex items-center justify-end space-x-4 w-20">
                                {index % 2 === 0 ? (
                                    <TrendingUpIcon className="w-5 h-5 text-black" />
                                ) : (
                                    <TrendingDownIcon className="w-5 h-5 text-black" />
                                )}
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                                    <MoreVerticalIcon className="w-5 h-5 cursor-pointer" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>  

            {/* Delivery Issues */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Delivery Issues</h2>
                <div className="divide-y">
                    {deliveryIssues.map((issue, index) => (
                        <div
                            key={issue.email}
                            className="flex items-center justify-between py-5"
                        >
                            <div className="flex items-center space-x-3 w-1/4">
                                <AlertCircleIcon className="w-5 h-5 text-black" />
                                <span className="font-medium">{issue.email}</span>
                            </div>
                            <div className="col-span-3 text-sm text-gray-500"> {issue.type}
                            </div>
                            <div className="col-span-3 text-sm text-gray-500">
                                {issue.date}
                            </div>
                            <div className="flex items-center justify-end space-x-4 w-20">
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                                    <RotateCwIcon className="w-5 h-5 cursor-pointer" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                                    <TrashIcon className="w-5 h-5 cursor-pointer" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Delivery Settings */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Delivery Settings</h2>
                <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                            <div className='h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center'>
                                <RotateCwIcon className="w-5 h-5 text-black" />
                            </div>
                            <div>
                                <div className="font-medium">Bounce Handling</div>
                                <div className="text-sm text-gray-600">Automatically remove after 3 hard bounces</div>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={bounceHandling}
                                onChange={(e) => setBounceHandling(e.target.checked)}
                            />
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                            <div className='h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center'>
                                <BellIcon className="w-5 h-5 text-black" />
                            </div>
                            <div>
                                <div className="font-medium">Delivery Notifications</div>
                                <div className="text-sm text-gray-600">Get alerts for delivery issues</div>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={deliveryNotifications}
                                onChange={(e) => setDeliveryNotifications(e.target.checked)}
                            />
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                            <div className='h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center'>
                                <ClockIcon className="w-5 h-5 text-black" />
                            </div>
                            <div>
                                <div className="font-medium">Report Frequency</div>
                                <div className="text-sm text-gray-600">How often to generate reports</div>
                            </div>
                        </div>
                        <div className="relative">
                            <select
                                value={reportFrequency}
                                onChange={(e) => setReportFrequency(e.target.value)}
                                className="appearance-none bg-transparent border border-gray-300 rounded-3xl py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-blue-500"
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}