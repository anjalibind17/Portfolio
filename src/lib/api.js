const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const payload = await response.json().catch(() => ({
    error: 'Server response was not valid JSON. Please make sure the backend is running.',
  }))

  if (!response.ok) {
    throw new Error(payload.error || 'Something went wrong. Please try again.')
  }

  return payload
}

export const api = {
  getProfile: () => request('/api/profile'),
  getProjects: () => request('/api/projects'),
  getSkills: () => request('/api/skills'),
  getExperience: () => request('/api/experience'),
  getCodingPlatforms: () => request('/api/coding-platforms'),
  sendMessage: (message) => request('/api/contact', {
    method: 'POST',
    body: JSON.stringify(message),
  }),
}
