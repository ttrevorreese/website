"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { profile } from "@/content/profile"

export function ContactForm() {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const email = profile.social.email.replace("mailto:", "")
    const params = new URLSearchParams({
      subject: subject.trim(),
      body: message.trim(),
    })
    window.location.href = `mailto:${email}?${params.toString()}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-20">
      <div>
        <label
          htmlFor="subject"
          className="block text-xs tracking-[0.25em] uppercase text-muted mb-2"
        >
          Subject
        </label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="What's on your mind?"
          required
          className="w-full bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-foreground/30 transition-colors"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-xs tracking-[0.25em] uppercase text-muted mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me more..."
          required
          rows={5}
          className="w-full bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-foreground/30 transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-3 border border-border px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-card transition-colors"
      >
        <Send size={13} />
        Send message
      </button>
    </form>
  )
}
