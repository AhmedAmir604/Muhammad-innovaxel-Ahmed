import React, { useState } from 'react'
import { urlService } from '../services/api'
import { isValidUrl, buildShortUrl } from '../utils/helpers'

const UrlShortener = () => {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  
  // New state for testing getUrl
  const [shortCode, setShortCode] = useState('')
  const [isGetting, setIsGetting] = useState(false)
  const [getResult, setGetResult] = useState(null)
  const [getError, setGetError] = useState('')

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

  // New function to test getUrl
  const handleGetUrl = async (e) => {
    e.preventDefault()
    setGetError('')
    
    if (!shortCode.trim()) {
      setGetError('Please enter a short code')
      return
    }

    setIsGetting(true)
    
    try {
      const response = await urlService.getUrl(shortCode.trim())
      setGetResult(response)
      setShortCode('')
    } catch (error) {
      setGetError(error.message)
      setGetResult(null)
    } finally {
      setIsGetting(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError('')
    setUrl('')
  }

  const handleGetReset = () => {
    setGetResult(null)
    setGetError('')
    setShortCode('')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* URL Shortener Section */}
      <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-6">Create Short URL</h2>
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

              <div>
                <label className="block text-xs text-gray-400 mb-1">Short Code</label>
                <p className="text-primary-300 font-mono text-sm">{result.shortCode}</p>
              </div>
              
              <div className="pt-2 text-xs text-gray-500">
                Created: {new Date(result.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-6">Get Original URL</h2>
        <form onSubmit={handleGetUrl} className="space-y-6">
          <div>
            <input
              type="text"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              placeholder="Enter short code (e.g., 4Zn914)"
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              required
              disabled={isGetting}
            />
            {getError && (
              <p className="mt-2 text-red-400 text-sm">{getError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!shortCode || isGetting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200"
          >
            {isGetting ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Getting...</span>
              </div>
            ) : (
              <span>Get Original URL</span>
            )}
          </button>
        </form>

        {getResult && (
          <div className="mt-8 p-6 bg-gray-700 rounded-xl border border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Retrieved URL</h3>
              <button
                onClick={handleGetReset}
                className="text-gray-400 hover:text-white text-sm"
              >
                Clear
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Original URL</label>
                <p className="text-gray-300 text-sm break-all">{getResult.url}</p>
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1">Short Code</label>
                <p className="text-blue-400 font-mono text-sm">{getResult.shortCode}</p>
              </div>
              
              <div className="pt-2 text-xs text-gray-500">
                Created: {new Date(getResult.createdAt).toLocaleString()} | 
                Last accessed: {new Date(getResult.updatedAt).toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UrlShortener 