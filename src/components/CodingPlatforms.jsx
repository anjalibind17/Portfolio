import React, { useCallback, useEffect, useState } from 'react'
import { FaExternalLinkAlt, FaSyncAlt, FaTrophy } from 'react-icons/fa'
import { motion as Motion } from 'framer-motion'
import { codingPlatforms } from '../assets/assets'
import { api } from '../lib/api'
import { SectionHeading } from './SectionHeading'

const formatValue = (value, fallback = 'Updating') => {
  if (value === null || value === undefined || value === '') return fallback
  return value.toLocaleString ? value.toLocaleString('en-IN') : value
}

const getExtraStat = (platformName, stats) => {
  if (platformName === 'CodeChef') return stats.highestRating
  if (platformName === 'Codeforces') return stats.maxRating
  return stats.rank
}

const getExtraLabel = (platformName) => {
  if (platformName === 'CodeChef') return 'Highest Rating'
  if (platformName === 'Codeforces') return 'Max Rating'
  return 'Rank'
}

const REFRESH_INTERVAL_MS = 30 * 60 * 1000

export const CodingPlatforms = () => {
  const [liveStats, setLiveStats] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const loadPlatformStats = useCallback(async ({ showLoading = false } = {}) => {
    if (showLoading) setIsRefreshing(true)

    try {
      const response = await api.getCodingPlatforms()
      const statsByName = Object.fromEntries(
        (response.platforms || []).map((platform) => [platform.name, platform]),
      )
      setLiveStats(statsByName)
    } catch {
      setLiveStats({})
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    loadPlatformStats()
    const refreshTimer = window.setInterval(loadPlatformStats, REFRESH_INTERVAL_MS)

    return () => {
      window.clearInterval(refreshTimer)
    }
  }, [loadPlatformStats])

  return (
    <section id="platforms" className="bg-dark-100 px-6 py-9 text-white">
      <div className="mx-auto max-w-[980px]">
        <SectionHeading
          title="Coding Platforms"
          description="A focused place to maintain my competitive programming and DSA records"
        />

        <div className="grid gap-3 md:grid-cols-3">
          {codingPlatforms.map((platform, index) => {
            const Icon = platform.icon
            const stats = liveStats[platform.name] || {}
            const solved = formatValue(stats.solved, platform.solved)
            const rating = formatValue(stats.rating, platform.rating)
            const extraStat = formatValue(getExtraStat(platform.name, stats), 'Auto update')

            return (
              <Motion.article
                key={platform.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="group flex h-full flex-col rounded-lg border border-purple/45 bg-dark-300 p-3.5 shadow-lg shadow-purple/10 transition duration-300 hover:-translate-y-1 hover:border-pink hover:bg-dark-400 hover:shadow-xl hover:shadow-pink/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-dark-400 text-xl transition group-hover:bg-dark-100">
                      <Icon className={`${platform.color} transition group-hover:text-pink`} />
                    </span>
                    <div>
                      <h3 className="text-lg font-black text-white transition group-hover:text-pink">{platform.name}</h3>
                      <p className="mt-0.5 text-xs font-bold text-slate-400">@{platform.handle}</p>
                    </div>
                  </div>
                  <FaTrophy className="mt-1 shrink-0 text-base text-purple transition group-hover:text-pink" />
                </div>

                <p className="mt-3 flex-1 text-xs leading-5 text-slate-300 transition group-hover:text-white">{platform.highlight}</p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-white/10 bg-dark-100/70 p-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Solved</p>
                    <p className="mt-0.5 text-sm font-black text-white">{isLoading ? 'Loading' : solved}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-dark-100/70 p-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Rating</p>
                    <p className="mt-0.5 text-sm font-black text-white">{isLoading ? 'Loading' : rating}</p>
                  </div>
                </div>

                <div className="mt-2.5 rounded-lg border border-white/10 bg-dark-100/50 px-2.5 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{getExtraLabel(platform.name)}</p>
                  <p className="mt-0.5 text-sm font-black text-white">{isLoading ? 'Loading' : extraStat}</p>
                </div>

                <div className="mt-3 flex gap-2">
                  <a
                    href={platform.profile}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-purple px-3 py-1.5 text-xs font-black text-white transition hover:bg-pink"
                  >
                    <FaExternalLinkAlt /> Profile
                  </a>
                  <button
                    type="button"
                    onClick={() => loadPlatformStats({ showLoading: true })}
                    disabled={isRefreshing}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-purple text-sm text-white transition hover:border-pink hover:bg-pink"
                    aria-label="Refresh coding platform stats"
                    title="Refresh stats"
                  >
                    <FaSyncAlt className={isRefreshing ? 'animate-spin' : ''} />
                  </button>
                </div>
              </Motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
