import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const urlService = {
  // Shorten a URL
  shortenUrl: async (url) => {
    try {
      const response = await api.post('/shorten', { url })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to shorten URL')
    }
  },

  // Get original URL by short code
  getUrl: async (shortCode) => {
    try {
      const response = await api.get(`/shorten/${shortCode}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'URL not found')
    }
  },

  // Update URL
  updateUrl: async (shortCode, newUrl) => {
    try {
      const response = await api.put(`/shorten/${shortCode}`, { url: newUrl })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update URL')
    }
  }
}

export default api 