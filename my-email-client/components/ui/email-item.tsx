"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Email {
  id: number
  subject: string
  sender: string
  senderName: string
  preview: string
  read: boolean
  favorite: boolean
  date: string
  body: string
}

interface EmailItemProps {
  email: Email
  toggleRead: (id: number) => void
  toggleFavorite: (id: number) => void
}

export default function EmailItem({ email, toggleRead, toggleFavorite }: EmailItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(true)
    if (!email.read) {
      toggleRead(email.id)
    }
  }

  return (
    <>
      <div 
        className={`bg-white p-4 mb-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer ${
          email.read ? 'opacity-75' : 'font-semibold'
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${email.senderName}`} alt={email.senderName} />
              <AvatarFallback>{email.senderName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-sm font-semibold">{email.senderName}</h3>
              <p className="text-xs text-gray-500">{email.sender}</p>
            </div>
          </div>
          <span className="text-xs text-gray-400">{email.date}</span>
        </div>
        <h4 className="text-base font-medium mb-1">{email.subject}</h4>
        <p className="text-sm text-gray-600">{email.preview}</p>
        <div className="mt-2 flex items-center space-x-2">
          {!email.read && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Unread</span>
          )}
          <button onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(email.id)
          }}>
            <Star className={`h-5 w-5 ${email.favorite ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
          </button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{email.subject}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${email.senderName}`} alt={email.senderName} />
                <AvatarFallback>{email.senderName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{email.senderName}</p>
                <p className="text-sm text-gray-500">{email.sender}</p>
              </div>
            </div>
            <div className="text-sm whitespace-pre-wrap">{email.body}</div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}