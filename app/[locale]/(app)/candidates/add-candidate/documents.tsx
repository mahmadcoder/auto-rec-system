"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, File as FileIcon, FileText, Trash2, Download, Folder, BadgeCheck } from "lucide-react";

export default function DocumentsTab() {
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [additionalDocs, setAdditionalDocs] = useState<{file: File, type: string}[]>([
    // Sample data for display purposes
    { 
      file: { name: "Portfolio_John_Smith.pdf", size: 2300000, lastModified: new Date("2023-05-10").getTime() } as File,
      type: "portfolio"
    },
    { 
      file: { name: "Certificate_Smith.pdf", size: 1200000, lastModified: new Date("2023-05-15").getTime() } as File,
      type: "certificate"
    }
  ]);
  const [notes, setNotes] = useState("");
  
  // Handle resume upload
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };
  
  // Handle cover letter upload
  const handleCoverLetterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverLetter(e.target.files[0]);
    }
  };
  
  // Handle additional documents upload
  const handleAdditionalDocsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => {
        // Check if filename contains certificate or cert
        const isCertificate = file.name.toLowerCase().includes('certificate') || 
                              file.name.toLowerCase().includes('cert');
        return {
          file: file,
          type: isCertificate ? 'certificate' : 'portfolio'
        };
      });
      setAdditionalDocs([...additionalDocs, ...newFiles]);
    }
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Format date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()}`;
  };

  // Remove resume
  const removeResume = () => {
    setResume(null);
  };

  // Remove cover letter
  const removeCoverLetter = () => {
    setCoverLetter(null);
  };

  // Remove additional document
  const removeAdditionalDoc = (index: number) => {
    const updatedDocs = [...additionalDocs];
    updatedDocs.splice(index, 1);
    setAdditionalDocs(updatedDocs);
  };
  
  return (
    <div className="space-y-8">
      {/* Resume/CV Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Resume/CV</h2>
        
        {!resume ? (
          <div className="rounded-3xl bg-[#1231AA0D] border-0 p-6">
            <div className="flex flex-col items-start gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                <Upload className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="font-medium">Upload Resume</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">Upload candidate's resume (PDF, DOC, DOCX, RTF)</p>
            
            <div className="flex">
              <label htmlFor="resume-upload" className="cursor-pointer">
                <div className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl px-4 py-2 text-sm flex items-center">
                  Upload File
                </div>
                <input 
                  id="resume-upload" 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.doc,.docx,.rtf"
                  onChange={handleResumeUpload}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex items-center justify-between ">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{resume.name}</p>
                <p className="text-xs text-gray-500">Uploaded on {formatDate(resume.lastModified)} • {formatFileSize(resume.size)}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-black hover:text-gray-600">
                <Download className="h-5 w-5" />
              </button>
              <button className="text-black hover:text-gray-600" onClick={removeResume}>
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Cover Letter Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Cover Letter</h2>
        
        {!coverLetter ? (
          <div className="rounded-3xl bg-[#1231AA0D] border-0 p-6">
            <div className="flex flex-col items-start gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="font-medium">Upload Cover Letter</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">Upload candidate's cover letter (PDF, DOC, DOCX)</p>
            
            <div className="flex">
              <label htmlFor="cover-letter-upload" className="cursor-pointer">
                <div className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl px-4 py-2 text-sm flex items-center">
                  Upload File
                </div>
                <input 
                  id="cover-letter-upload" 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.doc,.docx"
                  onChange={handleCoverLetterUpload}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex items-center justify-between p-3 ">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{coverLetter.name}</p>
                <p className="text-xs text-gray-500">Uploaded on {formatDate(coverLetter.lastModified)} • {formatFileSize(coverLetter.size)}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-black hover:text-gray-600">
                <Download className="h-5 w-5" />
              </button>
              <button className="text-black hover:text-gray-600" onClick={removeCoverLetter}>
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Additional Documents Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Additional Documents</h2>
        
        <div className="rounded-3xl bg-[#1231AA0D] border-0 p-6">
          <div className="flex flex-col items-start gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
              <Folder className="h-4 w-4 text-blue-600" />
            </div>
            <h3 className="font-medium">Upload Additional Documents</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">Upload portfolios, certificates, or other relevant documents</p>
          
          <div className="flex">
            <label htmlFor="additional-docs-upload" className="cursor-pointer">
              <div className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl px-4 py-2 text-sm flex items-center">
                Upload File
              </div>
              <input 
                id="additional-docs-upload" 
                type="file" 
                className="hidden" 
                accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.png,.zip"
                onChange={handleAdditionalDocsUpload}
                multiple
              />
            </label>
          </div>
        </div>
        
        {/* Display uploaded additional documents */}
        {additionalDocs.length > 0 && (
          <div className="mt-4 space-y-3">
            {additionalDocs.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center">
                    {doc.type === 'certificate' ? (
                      <BadgeCheck className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Folder className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{doc.file.name}</p>
                    <p className="text-xs text-gray-500">Uploaded on {formatDate(doc.file.lastModified)} • {formatFileSize(doc.file.size)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-black hover:text-gray-600">
                    <Download className="h-5 w-5" />
                  </button>
                  <button 
                    className="text-black hover:text-gray-600"
                    onClick={() => removeAdditionalDoc(index)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Document Notes Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Document Notes</h2>
        
        <div>
          <label htmlFor="doc-notes" className="block text-sm font-medium mb-1">Notes</label>
          <Textarea
            id="doc-notes"
            placeholder="Add any notes about the candidate's documents"
            className="rounded-3xl resize-none"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          className="rounded-3xl text-black hover:bg-blue-600 hover:text-white"
        >
          Previous
        </Button>
        <div className="space-x-4">
          <Button
            variant="outline"
            className="rounded-3xl text-black hover:bg-blue-600 hover:text-white"
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