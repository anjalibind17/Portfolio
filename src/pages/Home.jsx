import React from 'react'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Skills } from '../components/Skills'
import { Projects } from '../components/Projects'
import { CodingPlatforms } from '../components/CodingPlatforms'
import { Experience } from '../components/Experience'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'

export const Home = () => {
  return (
    <main className="flex min-h-screen flex-col bg-dark-100">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <CodingPlatforms />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
