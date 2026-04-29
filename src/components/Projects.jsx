import React, { useState } from 'react'
import { FaArrowRight, FaExternalLinkAlt, FaEye, FaGithub } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { motion as Motion } from 'framer-motion'
import { projects as fallbackProjects } from '../assets/assets'
import { SectionHeading } from './SectionHeading'

const getProjectLinks = (project) => {
  const repoFallback = 'https://github.com/anjalibind17?tab=repositories'
  const codeHref = project.code && project.code !== '#' ? project.code : repoFallback
  const demoHref = project.demo && project.demo !== '#' ? project.demo : codeHref

  return { demoHref, codeHref }
}

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const visibleProjects = showAllProjects ? fallbackProjects : fallbackProjects.slice(0, 3)

  return (
    <section id="projects" className="bg-dark-100 px-6 py-12 text-white">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading
          title="My Projects"
          description="A selection of my recent work"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => {
            const fallback = fallbackProjects[index % fallbackProjects.length]
            const image = project.image || fallback.image
            const { demoHref, codeHref } = getProjectLinks(project)

            return (
              <Motion.article
                key={project.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-purple/45 bg-dark-300 shadow-lg shadow-purple/10 outline-none transition duration-300 hover:-translate-y-1 hover:border-pink hover:shadow-xl hover:shadow-pink/20 focus:border-pink"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={image} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple/45 via-transparent to-transparent opacity-80 transition duration-300 group-hover:from-pink/60" />
                  <button
                    type="button"
                    aria-label={`View ${project.title} details`}
                    onClick={() => setSelectedProject({ ...project, image })}
                    className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-dark-100/80 text-white backdrop-blur transition hover:bg-pink"
                  >
                    <FaEye />
                  </button>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="mb-2 text-xl font-black leading-tight text-purple transition group-hover:text-pink">{project.title}</h3>
                  <p className="mb-4 line-clamp-2 text-sm leading-6 text-slate-300 transition group-hover:text-white">{project.description}</p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="rounded-full bg-purple px-2.5 py-1 text-xs font-bold text-white transition group-hover:bg-pink">{tech}</span>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProject({ ...project, image })}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-dark-400 text-white transition hover:bg-pink"
                      aria-label={`View ${project.title} details`}
                    >
                      <FaEye />
                    </button>
                    <a
                      href={demoHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-purple px-3 py-2 text-sm font-black text-white transition hover:bg-pink"
                    >
                      <FaExternalLinkAlt /> Demo
                    </a>
                    <a
                      href={codeHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-purple px-3 py-2 text-sm font-black text-white transition hover:border-pink hover:bg-pink"
                    >
                      <FaGithub /> Code
                    </a>
                  </div>
                </div>
              </Motion.article>
            )
          })}
        </div>

        {fallbackProjects.length > 3 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllProjects((current) => !current)}
              className="inline-flex items-center gap-3 rounded-lg border border-purple px-8 py-4 text-lg font-black text-white transition hover:-translate-y-1 hover:bg-purple"
            >
              {showAllProjects ? 'Show Less Projects' : 'View More Projects'}
              <FaArrowRight className={`transition ${showAllProjects ? '-rotate-90' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/75 px-4 py-8 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <Motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-purple/50 bg-dark-300 shadow-2xl shadow-black/40"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-56 overflow-hidden">
              <img src={selectedProject.image} alt={selectedProject.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-300 via-dark-300/25 to-transparent" />
              <button
                type="button"
                aria-label="Close project details"
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/55 text-white transition hover:bg-pink"
              >
                <FaXmark />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-3xl font-black text-purple">{selectedProject.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-200">{selectedProject.description}</p>

              {Array.isArray(selectedProject.highlights) && (
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-200">
                  {selectedProject.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {selectedProject.tech.map((tech) => (
                  <span key={tech} className="rounded-full bg-purple px-3 py-1 text-sm font-bold text-white">{tech}</span>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={getProjectLinks(selectedProject).demoHref} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-purple px-4 py-3 font-black text-white transition hover:bg-pink">
                  <FaExternalLinkAlt /> View Demo
                </a>
                <a href={getProjectLinks(selectedProject).codeHref} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-purple px-4 py-3 font-black text-white transition hover:border-pink hover:bg-pink">
                  <FaGithub /> Source Code
                </a>
              </div>
            </div>
          </Motion.div>
        </div>
      )}
    </section>
  )
}
