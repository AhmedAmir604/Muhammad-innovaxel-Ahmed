import React, { useState, useEffect, useRef } from 'react'
import { urlService } from '../../services/api'


const GetTab = () => {
  const [shortCode, setShortCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [autoRedirect, setAutoRedirect] = useState(true)
  const redirectTimeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current)
      }
    }
  },[])

  const handleRedirect = (url) => {
    const formattedUrl = url.startsWith('http://') || url.startsWith('https://') 
      ? url 
      : `https://${url}`
    
    window.open(formattedUrl, '_blank', 'noopener,noreferrer')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!shortCode.trim()) {
      setError('Please enter a short code')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await urlService.getUrl(shortCode.trim())
      setResult(response)
      setShortCode('')
      if (autoRedirect) {
        redirectTimeoutRef.current = setTimeout(() => {
          handleRedirect(response.url)
        }, 1500)
      }
    } catch (error) {
      setError(error.message)
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError('')
    setShortCode('')
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            placeholder="Enter short code (e.g., 4Zn914)"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
            disabled={isLoading}
          />
          {error && (
            <p className="mt-2 text-red-400 text-sm">{error}</p>
          )}
        </div>
        
        <div className="flex items-center justify-start pt-2">
          <label htmlFor="auto-redirect-checkbox" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                id="auto-redirect-checkbox"
                type="checkbox"
                className="sr-only"
                checked={autoRedirect}
                onChange={() => setAutoRedirect(!autoRedirect)}
              />
              <div className={`block w-10 h-6 rounded-full transition-colors ${autoRedirect ? 'bg-blue-600' : 'bg-gray-600'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${autoRedirect ? 'transform translate-x-full' : ''}`}></div>
            </div>
            <div className="ml-3 text-gray-300 text-sm font-medium">
              Auto-redirect on success
            </div>
          </label>
        </div>

        <button
          type="submit"
          disabled={!shortCode || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          {isLoading ? 'Getting...' : 'Get URL'}
        </button>
      </form>

      {result && (
        <div className="p-4 bg-gray-700 rounded-lg border border-gray-600 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">Retrieved URL</h3>
            <button
              onClick={handleReset}
              className="text-gray-400 hover:text-white text-sm"
            >
              Clear
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Original URL</label>
              <p className="text-gray-300 text-sm break-all">{result.url}</p>
            </div>
            
            <div>
              <label className="block text-xs text-gray-400 mb-1">Short Code</label>
              <p className="text-blue-400 font-mono text-sm">{result.shortCode}</p>
            </div>
            
            <div className="pt-2 text-xs text-gray-500">
              Created: {new Date(result.createdAt).toLocaleString()} | 
              Last accessed: {new Date(result.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GetTab
