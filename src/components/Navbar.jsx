import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <nav className="portfolio-nav fixed left-0 top-0 z-50 w-full bg-dark-100/95 shadow-[0_18px_55px_rgba(0,0,0,0.32)] backdrop-blur">
      <div className="portfolio-nav-inner flex w-full items-center justify-between">
        <a href="#home" className="portfolio-logo relative flex items-center gap-0 font-black leading-none text-white">
          Anjali<span className="text-purple">Bind</span>
          <span className="portfolio-logo-dot absolute left-0 rounded-full bg-purple" />
        </a>

        <div className="portfolio-nav-links hidden items-center md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="font-bold text-white/70 transition hover:text-white">
              {item.label}
            </a>
          ))}
        </div>

        <button type="button" className="text-2xl text-white md:hidden" aria-label="Toggle menu" onClick={() => setShowMenu((current) => !current)}>
          {showMenu ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {showMenu && (
        <div className="mx-auto mt-7 rounded-2xl border border-white/10 bg-dark-300 p-4 text-center md:hidden">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setShowMenu(false)} className="block rounded-xl px-4 py-3 font-bold text-white/80 transition hover:bg-white/10 hover:text-purple">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
