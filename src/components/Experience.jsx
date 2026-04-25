import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { motion as Motion } from 'framer-motion'
import { workData } from '../assets/assets'
import { SectionHeading } from './SectionHeading'

export const Experience = () => {
  return (
    <section id="experience" className="bg-dark-100 px-6 py-12 text-white">
      <div className="mx-auto max-w-[1040px]">
        <SectionHeading
          title="Work Experience"
          description="My professional journey so far"
        />

        <div className="relative space-y-10 before:absolute before:left-4 before:top-4 before:h-[calc(100%-2rem)] before:w-0.5 before:bg-purple md:before:left-0">
          {workData.map((item, index) => (
            <Motion.article
              key={`${item.role}-${item.company}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group relative ml-14 rounded-2xl bg-dark-300 p-6 transition hover:-translate-y-1 hover:bg-dark-400 md:ml-16 md:p-7"
            >
              <span className="absolute -left-[72px] top-0 h-8 w-8 rounded-full bg-purple transition group-hover:bg-pink md:-left-[80px]" />

              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-2xl font-black md:text-3xl">{item.role}</h3>
                  <p className="mt-3 text-xl text-slate-300">{item.company} · {item.location}</p>
                </div>
                <span className="w-fit rounded-full bg-purple/20 px-5 py-2 text-base font-bold text-purple transition group-hover:bg-pink/20 group-hover:text-pink">
                  {item.duration}
                </span>
              </div>

              <p className="mt-5 text-lg leading-8 text-white">{item.description}</p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {item.certificate && item.certificate !== '#' && (
                  <a href={item.certificate} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center justify-center gap-2 rounded-lg border border-purple px-4 py-2 font-bold text-white transition hover:border-pink hover:bg-pink">
                    <FaExternalLinkAlt /> Certificate
                  </a>
                )}
                <a href={item.project} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-purple px-4 py-2 font-bold text-white transition hover:bg-pink">
                  <FaExternalLinkAlt /> {item.role.includes('Contributor') ? 'GitHub' : 'Project'}
                </a>
              </div>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
