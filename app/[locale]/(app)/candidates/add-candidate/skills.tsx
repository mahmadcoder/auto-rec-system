"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Check, 
  Edit, 
  Plus, 
  Search, 
  Trash2, 
  Code, 
  Brain, 
  Globe, 
  Star, 
  SquareCode, 
  Wrench, 
  TableOfContents,
  MessageSquareText,
  Users,
  Lightbulb,
  Languages
} from "lucide-react";

export default function SkillsTab() {
  return (
    <div className="space-y-8">
      {/* Technical Skills Section */}
      <TechnicalSkillsSection />
      
      {/* Soft Skills Section */}
      <SoftSkillsSection />
      
      {/* Languages Section */}
      <LanguagesSection />
      
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

// Technical Skills Section Component
function TechnicalSkillsSection() {
  const [programmingLanguages, setProgrammingLanguages] = useState<string>("JavaScript, Python, Java");
  const [frameworks, setFrameworks] = useState<string>("React, Angular, Django");
  const [tools, setTools] = useState<string>("Docker, Git");
  const [databases, setDatabases] = useState<string>("MySQL, MongoDB, PostgreSQL");
  
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Technical Skills</h2>
      
      {/* Programming Languages */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Programming Languages</h3>
        <div className="relative">
          <Input
            value={programmingLanguages}
            onChange={(e) => setProgrammingLanguages(e.target.value)}
            placeholder="e.g. JavaScript, Python, Java"
            className="rounded-3xl pl-4 pr-10"
          />
          <Code className="h-5 w-5 absolute right-3 top-2.5 text-black" />
        </div>
      </div>
      
      {/* Frameworks & Libraries */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Frameworks & Libraries</h3>
        <div className="relative">
          <Input
            value={frameworks}
            onChange={(e) => setFrameworks(e.target.value)}
            placeholder="e.g. React, Angular, Django"
            className="rounded-3xl pl-4 pr-10"
          />
          <SquareCode className="h-5 w-5 absolute right-3 top-2.5 text-black" />
        </div>
      </div>
      
      {/* Tools & Technologies */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Tools & Technologies</h3>
        <div className="relative">
          <Input
            value={tools}
            onChange={(e) => setTools(e.target.value)}
            placeholder="e.g. Docker, Git, AWS"
            className="rounded-3xl pl-4 pr-10"
          />
          <Wrench className="h-5 w-5 absolute right-3 top-2.5 text-black" />
        </div>
      </div>
      
      {/* Databases */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Databases</h3>
        <div className="relative">
          <Input
            value={databases}
            onChange={(e) => setDatabases(e.target.value)}
            placeholder="e.g. MySQL, MongoDB, PostgreSQL"
            className="rounded-3xl pl-4 pr-10"
          />
          <TableOfContents className="h-5 w-5 absolute right-3 top-2.5 text-black" />
        </div>
      </div>
    </div>
  );
}

// Soft Skills Section Component
function SoftSkillsSection() {
  const [softSkills, setSoftSkills] = useState<{name: string, description: string, type: string}[]>([
    { name: "Communication", description: "Excellent verbal and written communication", type: "communication" },
    { name: "Leadership", description: "Team management and project coordination", type: "leadership" },
    { name: "Problem Solving", description: "Analytical thinking and creative solutions", type: "problem-solving" }
  ]);
  
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newSkillName, setNewSkillName] = useState<string>("");
  const [newSkillDescription, setNewSkillDescription] = useState<string>("");
  const [newSkillType, setNewSkillType] = useState<string>("communication");
  
  const skillTypes = [
    { value: "communication", label: "Communication", icon: MessageSquareText },
    { value: "leadership", label: "Leadership", icon: Users },
    { value: "problem-solving", label: "Problem Solving", icon: Lightbulb }
  ];
  
  const getSkillIcon = (type: string) => {
    const skillType = skillTypes.find(t => t.value === type);
    if (skillType) {
      const IconComponent = skillType.icon;
      return <IconComponent className="h-5 w-5 text-blue-700" />;
    }
    return <MessageSquareText className="h-5 w-5 text-blue-700" />;
  };
  
  const addSoftSkill = () => {
    if (newSkillName.trim() !== "") {
      setSoftSkills([...softSkills, { 
        name: newSkillName, 
        description: newSkillDescription,
        type: newSkillType
      }]);
      setNewSkillName("");
      setNewSkillDescription("");
      setNewSkillType("communication");
      setShowAddForm(false);
    }
  };
  
  const removeSkill = (index: number) => {
    setSoftSkills(softSkills.filter((_, i) => i !== index));
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Soft Skills</h2>
      
      {!showAddForm ? (
        <div className="rounded-3xl bg-[#1231AA0D] border-0 p-6 space-y-2">
          <div className="flex flex-col items-start gap-2">
            <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
              <Brain className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="font-medium">Add Soft Skills</h3>
          </div>
          <p className="text-sm text-gray-500">Add details about candidate's interpersonal and professional skills</p>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl text-sm"
          >
            Add Skill
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <label htmlFor="skill-name" className="block text-sm font-medium mb-1">Skill Name</label>
            <Input
              id="skill-name"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="e.g. Communication"
              className="rounded-3xl"
            />
          </div>
          <div>
            <label htmlFor="skill-description" className="block text-sm font-medium mb-1">Description</label>
            <Input
              id="skill-description"
              value={newSkillDescription}
              onChange={(e) => setNewSkillDescription(e.target.value)}
              placeholder="Brief description of the skill"
              className="rounded-3xl"
            />
          </div>
          <div>
            <label htmlFor="skill-type" className="block text-sm font-medium mb-1">Skill Type</label>
            <select
              id="skill-type"
              value={newSkillType}
              onChange={(e) => setNewSkillType(e.target.value)}
              className="w-full rounded-3xl border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
            >
              {skillTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              className="rounded-3xl text-black hover:bg-blue-700 hover:text-white"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={addSoftSkill}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
            >
              Add Skill
            </Button>
          </div>
        </div>
      )}
      
      {/* Display existing soft skills */}
      {softSkills.length > 0 && (
        <div className="space-y-4 mt-4">
          {softSkills.map((skill, index) => (
            <div key={index} className="flex items-start justify-between p-4 ">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-[#E0E4F0] flex items-center justify-center">
                  {getSkillIcon(skill.type)}
                </div>
                <div>
                  <h3 className="font-medium">{skill.name}</h3>
                  <p className="text-sm text-gray-500">{skill.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-blue-600">
                  <Edit className="h-5 w-5 text-black" />
                </button>
                <button 
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => removeSkill(index)}
                >
                  <Trash2 className="h-5 w-5 text-black" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Languages Section Component
function LanguagesSection() {
  const [languages, setLanguages] = useState<{name: string, level: string}[]>([
    { name: "English", level: "Native" },
    { name: "Spanish", level: "Intermediate" },
    { name: "French", level: "Basic" }
  ]);
  
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newLanguage, setNewLanguage] = useState<string>("");
  const [proficiencyLevel, setProficiencyLevel] = useState<string>("Basic");
  
  const proficiencyLevels = ["Basic", "Intermediate", "Advanced", "Fluent", "Native"];
  
  const addLanguage = () => {
    if (newLanguage.trim() !== "") {
      setLanguages([...languages, { name: newLanguage, level: proficiencyLevel }]);
      setNewLanguage("");
      setProficiencyLevel("Basic");
      setShowAddForm(false);
    }
  };
  
  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Languages</h2>
      
      {!showAddForm ? (
        <div className="rounded-3xl bg-[#1231AA0D] border-0 p-6 space-y-2">
          <div className="flex flex-col items-start gap-2">
            <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
              <Languages className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="font-medium">Add Language</h3>
          </div>
          <p className="text-sm text-gray-500">Add details about candidate's language proficiency</p>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl text-sm"
          >
            Add Language
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <label htmlFor="language-name" className="block text-sm font-medium mb-1">Language</label>
            <Input
              id="language-name"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="e.g. German"
              className="rounded-3xl"
            />
          </div>
          <div>
            <label htmlFor="proficiency" className="block text-sm font-medium mb-1">Proficiency Level</label>
            <select
              id="proficiency"
              value={proficiencyLevel}
              onChange={(e) => setProficiencyLevel(e.target.value)}
              className="w-full rounded-3xl border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
            >
              {proficiencyLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              className="rounded-3xl text-black hover:bg-blue-700 hover:text-white"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={addLanguage}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
            >
              Add Language
            </Button>
          </div>
        </div>
      )}
      
      {/* Display existing languages */}
      {languages.length > 0 && (
        <div className="space-y-4 mt-4">
          {languages.map((language, index) => (
            <div key={index} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                
                <div className="flex justify-evenly items-center  gap-4">
                  <h3 className="font-medium">{language.name}</h3>
                  <span className="text-lg  px-2 py-1">{language.level}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-blue-600">
                  <Edit className="h-5 w-5 text-black" />
                </button>
                <button 
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => removeLanguage(index)}
                >
                  <Trash2 className="h-5 w-5 text-black" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}