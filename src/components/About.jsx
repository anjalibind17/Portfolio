import React from 'react'
import { motion as Motion } from 'framer-motion'
import { FaCode, FaLaptopCode, FaShieldAlt } from 'react-icons/fa'
import { assets } from '../assets/assets'

const cards = [
  {
    icon: FaLaptopCode,
    title: 'Full-Stack',
    text: 'React interfaces with Node.js, Express, MongoDB, auth, and clean API workflows.',
  },
  {
    icon: FaShieldAlt,
    title: 'Cybersecurity',
    text: 'Security-focused projects around network intrusion, alerts, risk signals, and detection.',
  },
  {
    icon: FaCode,
    title: 'AI Projects',
    text: 'Gemini API integrations, prompt workflows, structured responses, and smart user flows.',
  },
]

export const About = () => {
  return (
    <section id="about" className="bg-dark-100 px-6 py-10 text-white md:py-12">
      <div className="mx-auto grid max-w-[1380px] items-center gap-7 lg:grid-cols-[0.9fr_1fr]">
        <Motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl bg-dark-300"
        >
          <img src={assets.profileImg} alt="Anjali Bind" className="h-[300px] w-full object-cover object-top sm:h-[390px] lg:h-[560px]" />
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center py-1 lg:pl-8"
        >
          <p className="text-sm font-black uppercase tracking-[0.32em] text-purple">About Me</p>
          <h2 className="mt-2 text-4xl font-black leading-tight md:text-5xl">
            My <span className="text-purple">Journey</span>
          </h2>

          <div className="mt-4 max-w-3xl space-y-3 text-base leading-7 text-slate-200">
            <p>
              I am Anjali Bind, a B.Tech CSE student with a strong interest in full-stack development, cybersecurity, and AI-powered products. I build responsive web apps using React, Node.js, Express, MongoDB, Tailwind CSS, and modern authentication tools.
            </p>
            <p>
              My recent work includes Axis AI, DesiDeal, and AI Network Intrusion Detection. These projects helped me work with Gemini API, Clerk authentication, REST APIs, seller dashboards, event-driven flows, and security-oriented data handling.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ['05+', 'Projects'],
              ['MERN', 'Stack'],
              ['AI', 'Integrated'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl bg-dark-300 p-3.5">
                <p className="text-xl font-black text-purple">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {cards.map((card, index) => {
              const Icon = card.icon

              return (
                <Motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="group rounded-xl bg-dark-300 p-4 transition hover:-translate-y-1 hover:bg-dark-400"
                >
                  <Icon className="mb-3 text-3xl text-purple transition group-hover:text-pink" />
                  <h3 className="text-lg font-black">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{card.text}</p>
                </Motion.article>
              )
            })}
          </div>
        </Motion.div>
      </div>
    </section>
  )
}
