import React from 'react'
import { motion as Motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export const SectionHeading = ({ eyebrow, title, description }) => {
  const words = title.split(' ')
  const accent = words.pop()
  const normal = words.join(' ')

  return (
    <Motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mx-auto mb-5 max-w-3xl text-center"
    >
      {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.32em] text-purple">{eyebrow}</p>}
      <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">
        {normal} <span className="text-purple">{accent}</span>
      </h2>
      {description && <p className="mt-3 text-lg leading-7 text-slate-300">{description}</p>}
    </Motion.div>
  )
}
