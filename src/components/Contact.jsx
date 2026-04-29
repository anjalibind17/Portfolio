import React, { useState } from 'react'
import { FaEnvelope, FaGithub, FaLinkedin, FaLocationDot, FaPhone, FaTwitter, FaDribbble } from 'react-icons/fa6'
import { motion as Motion } from 'framer-motion'
import { api } from '../lib/api'
import { SectionHeading } from './SectionHeading'

const contactLinks = {
  phone: '+917905041308',
  github: 'https://github.com/anjalibind17',
  linkedin: 'https://www.linkedin.com/in/anjali-bind-2492a8287/',
}

const initialForm = {
  name: '',
  email: '',
  subject: 'Portfolio contact',
  message: '',
}

export const Contact = () => {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSending, setIsSending] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSending(true)
    setStatus({ type: 'idle', message: '' })

    try {
      const response = await api.sendMessage(form)
      setStatus({ type: 'success', message: response.message || 'Message sent successfully.' })
      setForm(initialForm)
    } catch (error) {
      const canSaveLocally = /fetch|json|server|unexpected/i.test(error.message || '')

      if (canSaveLocally) {
        const savedMessages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]')
        localStorage.setItem('portfolioMessages', JSON.stringify([
          ...savedMessages,
          { ...form, createdAt: new Date().toISOString() },
        ]))
        setStatus({ type: 'success', message: 'Message saved locally. Backend restart ke baad API bhi work karegi.' })
        setForm(initialForm)
      } else {
        setStatus({ type: 'error', message: error.message })
      }
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="contact" className="bg-dark-100 px-6 pb-3 pt-4 text-white">
      <div className="mx-auto w-full max-w-[1100px]">
        <SectionHeading
          eyebrow="Contact"
          title="Get In Touch"
          description="Have a project in mind or want to collaborate? Let's talk!"
        />

        <div className="grid gap-7 lg:grid-cols-2">
          <Motion.form
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <label className="block space-y-1.5">
              <span className="text-base font-semibold text-white">Your Name</span>
              <input name="name" value={form.name} onChange={handleChange} required className="h-9 w-full rounded-lg border border-white/10 bg-dark-300 px-4 text-base outline-none transition focus:border-purple" />
            </label>

            <label className="block space-y-1.5">
              <span className="text-base font-semibold text-white">Email Address</span>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="h-9 w-full rounded-lg border border-white/10 bg-dark-300 px-4 text-base outline-none transition focus:border-purple" />
            </label>

            <input name="subject" value={form.subject} onChange={handleChange} className="hidden" tabIndex="-1" aria-hidden="true" />

            <label className="block space-y-1.5">
              <span className="text-base font-semibold text-white">Your Message</span>
              <textarea name="message" value={form.message} onChange={handleChange} required rows="2" className="w-full resize-none rounded-lg border border-white/10 bg-dark-300 px-4 py-2.5 text-base outline-none transition focus:border-purple" />
            </label>

            {status.message && (
              <p className={`rounded-lg px-4 py-3 font-semibold ${status.type === 'success' ? 'bg-green-500/15 text-green-200' : 'bg-red-500/15 text-red-200'}`}>
                {status.message}
              </p>
            )}

            <button disabled={isSending} className="w-full rounded-lg bg-purple px-6 py-2 text-base font-black text-white transition hover:-translate-y-1 hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60">
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </Motion.form>

          <Motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="pt-1"
          >
            <div className="space-y-5">
              {[
                [FaLocationDot, 'Location', 'India, open to anywhere work'],
                [FaEnvelope, 'Email', 'abind0173@gmail.com', 'mailto:abind0173@gmail.com'],
                [FaPhone, 'Phone', '+91 79050 41308', `tel:${contactLinks.phone}`],
              ].map(([icon, title, value, href]) => (
                <div key={title} className="flex gap-4">
                  {React.createElement(icon, { className: 'mt-1 text-2xl text-white' })}
                  <div>
                    <h3 className="text-lg font-black">{title}</h3>
                    {href ? (
                      <a href={href} className="mt-1.5 inline-block text-base text-slate-300 transition hover:text-purple">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1.5 text-base text-slate-300">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-6 text-lg font-black">Follow Me</h3>
            <div className="mt-3 flex gap-3">
              {[
                { icon: FaGithub, href: contactLinks.github, label: 'GitHub' },
                { icon: FaLinkedin, href: contactLinks.linkedin, label: 'LinkedIn' },
                { icon: FaTwitter, href: '#', label: 'Twitter' },
                { icon: FaDribbble, href: '#', label: 'Dribbble' },
              ].map(({ icon, href, label }) => (
                <a key={label} href={href} target={href === '#' ? undefined : '_blank'} rel={href === '#' ? undefined : 'noreferrer'} aria-label={label} className="grid h-10 w-10 place-items-center rounded-full bg-dark-300 text-base text-white transition hover:bg-purple">
                  {React.createElement(icon)}
                </a>
              ))}
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}
