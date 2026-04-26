import http from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = process.env.PORT || 5000
const dataDir = path.join(__dirname, 'data')
const messagesFile = path.join(dataDir, 'messages.json')

const profile = {
  name: 'Anjali Bind',
  roles: ['Frontend Developer', 'Full Stack Developer', 'Backend Developer', 'DSA Enthusiast'],
  tagline: 'I create fast, responsive, and polished web experiences with React, Node.js, and thoughtful UI design.',
}

const skills = [
  {
    title: 'Frontend Development',
    description: 'Building responsive, accessible, and polished user interfaces for real projects.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    title: 'Backend Development',
    description: 'Creating secure server-side logic, APIs, authentication flows, and scalable project backends.',
    tags: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'Clerk', 'Inngest', 'Gemini API'],
  },
  {
    title: 'Database Management',
    description: 'Handling application data, schema design, persistence, and efficient data access.',
    tags: ['MongoDB', 'Mongoose', 'Collections', 'CRUD', 'Data Modeling', 'Validation'],
  },
]

const projects = [
  {
    title: 'axis-ai-career',
    description: 'AI-powered career guidance platform with ATS resume analysis, personalized roadmaps, real-time AI chat, and mock interviews.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Clerk', 'Gemini API'],
    highlights: [
      'Engineered ATS-based resume analysis, roadmap generation, AI chat, and AI-driven mock interview workflows.',
      'Integrated Gemini API with prompt engineering, context-aware responses, and structured JSON parsing.',
      'Built a secure RESTful backend with JWT/Clerk authentication, session management, and MongoDB data handling.',
    ],
    demo: 'https://github.com/anjalibind17/axis-ai-career',
    code: 'https://github.com/anjalibind17/axis-ai-career',
  },
  {
    title: 'DesiDeal',
    description: 'Scalable full-stack e-commerce platform with secure authentication, optimized product browsing, seller tools, and checkout workflows.',
    tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Clerk', 'Inngest'],
    highlights: [
      'Engineered product browsing, cart, checkout, and authentication flows for a full-stack shopping experience.',
      'Developed a Seller Dashboard for product management, inventory control, dynamic pricing, and order tracking.',
      'Implemented Inngest event workflows for order lifecycle automation, stock synchronization, and email notifications.',
    ],
    demo: 'https://desi-deal.vercel.app',
    code: 'https://github.com/anjalibind17/DesiDeal',
  },
  {
    title: 'AI-Network-Intrusion-Detection',
    description: 'Cybersecurity project for detecting network intrusion patterns and analyzing malicious traffic with machine learning workflows.',
    tech: ['Python', 'Machine Learning', 'Cybersecurity', 'Data Analysis'],
    highlights: [
      'Built an intrusion detection workflow to classify suspicious network activity and security events.',
      'Processed network traffic data for model-ready features and threat pattern analysis.',
      'Focused on practical cybersecurity monitoring for abnormal connection and attack behavior.',
    ],
    demo: 'https://ai-network-intrusion-detection-vfgvzwebx87mi8g4ktgglq.streamlit.app/',
    code: 'https://github.com/anjalibind17/AI-Network-Intrusion-Detection',
  },
  {
    title: 'SearchImage',
    description: 'A simple image search web app using the Unsplash API with image preview, external open, and direct download support.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Unsplash API'],
    demo: 'https://search-image-peach.vercel.app',
    code: 'https://github.com/anjalibind17/SearchImage',
  },
]

const experience = [
  {
    role: 'Cybersecurity Intern',
    company: 'Vodafone Idea Foundation',
    duration: 'Dec 2025 - Jan 2026',
    location: 'Remote',
    description: 'Worked on network traffic analysis and built an AI-based Network Intrusion Detection System prototype.',
    certificate: 'https://drive.google.com/file/d/1u-UIiDWMtotReoWAz9Wu1hOrJX7Pyj4n/view?usp=drive_link',
    project: 'https://ai-network-intrusion-detection-vfgvzwebx87mi8g4ktgglq.streamlit.app/',
    bullets: [
      'Analyzed network traffic patterns to identify vulnerabilities, suspicious activities, and unauthorized access attempts.',
      'Evaluated existing security protocols and controls to strengthen threat detection and mitigation strategies.',
      'Developed a prototype AI-based Network Intrusion Detection System (NIDS) to automate monitoring and enable early detection of potential threats.',
    ],
    color: 'purple',
  },
  {
    role: 'Open Source Contributor',
    company: 'GirlScript Summer of Code',
    duration: 'Aug 2025 - Oct 2025',
    location: 'Remote',
    description: 'Contributed to open-source projects by improving code, fixing issues, and collaborating through GitHub workflows.',
    certificate: '#',
    project: 'https://github.com/anjalibind17?tab=repositories',
    color: 'pink',
  },
]

const platformProfiles = [
  {
    name: 'LeetCode',
    handle: 'anjalibind15',
    profile: 'https://leetcode.com/u/anjalibind15/',
  },
  {
    name: 'CodeChef',
    handle: 'anjali_bind17',
    profile: 'https://www.codechef.com/users/anjali_bind17',
  },
  {
    name: 'Codeforces',
    handle: 'anjalibind17',
    profile: 'https://codeforces.com/profile/anjalibind17',
  },
]

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 Portfolio Stats Fetcher',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) throw new Error(`Request failed with ${response.status}`)
  return response.json()
}

const fetchText = async (url) => {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 Portfolio Stats Fetcher',
    },
  })

  if (!response.ok) throw new Error(`Request failed with ${response.status}`)
  return response.text()
}

const readBetween = (text, pattern) => {
  const match = text.match(pattern)
  return match ? match[1].trim() : null
}

const getCodeChefStars = (rating) => {
  if (!rating) return null
  if (rating >= 2500) return '7 Star'
  if (rating >= 2200) return '6 Star'
  if (rating >= 2000) return '5 Star'
  if (rating >= 1800) return '4 Star'
  if (rating >= 1600) return '3 Star'
  if (rating >= 1400) return '2 Star'
  return '1 Star'
}

const getLeetCodeStats = async ({ handle, name, profile }) => {
  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
        }
      }
      userContestRanking(username: $username) {
        rating
        globalRanking
      }
    }
  `

  const payload = await fetchJson('https://leetcode.com/graphql/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Referer: profile,
    },
    body: JSON.stringify({ query, variables: { username: handle } }),
  })

  const solved = payload.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find((item) => item.difficulty === 'All')?.count
  const contestRating = payload.data?.userContestRanking?.rating
  const ranking = payload.data?.matchedUser?.profile?.ranking || payload.data?.userContestRanking?.globalRanking

  return {
    name,
    handle,
    profile,
    solved: solved || null,
    rating: contestRating ? Math.round(contestRating) : null,
    rank: ranking || null,
  }
}

const getCodeChefStats = async ({ handle, name, profile }) => {
  const html = await fetchText(profile)
  const rating = readBetween(html, /class="rating-number">([^<]+)</)
  const stars = readBetween(html, /class="rating-star">([^<]+)</)
  const highestRating = readBetween(html, /Highest Rating\s*(\d+)/i)
  const solved = readBetween(html, /Total Problems Solved[^0-9]*(\d+)/i)
  const rank = readBetween(html, /Global Rank[^0-9]*(\d+)/i)
  const numericRating = rating ? Number(rating.replace(/\D/g, '')) : null
  const numericHighestRating = highestRating ? Number(highestRating) : null

  return {
    name,
    handle,
    profile,
    solved: solved ? Number(solved) : null,
    rating: numericRating,
    highestRating: Math.max(numericHighestRating || 0, numericRating || 0, 1503),
    stars: stars || getCodeChefStars(numericRating),
    rank: rank ? Number(rank) : null,
  }
}

const getCodeforcesStats = async ({ handle, name, profile }) => {
  const [userInfo, submissions] = await Promise.all([
    fetchJson(`https://codeforces.com/api/user.info?handles=${handle}`),
    fetchJson(`https://codeforces.com/api/user.status?handle=${handle}`),
  ])

  const user = userInfo.result?.[0] || {}
  const solvedSet = new Set(
    (submissions.result || [])
      .filter((submission) => submission.verdict === 'OK' && submission.problem)
      .map((submission) => `${submission.problem.contestId || 'gym'}-${submission.problem.index}`),
  )

  return {
    name,
    handle,
    profile,
    solved: solvedSet.size,
    rating: user.rating || null,
    maxRating: user.maxRating || null,
    rank: user.rank || null,
  }
}

const getCodingPlatformStats = async () => {
  const fetchers = {
    LeetCode: getLeetCodeStats,
    CodeChef: getCodeChefStats,
    Codeforces: getCodeforcesStats,
  }

  const settled = await Promise.allSettled(
    platformProfiles.map((platform) => fetchers[platform.name](platform)),
  )

  return settled.map((result, index) => {
    if (result.status === 'fulfilled') return result.value

    return {
      ...platformProfiles[index],
      solved: null,
      rating: null,
      rank: null,
      error: 'Stats unavailable right now',
    }
  })
}

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  response.end(JSON.stringify(payload))
}

const readBody = (request) => new Promise((resolve, reject) => {
  let body = ''
  request.on('data', (chunk) => {
    body += chunk
    if (body.length > 1_000_000) {
      reject(new Error('Request body is too large.'))
      request.destroy()
    }
  })
  request.on('end', () => resolve(body))
  request.on('error', reject)
})

const ensureMessagesFile = async () => {
  await mkdir(dataDir, { recursive: true })
  if (!existsSync(messagesFile)) {
    await writeFile(messagesFile, '[]', 'utf8')
  }
}

const saveMessage = async (message) => {
  await ensureMessagesFile()
  let current = []

  try {
    const fileContent = await readFile(messagesFile, 'utf8')
    const parsed = JSON.parse(fileContent || '[]')
    current = Array.isArray(parsed) ? parsed : []
  } catch {
    current = []
  }

  current.push({
    id: randomUUID(),
    ...message,
    createdAt: new Date().toISOString(),
  })
  await writeFile(messagesFile, JSON.stringify(current, null, 2), 'utf8')
}

const validateMessage = ({ name, email, subject, message }) => {
  if (!name || !email || !subject || !message) return 'All fields are required.'
  if (!/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email address.'
  if (message.length < 10) return 'Message should be at least 10 characters.'
  return ''
}

const server = http.createServer(async (request, response) => {
  const { method, url } = request

  if (method === 'OPTIONS') {
    return sendJson(response, 204, {})
  }

  try {
    if (method === 'GET' && url === '/api/health') return sendJson(response, 200, { status: 'ok' })
    if (method === 'GET' && url === '/api/profile') return sendJson(response, 200, profile)
    if (method === 'GET' && url === '/api/skills') return sendJson(response, 200, { skills })
    if (method === 'GET' && url === '/api/projects') return sendJson(response, 200, { projects })
    if (method === 'GET' && url === '/api/experience') return sendJson(response, 200, { experience })
    if (method === 'GET' && url === '/api/coding-platforms') {
      const platforms = await getCodingPlatformStats()
      return sendJson(response, 200, {
        platforms,
        updatedAt: new Date().toISOString(),
      })
    }

    if (method === 'POST' && url === '/api/contact') {
      const payload = JSON.parse(await readBody(request) || '{}')
      const cleanPayload = {
        name: String(payload.name || '').trim(),
        email: String(payload.email || '').trim().toLowerCase(),
        subject: String(payload.subject || '').trim(),
        message: String(payload.message || '').trim(),
      }
      const error = validateMessage(cleanPayload)

      if (error) return sendJson(response, 400, { error })

      await saveMessage(cleanPayload)
      return sendJson(response, 201, { message: 'Message saved successfully. I will get back to you soon.' })
    }

    return sendJson(response, 404, { error: 'Route not found.' })
  } catch (error) {
    return sendJson(response, 500, { error: error.message || 'Internal server error.' })
  }
})

server.listen(PORT, () => {
  console.log(`Portfolio API running on http://localhost:${PORT}`)
})
