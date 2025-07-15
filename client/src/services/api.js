import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const urlService = {
  shortenUrl: async (url) => {
    try {
      const response = await api.post('/shorten', { url })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to shorten URL')
    }
  },

  getUrl: async (shortCode) => {
    try {
      const response = await api.get(`/shorten/${shortCode}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'URL not found')
    }
  },

  updateUrl: async (shortCode, newUrl) => {
    try {
      const response = await api.put(`/shorten/${shortCode}`, { url: newUrl })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update URL')
    }
  },

  deleteUrl: async (shortCode) => {
    try {
      await api.delete(`/shorten/${shortCode}`)
      return { success: true }
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete URL')
    }
  },

  getStats: async (shortCode) => {
    try {
      const response = await api.get(`/shorten/statistics/${shortCode}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get stats')
    }
  }
}

export default api 