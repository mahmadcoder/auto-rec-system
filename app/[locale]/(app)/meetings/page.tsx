"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  Calendar,
  Clock,
  Video,
  Phone,
  Trash2,
  UserPlus,
  ChevronRight,
  Link as LinkIcon
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define TypeScript interfaces
interface Guest {
  id: number;
  name: string;
  role: string;
  avatar: string | null;
}

type MeetingType = "video" | "in-person" | "phone";
type MeetingDuration = "15m" | "30m" | "45m" | "1h";

// Added proper types for date and time
interface DateTimeState {
  date: string;
  time: string;
  formattedDateTime: string | null; // ISO string format for API calls
}

export default function MeetingsPage() {
  // Create refs for date and time inputs
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [meetingType, setMeetingType] = useState<MeetingType>("video");
  const [meetingDuration, setMeetingDuration] = useState<MeetingDuration>("15m");
  const [meetingTitle, setMeetingTitle] = useState<string>("");
  const [meetingLink, setMeetingLink] = useState<string>("");
  const [meetingDescription, setMeetingDescription] = useState<string>("");
  
  // Improved date & time state with proper typing
  const [dateTime, setDateTime] = useState<DateTimeState>({
    date: "",
    time: "",
    formattedDateTime: null
  });
  
  const [guestEmail, setGuestEmail] = useState<string>("");
  
  // Guest data
  const [invitedGuests, setInvitedGuests] = useState<Guest[]>([
    {
      id: 1,
      name: "Adam Hirai",
      role: "Organizer",
      avatar: "/avatars/adam.jpg"
    },
    {
      id: 2,
      name: "Art Johnson",
      role: "Coworker",
      avatar: "/avatars/art.jpg"
    }
  ]);

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  // Update formatted date time whenever date or time changes
  useEffect(() => {
    if (dateTime.date && dateTime.time) {
      const dateTimeStr = `${dateTime.date}T${dateTime.time}`;
      try {
        // Create a valid ISO string for API calls
        const dateObj = new Date(dateTimeStr);
        setDateTime(prev => ({
          ...prev,
          formattedDateTime: dateObj.toISOString()
        }));
      } catch (error) {
        // Handle invalid date/time
        setDateTime(prev => ({
          ...prev,
          formattedDateTime: null
        }));
      }
    }
  }, [dateTime.date, dateTime.time]);

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTime(prev => ({
      ...prev,
      date: e.target.value
    }));
  };

  // Handle time change
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTime(prev => ({
      ...prev,
      time: e.target.value
    }));
  };

  // Handle icon clicks to focus the inputs
  const handleDateIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleTimeIconClick = () => {
    if (timeInputRef.current) {
      timeInputRef.current.showPicker();
    }
  };

  const handleAddGuest = () => {
    if (guestEmail.trim()) {
      // In a real app, you'd validate the email and perhaps look up user details
      const newGuest: Guest = {
        id: invitedGuests.length + 1,
        name: guestEmail.split('@')[0], // Simple name extraction from email
        role: "Guest",
        avatar: null
      };
      
      setInvitedGuests([...invitedGuests, newGuest]);
      setGuestEmail("");
    }
  };

  const handleRemoveGuest = (id: number) => {
    setInvitedGuests(invitedGuests.filter(guest => guest.id !== id));
  };

  const handleSendInvites = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate date and time are provided
    if (!dateTime.date || !dateTime.time) {
      alert("Please select both date and time for the meeting");
      return;
    }
    
    // Logic to send meeting invites would go here
    console.log("Meeting datetime:", dateTime.formattedDateTime);
    alert("Meeting invites sent!");
  };

  // Get today's date in YYYY-MM-DD format for min date attribute
  const getTodayString = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <DashboardShell>
      <div className="mx-auto space-y-6 p-0 md:p-6">
        {/* Breadcrumb navigation */}
        <div className="flex items-center text-sm font-medium">
          <Link href="/meetings" className="hover:text-foreground">
            Meetings
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">New Meeting</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">New Meeting</h1>
          <p className="text-sm text-gray-500 mt-1">
            Meeting invites will not be sent unless you sync your calendar
          </p>
        </div>

        <form onSubmit={handleSendInvites}>
          {/* Meeting Details Section */}
          <div className="mb-6">
            <div className="flex flex-col items-start rounded-3xl bg-[#1231AA0D] border-0 p-6 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold mb-1">Meeting Details</h2>
              <p className="text-sm text-gray-500">Enter the basic information about your meeting</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {/* Meeting Title */}
              <div className="space-y-2 mb-4">
                <label htmlFor="meetingTitle" className="text-sm font-medium">
                  Meeting Title
                </label>
                <Input
                  id="meetingTitle"
                  placeholder="Meeting with (Name)"
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  className="w-full bg-white rounded-3xl"
                  required
                />
              </div>

              {/* Meeting Type */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium">
                  Meeting Type
                </label>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant={meetingType === "video" ? "default" : "outline"}
                    size="sm"
                    className={`rounded-full ${meetingType === "video" ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-black hover:bg-gray-100"}`}
                    onClick={() => setMeetingType("video")}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Video
                  </Button>
                  <Button
                    type="button"
                    variant={meetingType === "in-person" ? "default" : "outline"}
                    size="sm"
                    className={`rounded-full ${meetingType === "in-person" ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-black hover:bg-gray-100"}`}
                    onClick={() => setMeetingType("in-person")}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    In-person
                  </Button>
                  <Button
                    type="button"
                    variant={meetingType === "phone" ? "default" : "outline"}
                    size="sm"
                    className={`rounded-full ${meetingType === "phone" ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-black hover:bg-gray-100"}`}
                    onClick={() => setMeetingType("phone")}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Phone
                  </Button>
                </div>
              </div>

              {/* Meeting Link */}
              <div className="space-y-2 mb-4">
                <label htmlFor="meetingLink" className="text-sm font-medium">
                  Meeting Link
                </label>
                <div className="relative">
                  <Input
                    id="meetingLink"
                    placeholder="Paste a video conference link"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    className="w-full bg-white pr-10"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <LinkIcon className="h-5 w-5 text-black" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Add meeting agenda or notes..."
                  value={meetingDescription}
                  onChange={(e) => setMeetingDescription(e.target.value)}
                  className="w-full bg-white min-h-24"
                />
              </div>
            </div>
          </div>

          {/* Date & Time Section */}
          <div className="mb-6">
            <div className="flex flex-col items-start rounded-3xl bg-[#1231AA0D] border-0 p-6 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold mb-1">Date & Time</h2>
              <p className="text-sm text-gray-500">Select when the meeting will take place</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {/* Date & Time Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    Date
                  </label>
                  <div className="relative">
                    <Input
                      id="date"
                      type="date"
                      value={dateTime.date}
                      onChange={handleDateChange}
                      min={getTodayString()} // Prevent selecting dates in the past
                      className="w-full bg-white pr-10"
                      required
                      aria-label="Meeting date"
                      onClick={(e) => e.currentTarget.showPicker()}
                      ref={dateInputRef}
                    />
                    <div 
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={handleDateIconClick}
                    >
                      <Calendar className="h-5 w-5 text-black" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="time" className="text-sm font-medium">
                    Time
                  </label>
                  <div className="relative">
                    <Input
                      id="time"
                      type="time"
                      value={dateTime.time}
                      onChange={handleTimeChange}
                      className="w-full bg-white pr-10"
                      required
                      aria-label="Meeting time"
                      onClick={(e) => e.currentTarget.showPicker()}
                      ref={timeInputRef}
                    />
                    <div 
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={handleTimeIconClick}
                    >
                      <Clock className="h-5 w-5 text-black" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview of selected datetime (optional) */}
              {dateTime.date && dateTime.time && (
                <div className="text-sm text-gray-600 mb-4">
                  Meeting scheduled for: {new Date(`${dateTime.date}T${dateTime.time}`).toLocaleString()}
                </div>
              )}

              {/* Duration Options */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Duration
                </label>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant={meetingDuration === "15m" ? "default" : "outline"}
                    size="sm"
                    className={`rounded-full ${meetingDuration === "15m" ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-black hover:bg-gray-100"}`}
                    onClick={() => setMeetingDuration("15m")}
                  >
                    15m
                  </Button>
                  <Button
                    type="button"
                    variant={meetingDuration === "30m" ? "default" : "outline"}
                    size="sm"
                    className={`rounded-full ${meetingDuration === "30m" ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-black hover:bg-gray-100"}`}
                    onClick={() => setMeetingDuration("30m")}
                  >
                    30m
                  </Button>
                  <Button
                    type="button"
                    variant={meetingDuration === "45m" ? "default" : "outline"}
                    size="sm"
                    className={`rounded-full ${meetingDuration === "45m" ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-black hover:bg-gray-100"}`}
                    onClick={() => setMeetingDuration("45m")}
                  >
                    45m
                  </Button>
                  <Button
                    type="button"
                    variant={meetingDuration === "1h" ? "default" : "outline"}
                    size="sm"
                    className={`rounded-full ${meetingDuration === "1h" ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-black hover:bg-gray-100"}`}
                    onClick={() => setMeetingDuration("1h")}
                  >
                    1h
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Guests Section */}
          <div className="mb-6">
            <div className="flex flex-col items-start p-6 rounded-3xl bg-[#1231AA0D] border-0 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold mb-1">Guests</h2>
              <p className="text-sm text-gray-500">Add people to your meeting</p>
              
              {/* Sync Calendar Button moved here */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white hover:text-white mt-3"
              >
                Sync Calendar
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {/* Add Guest */}
              <div className="space-y-2 mb-6">
                <label htmlFor="guestEmail" className="text-sm font-medium">
                  Add a guest
                </label>
                <div className="relative">
                  <Input
                    id="guestEmail"
                    placeholder="Enter email address"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-white pr-10"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddGuest();
                      }
                    }}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Button 
                      type="button"
                      size="icon" 
                      variant="ghost"
                      className="w-8 h-8 p-0 hover:text-white"
                      onClick={handleAddGuest}
                    >
                      <UserPlus className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Invited Guests List */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Invited Guests
                </label>
                <div className="space-y-3">
                  {invitedGuests.map((guest) => (
                    <div key={guest.id} className="flex items-center justify-between p-3 ">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          {guest.avatar && <AvatarImage src={guest.avatar} alt={guest.name} />}
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {guest.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{guest.name}</p>
                          <p className="text-xs text-gray-500">{guest.role}</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-black hover:text-red-500"
                        onClick={() => handleRemoveGuest(guest.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="rounded-3xl text-black hover:bg-blue-700 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              size="lg"
              className="rounded-3xl bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!dateTime.date || !dateTime.time} // Disable if date/time not selected
            >
              Send Invites
            </Button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}