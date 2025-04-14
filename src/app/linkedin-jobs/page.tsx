"use client";

import React from 'react';
import Link from 'next/link';
import { Search, Plus, ChevronRight, Edit2, Trash2, RefreshCw, FileText, Award, Briefcase } from 'lucide-react';

interface JobPosting {
  id: number;
  title: string;
  postedTime: string;
  views: number;
  applicants: number;
}

const LinkedInJobBoard: React.FC = () => {
  const activeJobPostings: JobPosting[] = [
    { id: 1, title: 'Senior Software Engineer', postedTime: 'Posted 2 days ago', views: 75, applicants: 8 },
    { id: 2, title: 'Product Manager', postedTime: 'Posted 5 days ago', views: 28, applicants: 12 },
    { id: 3, title: 'UX Designer', postedTime: 'Posted 1 week ago', views: 105, applicants: 16 },
    { id: 4, title: 'Marketing Specialist', postedTime: 'Posted 1 week ago', views: 64, applicants: 9 },
    { id: 5, title: 'Data Analyst', postedTime: 'Posted 2 weeks ago', views: 83, applicants: 14 },
  ];

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="flex items-center text-sm text-muted-foreground mb-2">
        <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/jobs" className="hover:text-blue-600">Jobs</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/job-boards" className="hover:text-blue-600">Job Boards</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground">LinkedIn</span>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-foreground">LinkedIn Job Board Management</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center mr-2">
              <Briefcase className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">ACTIVE JOB PAGES</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">12</span>
            <button className="px-3 py-1 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700">View All</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center mr-2">
              <Award className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">TOTAL APPLICANTS</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">87</span>
            <button className="px-3 py-1 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700">View Candidates</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center mr-2">
              <RefreshCw className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">MANAGEMENT RATE</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">22%</span>
            <button className="px-3 py-1 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700">View Analytics</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center mr-2">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">MONTHLY SPEND</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">$1,250</span>
            <button className="px-3 py-1 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700">Manage Budget</button>
          </div>
        </div>
      </div>

      {/* Search and Create Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search postings..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Create New Posting
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button className="border-blue-500 text-blue-600 whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm">
              All Postings
            </button>
            <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-3 px-1 border-b font-medium text-sm">
              Active
            </button>
            <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-3 px-1 border-b font-medium text-sm">
              Paused
            </button>
            <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-3 px-1 border-b font-medium text-sm">
              Expired
            </button>
            <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-3 px-1 border-b font-medium text-sm">
              Drafts
            </button>
          </nav>
        </div>
      </div>

      {/* Active LinkedIn Postings */}
      <h2 className="text-lg font-semibold mb-4">Active LinkedIn Postings</h2>
      <div className="bg-white shadow-sm rounded-lg mb-8">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {activeJobPostings.map((job) => (
              <tr key={job.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <Briefcase className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{job.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.postedTime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.views} views</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.applicants} applicants</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <button className="text-gray-500 hover:text-blue-600">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="text-gray-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LinkedInJobBoard; 