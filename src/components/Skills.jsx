import React from 'react'
import { motion as Motion } from 'framer-motion'
import { skills as fallbackSkills } from '../assets/assets'
import { SectionHeading } from './SectionHeading'

export const Skills = () => {
  return (
    <section id="skills" className="bg-dark-100 px-6 py-12 text-white">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading
          title="My Skills"
          description="Technologies I work with to bring ideas to life"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {fallbackSkills.map((skill, index) => {
            const Icon = fallbackSkills.find((item) => item.title === skill.title)?.icon || fallbackSkills[index % fallbackSkills.length].icon

            return (
              <Motion.article
                key={skill.title}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-purple/45 bg-dark-300 p-8 shadow-lg shadow-purple/10 transition duration-300 hover:-translate-y-2 hover:border-pink hover:bg-dark-400 hover:shadow-xl hover:shadow-pink/20"
              >
                <div className="mb-7 flex items-center gap-8">
                  <Icon className="shrink-0 text-6xl text-purple transition group-hover:text-pink" />
                  <h3 className="text-2xl font-black text-white transition group-hover:text-pink">{skill.title}</h3>
                </div>
                <p className="mb-6 text-xl leading-8 text-slate-300">{skill.description}</p>
                <div className="flex flex-wrap gap-3">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-purple px-4 py-2 text-base font-semibold text-white transition group-hover:bg-pink">{tag}</span>
                  ))}
                </div>
              </Motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
