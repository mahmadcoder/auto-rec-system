"use client";

import { useState, useRef, RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BadgeCheck, Briefcase, Calendar, GraduationCap, MapPin } from "lucide-react";

interface ExperienceTabProps {
  onExperienceUpdate?: (experience: any) => void;
}

export default function ExperienceTab({ onExperienceUpdate }: ExperienceTabProps) {
  // Call onExperienceUpdate when experience data changes
  const handleExperienceChange = (experienceData: any) => {
    if (onExperienceUpdate) {
      onExperienceUpdate(experienceData);
    }
  };
  return (
    <div className="space-y-8">
      {/* Work Experience Section */}
      <WorkExperienceSection />
      
      {/* Education Section */}
      <EducationSection />
      
      {/* Certifications Section */}
      <CertificationsSection />
      
      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          className="rounded-3xl text-black hover:bg-blue-700 hover:text-white"
        >
          Previous
        </Button>
        <div className="space-x-4">
          <Button
            variant="outline"
            className="rounded-3xl text-black hover:bg-blue-700 hover:text-white"
          >
            Save & Continue
          </Button>
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

// Work Experience Section Component
function WorkExperienceSection() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  
  const handleCalendarClick = (ref: RefObject<HTMLInputElement | null>) => {
    if (ref.current) {
      ref.current.showPicker();
    }
  };
  
  const addExperience = () => {
    // Add logic to save the experience form data
    setExperiences([...experiences, {}]);
    setShowForm(false);
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Work Experience</h2>
      
      {experiences.length > 0 && (
        <div className="space-y-4">
          {/* Here you would map through experiences and render them */}
        </div>
      )}
      
      {!showForm ? (
        <div className="rounded-3xl bg-[#1231AA0D] border-0 p-6 space-y-2">
          <div className="flex flex-col items-start gap-2">
            <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
              <Briefcase className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="font-medium">Add Work Experience</h3>
          </div>
          <p className="text-sm text-gray-500">Add details about candidate's previous employment</p>
          <Button 
            onClick={() => setShowForm(true)}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl text-sm"
          >
            Add Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="job-title" className="block text-sm font-medium mb-1">Job Title</label>
              <Input
                id="job-title"
                placeholder="e.g. Software Engineer"
                className="rounded-3xl"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1">Company</label>
              <Input
                id="company"
                placeholder="Company name"
                className="rounded-3xl"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium mb-1">Start Date</label>
              <div className="relative">
                <Input
                  ref={startDateRef}
                  id="start-date"
                  type="date"
                  placeholder="MM/YYYY"
                  className="rounded-3xl appearance-none"
                />
                <Calendar 
                  className="h-4 w-4 absolute right-3 top-3 text-black cursor-pointer" 
                  onClick={() => handleCalendarClick(startDateRef)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium mb-1">End Date</label>
              <div className="relative">
                <Input
                  ref={endDateRef}
                  id="end-date"
                  type="date"
                  placeholder="MM/YYYY or Present"
                  className="rounded-3xl"
                />
                <Calendar 
                  className="h-4 w-4 absolute right-3 top-3 text-black cursor-pointer" 
                  onClick={() => handleCalendarClick(endDateRef)}
                />
              </div>
            </div>
          </div>
          
            <label htmlFor="location" className="block text-sm font-medium ">Location</label>
          <div className="relative">
            <Input
              id="location"
              placeholder="e.g. Beverly"
              className="rounded-3xl"
            />
            <MapPin className="h-4 w-4 absolute right-3 top-3 text-black" />
          </div>
          
          <div>
            <label htmlFor="responsibilities" className="block text-sm font-medium mb-1">Responsibilities & Achievements</label>
            <Textarea
              id="responsibilities"
              placeholder="Describe key responsibilities, achievements, and technologies used"
              className="rounded-3xl h-32 resize-none"
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              className="rounded-3xl text-black hover:bg-blue-700 hover:text-white"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={addExperience}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
            >
              Add Experience
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Education Section Component
function EducationSection() {
  const [educations, setEducations] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const eduStartDateRef = useRef<HTMLInputElement>(null);
  const eduEndDateRef = useRef<HTMLInputElement>(null);
  
  const handleCalendarClick = (ref: RefObject<HTMLInputElement | null>) => {
    if (ref.current) {
      ref.current.showPicker();
    }
  };
  
  const addEducation = () => {
    // Add logic to save the education form data
    setEducations([...educations, {}]);
    setShowForm(false);
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Education</h2>
      
      {educations.length > 0 && (
        <div className="space-y-4">
          {/* Here you would map through educations and render them */}
        </div>
      )}
      
      {!showForm ? (
        <div className="rounded-3xl bg-[#1231AA0D] border-0 p-6 space-y-2">
          <div className="flex flex-col items-start gap-2">
            <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
              <GraduationCap className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="font-medium">Add Education</h3>
          </div>
          <p className="text-sm text-gray-500">Add details about candidate's educational background</p>
          <Button 
            onClick={() => setShowForm(true)}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl text-sm"
          >
            Add Education
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="degree" className="block text-sm font-medium mb-1">Degree</label>
              <Input
                id="degree"
                placeholder="e.g. Bachelor of Science"
                className="rounded-3xl"
              />
            </div>
            <div>
              <label htmlFor="field-of-study" className="block text-sm font-medium mb-1">Field of Study</label>
              <Input
                id="field-of-study"
                placeholder="e.g. Computer Science"
                className="rounded-3xl"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="institution" className="block text-sm font-medium mb-1">Institution</label>
            <Input
              id="institution"
              placeholder="University or school name"
              className="rounded-3xl"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="edu-start-date" className="block text-sm font-medium mb-1">Start Date</label>
              <div className="relative">
                <Input
                  ref={eduStartDateRef}
                  id="edu-start-date"
                  type="date"
                  placeholder="MM/YYYY"
                  className="rounded-3xl"
                />
                <Calendar 
                  className="h-4 w-4 absolute right-3 top-3 text-black cursor-pointer" 
                  onClick={() => handleCalendarClick(eduStartDateRef)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="edu-end-date" className="block text-sm font-medium mb-1">End Date</label>
              <div className="relative">
                <Input
                  ref={eduEndDateRef}
                  id="edu-end-date"
                  type="date"
                  placeholder="MM/YYYY or Present"
                  className="rounded-3xl"
                />
                <Calendar 
                  className="h-4 w-4 absolute right-3 top-3 text-black cursor-pointer" 
                  onClick={() => handleCalendarClick(eduEndDateRef)}
                />
              </div>
            </div>
          </div>
          
            <label htmlFor="edu-location" className="block text-sm font-medium mb-1">Location</label>
          <div className="relative">
            <Input
              id="edu-location"
              placeholder="e.g. Beverly"
              className="rounded-3xl"
            />
            <MapPin className="h-4 w-4 absolute right-3 top-3 text-black" />
          </div>
          
          <div>
            <label htmlFor="additional-info" className="block text-sm font-medium mb-1">Additional Information</label>
            <Textarea
              id="additional-info"
              placeholder="GPA, honors, relevant coursework, etc."
              className="rounded-3xl h-32 resize-none"
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              className="rounded-3xl text-black hover:bg-blue-700 hover:text-white"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={addEducation}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
            >
              Add Education
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Certifications Section Component
function CertificationsSection() {
  const [certifications, setCertifications] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  
  const addCertification = () => {
    // Add logic to save the certification form data
    setCertifications([...certifications, {}]);
    setShowForm(false);
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Certifications</h2>
      
      {certifications.length > 0 && (
        <div className="space-y-4">
          {/* Here you would map through certifications and render them */}
        </div>
      )}
      
      {!showForm ? (
        <div className="rounded-3xl bg-[#1231AA0D] border-0 p-6 space-y-2">
          <div className="flex flex-col items-start gap-2">
            <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
              <BadgeCheck className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="font-medium">Add Certification</h3>
          </div>
          <p className="text-sm text-gray-500">Add details about candidate's professional certifications</p>
          <Button 
            onClick={() => setShowForm(true)}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl text-sm"
          >
            Add Certification
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <label htmlFor="certification-name" className="block text-sm font-medium mb-1">Certification Name</label>
            <Input
              id="certification-name"
              placeholder="e.g. AWS Certified Solutions Architect"
              className="rounded-3xl"
            />
          </div>
          
          <div>
            <label htmlFor="issuing-org" className="block text-sm font-medium mb-1">Issuing Organization</label>
            <Input
              id="issuing-org"
              placeholder="e.g. Amazon Web Services"
              className="rounded-3xl"
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              className="rounded-3xl text-black hover:bg-blue-700 hover:text-white"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={addCertification}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
            >
              Add Certification
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}