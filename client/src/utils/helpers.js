// URL validation
export const isValidUrl = (string) => {
  try {
    const url = new URL(string)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

// Format URL for display (truncate if too long)
export const formatUrl = (url, maxLength = 50) => {
  if (!url) return ''
  if (url.length <= maxLength) return url
  return url.substring(0, maxLength) + '...'
}

// Format date to readable string
export const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}


// Build full short URL
export const buildShortUrl = (shortCode, baseUrl = 'http://localhost:5000') => {
  return `${baseUrl}/${shortCode}`
}

// Extract short code from URL
export const extractShortCode = (url) => {
  try {
    const urlObj = new URL(url)
    return urlObj.pathname.substring(1) // Remove leading slash
  } catch {
    return null
  }
} 