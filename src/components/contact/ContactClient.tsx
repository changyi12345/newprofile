"use client"

import { motion } from "framer-motion"
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ContactProps {
  data: {
    email: string
    phone: string
    location: string
    github: string | null
    linkedin: string | null
    twitter: string | null
  } | null
}

export function ContactClient({ data }: ContactProps) {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")
    // Simulate API call
    setTimeout(() => {
      setFormState("success")
      // Reset after showing success message
      setTimeout(() => setFormState("idle"), 3000)
    }, 1500)
  }

  if (!data) return null

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-950">
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        suppressHydrationWarning
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
          suppressHydrationWarning
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Have a project in mind or want to discuss a job opportunity? I&#39;d love to hear from you.
          </p>
        </motion.div>

        <div 
          className="grid lg:grid-cols-2 gap-12"
          suppressHydrationWarning
        >
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
            suppressHydrationWarning
          >
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800" suppressHydrationWarning>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6" suppressHydrationWarning>
                <div className="flex items-start gap-4" suppressHydrationWarning>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400" suppressHydrationWarning>
                    <Mail className="w-6 h-6" />
                  </div>
                  <div suppressHydrationWarning>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Email</h4>
                    <a href={`mailto:${data.email}`} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {data.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4" suppressHydrationWarning>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400" suppressHydrationWarning>
                    <Phone className="w-6 h-6" />
                  </div>
                  <div suppressHydrationWarning>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Phone</h4>
                    <a href={`tel:${data.phone}`} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {data.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4" suppressHydrationWarning>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400" suppressHydrationWarning>
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div suppressHydrationWarning>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Location</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {data.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800" suppressHydrationWarning>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Follow Me</h4>
                <div className="flex gap-4" suppressHydrationWarning>
                  {data.github && (
                    <a
                      href={data.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all border border-slate-200 dark:border-slate-700"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {data.linkedin && (
                    <a
                      href={data.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all border border-slate-200 dark:border-slate-700"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {data.twitter && (
                    <a
                      href={data.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all border border-slate-200 dark:border-slate-700"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            suppressHydrationWarning
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm" suppressHydrationWarning>
              <div className="grid sm:grid-cols-2 gap-6" suppressHydrationWarning>
                <div className="space-y-2" suppressHydrationWarning>
                  <label htmlFor="name" className="text-sm font-medium text-slate-900 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2" suppressHydrationWarning>
                  <label htmlFor="email" className="text-sm font-medium text-slate-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2" suppressHydrationWarning>
                <label htmlFor="subject" className="text-sm font-medium text-slate-900 dark:text-white">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-2" suppressHydrationWarning>
                <label htmlFor="message" className="text-sm font-medium text-slate-900 dark:text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={formState === "submitting" || formState === "success"}
              >
                {formState === "submitting" ? (
                  "Sending..."
                ) : formState === "success" ? (
                  "Message Sent!"
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
