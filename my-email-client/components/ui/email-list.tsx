"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import EmailItem from "./email-item"

// Dummy email data
const initialEmails = [
  { id: 1, subject: "Q4 Financial Report", sender: "finance@acme.com", senderName: "Finance Team", preview: "Attached please find the Q4 financial report for your review...", read: false, favorite: false, date: "10:30 AM", body: "Dear team,\n\nAttached please find the Q4 financial report for your review. This report includes our performance metrics, revenue analysis, and projections for the next quarter.\n\nPlease review and let me know if you have any questions or concerns.\n\nBest regards,\nFinance Team" },
  { id: 2, subject: "New Product Launch", sender: "marketing@acme.com", senderName: "Marketing Dept", preview: "We're excited to announce the launch of our new product line...", read: true, favorite: true, date: "Yesterday", body: "Hello everyone,\n\nWe're thrilled to announce the launch of our new product line! This launch represents months of hard work and innovation from our team.\n\nKey features of the new product line include:\n- Feature 1\n- Feature 2\n- Feature 3\n\nPlease familiarize yourself with the new products and be prepared to discuss them with clients.\n\nBest,\nMarketing Department" },
  { id: 3, subject: "Team Building Event", sender: "hr@acme.com", senderName: "Human Resources", preview: "Join us for our annual team building event next month...", read: false, favorite: false, date: "Jul 15", body: "Dear colleagues,\n\nWe're excited to invite you to our annual team building event next month. This year's theme is 'Collaboration and Innovation'.\n\nDate: August 15th\nTime: 9:00 AM - 5:00 PM\nLocation: Acme Conference Center\n\nPlease RSVP by July 30th. We look forward to seeing you there!\n\nBest regards,\nHR Team" },
  { id: 4, subject: "Project Deadline Reminder", sender: "pm@acme.com", senderName: "Project Management", preview: "This is a friendly reminder that the project deadline is approaching...", read: true, favorite: false, date: "Jul 14", body: "Hello team,\n\nThis is a friendly reminder that the deadline for Project X is approaching. Please ensure all deliverables are completed and submitted by July 31st.\n\nIf you're experiencing any challenges or delays, please let me know as soon as possible so we can address them.\n\nThank you for your hard work and dedication.\n\nBest,\nProject Management Team" },
  { id: 5, subject: "Security Update Required", sender: "it@acme.com", senderName: "IT Department", preview: "Please update your security settings by following these steps...", read: false, favorite: true, date: "Jul 13", body: "Dear all,\n\nWe've recently updated our security protocols. Please follow these steps to update your security settings:\n\n1. Log into your account\n2. Go to Settings > Security\n3. Click on 'Update Security Settings'\n4. Follow the prompts to complete the update\n\nIf you encounter any issues, please contact the IT helpdesk.\n\nThank you for your cooperation in maintaining our company's cybersecurity.\n\nBest regards,\nIT Department" },
]

export default function EmailList() {
  const [emails, setEmails] = useState(initialEmails)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const toggleRead = (id: number) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, read: !email.read } : email
    ))
  }

  const toggleFavorite = (id: number) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, favorite: !email.favorite } : email
    ))
  }

  const filteredEmails = emails.filter(email => {
    if (filter === "read" && !email.read) return false
    if (filter === "unread" && email.read) return false
    if (filter === "favorites" && !email.favorite) return false
    return email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
           email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
           email.preview.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="p-4">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search emails..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="mb-4 flex space-x-2">
        <button 
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`px-3 py-1 rounded ${filter === 'unread' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('unread')}
        >
          Unread
        </button>
        <button 
          className={`px-3 py-1 rounded ${filter === 'read' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('read')}
        >
          Read
        </button>
        <button 
          className={`px-3 py-1 rounded ${filter === 'favorites' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('favorites')}
        >
          Favorites
        </button>
      </div>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        {filteredEmails.map((email) => (
          <EmailItem 
            key={email.id} 
            email={email} 
            toggleRead={toggleRead}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </ScrollArea>
    </div>
  )
}