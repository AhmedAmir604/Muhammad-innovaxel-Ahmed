import React, { useState } from 'react'
import { urlService } from '../services/api'
import { isValidUrl, buildShortUrl } from '../utils/helpers'

const UrlShortener = () => {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (starting with http:// or https://)')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await urlService.shortenUrl(url)
      setResult({
        ...response,
        shortUrl: buildShortUrl(response.shortCode)
      })
      setUrl('') 
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  

  const handleReset = () => {
    setResult(null)
    setError('')
    setUrl('')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your URL here..."
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
              required
              disabled={isLoading}
            />
            {error && (
              <p className="mt-2 text-red-400 text-sm">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!url || isLoading}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Shortening...</span>
              </div>
            ) : (
              <span>Shorten URL</span>
            )}
          </button>
        </form>

        {/* Result Display */}
        {result && (
          <div className="mt-8 p-6 bg-gray-700 rounded-xl border border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Your Short URL</h3>
              <button
                onClick={handleReset}
                className="text-gray-400 hover:text-white text-sm"
              >
                Create another
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Original URL</label>
                <p className="text-gray-300 text-sm break-all">{result.url}</p>
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1">Short URL</label>
                <div className="flex items-center space-x-2">
                  <p className="text-primary-400 font-mono text-lg flex-1">{result.shortUrl}</p>
                </div>
              </div>
              
              <div className="pt-2 text-xs text-gray-500">
                Created: {new Date(result.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UrlShortener 