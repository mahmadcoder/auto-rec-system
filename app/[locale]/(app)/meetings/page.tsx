"use client";

import { useState, useEffect } from "react";
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

export default function MeetingsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [meetingType, setMeetingType] = useState<MeetingType>("video");
  const [meetingDuration, setMeetingDuration] = useState<MeetingDuration>("15m");
  const [meetingTitle, setMeetingTitle] = useState<string>("");
  const [meetingLink, setMeetingLink] = useState<string>("");
  const [meetingDescription, setMeetingDescription] = useState<string>("");
  const [meetingDate, setMeetingDate] = useState<string>("");
  const [meetingTime, setMeetingTime] = useState<string>("");
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
    // Logic to send meeting invites would go here
    alert("Meeting invites sent!");
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
                      value={meetingDate}
                      onChange={(e) => setMeetingDate(e.target.value)}
                      className="w-full bg-white pr-10"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
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
                      value={meetingTime}
                      onChange={(e) => setMeetingTime(e.target.value)}
                      className="w-full bg-white pr-10"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Clock className="h-5 w-5 text-black" />
                    </div>
                  </div>
                </div>
              </div>

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
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white mt-3"
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
                      className="w-8 h-8 p-0 text-black"
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
                    <div key={guest.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
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
            >
              Send Invites
            </Button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}