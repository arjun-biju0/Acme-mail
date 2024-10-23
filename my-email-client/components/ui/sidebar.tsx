"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Inbox, Mail, Star, Archive, Trash2, Send } from "lucide-react"

export default function Sidebar() {
  const [filter, setFilter] = useState("all")

  return (
    <aside className="bg-white w-64 border-r border-gray-200 pt-4 hidden md:block">
      <nav className="space-y-1 px-2">
        <Button variant="ghost" className="w-full justify-start" onClick={() => setFilter("all")}>
          <Inbox className="mr-2 h-4 w-4" /> Inbox
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={() => setFilter("unread")}>
          <Mail className="mr-2 h-4 w-4" /> Unread
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={() => setFilter("favorites")}>
          <Star className="mr-2 h-4 w-4" /> Favorites
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Send className="mr-2 h-4 w-4" /> Sent
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Archive className="mr-2 h-4 w-4" /> Archive
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Trash2 className="mr-2 h-4 w-4" /> Trash
        </Button>
      </nav>
    </aside>
  )
}