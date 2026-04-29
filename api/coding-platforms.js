const platformProfiles = [
  {
    name: 'LeetCode',
    handle: 'anjalibind15',
    profile: 'https://leetcode.com/u/anjalibind15/',
    solved: 188,
    rating: 1640,
    rank: 823993,
  },
  {
    name: 'CodeChef',
    handle: 'anjali_bind17',
    profile: 'https://www.codechef.com/users/anjali_bind17',
    solved: 246,
    rating: 1224,
    highestRating: 1503,
  },
  {
    name: 'Codeforces',
    handle: 'anjalibind17',
    profile: 'https://codeforces.com/profile/anjalibind17',
    solved: 13,
    rating: 1044,
    maxRating: 1044,
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

const toNumber = (value) => {
  if (value === null || value === undefined || value === '') return null
  const number = Number(String(value).replace(/,/g, '').replace(/[^\d.]/g, ''))
  return Number.isFinite(number) ? number : null
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
  const highestRating = readBetween(html, /Highest Rating[\s\S]*?(\d{3,5})/i)
  const solved = readBetween(html, /Total Problems Solved[\s\S]*?(\d+)/i)
  const rank = readBetween(html, /Global Rank[\s\S]*?([\d,]+)/i)
  const numericRating = toNumber(rating)
  const numericHighestRating = toNumber(highestRating)

  return {
    name,
    handle,
    profile,
    solved: toNumber(solved),
    rating: numericRating,
    highestRating: numericHighestRating || numericRating,
    stars: stars || getCodeChefStars(numericRating),
    rank: toNumber(rank),
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
      error: 'Stats unavailable right now',
    }
  })
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ error: 'Method not allowed.' })
  }

  const platforms = await getCodingPlatformStats()
  response.setHeader('Cache-Control', 'no-store, max-age=0')
  return response.status(200).json({
    platforms,
    updatedAt: new Date().toISOString(),
  })
}
