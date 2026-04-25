import React, { useEffect, useMemo, useState } from 'react'
import { easeOut, motion as Motion } from 'framer-motion'
import { assets } from '../assets/assets'
import { api } from '../lib/api'

export const Hero = () => {
  const fallbackRoles = useMemo(() => [
    'Frontend Developer',
    'Full Stack Developer',
    'Backend Developer',
    'DSA Enthusiast',
  ], [])

  const [profile, setProfile] = useState(null)
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const roles = profile?.roles?.length ? profile.roles : fallbackRoles

  useEffect(() => {
    api.getProfile().then(setProfile).catch(() => {
      setProfile({
        name: 'Anjali Bind',
        tagline: 'I create stunning web experiences with modern technologies and innovative design.',
        roles: fallbackRoles,
      })
    })
  }, [fallbackRoles])

  useEffect(() => {
    const current = roles[index % roles.length]
    const speed = isDeleting ? 45 : 90

    const timer = setTimeout(() => {
      const updatedText = !isDeleting
        ? current.substring(0, text.length + 1)
        : current.substring(0, text.length - 1)

      setText(updatedText)

      if (!isDeleting && updatedText === current) {
        setTimeout(() => setIsDeleting(true), 1000)
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false)
        setIndex((prev) => (prev + 1) % roles.length)
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [text, isDeleting, index, roles])

  return (
    <Motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
      viewport={{ once: true }}
      id="home"
      className="min-h-screen flex items-center pt-20 px-6 bg-gradient-to-r from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] text-white"
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl font-extrabold mb-5 md:text-6xl">
            Hi, I'm <span className="text-purple">{profile?.name || 'Anjali Bind'}</span>
          </h1>

          <h2 className="text-3xl md:text-5xl font-black mb-8 min-h-14 text-white">
            {text}
            <span className="ml-2 border-r-4 border-purple animate-pulse" />
          </h2>

          <p className="text-xl md:text-2xl text-slate-200 mb-10 leading-relaxed max-w-2xl">
            {profile?.tagline || 'I create stunning web experiences with modern technologies and innovative design.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <a href="#projects" className="rounded-lg bg-purple px-8 py-4 text-center text-xl font-black text-white transition hover:-translate-y-1 hover:bg-purple-700">View Work</a>
            <a href="#contact" className="rounded-lg border border-purple px-8 py-4 text-center text-xl font-black text-white transition hover:-translate-y-1 hover:bg-purple/10">Contact Me</a>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple to-pink animate-pulse-slow opacity-70" />
            <Motion.img
              src={assets.profileImg}
              alt="Profile"
              className="relative rounded-full w-64 h-64 md:w-80 md:h-80 object-cover z-10 animate-float"
              style={{ transform: 'translateY(-5.39253px)' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>
    </Motion.section>
  )
}
