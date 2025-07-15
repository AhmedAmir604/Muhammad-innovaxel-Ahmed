import React, { useState } from 'react'
import { urlService } from '../../services/api'
import { isValidUrl } from '../../utils/helpers'

const UpdateTab = () => {
  const [shortCode, setShortCode] = useState('')
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!shortCode.trim()) {
      setError('Please enter a short code')
      return
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (starting with http:// or https://)')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await urlService.updateUrl(shortCode.trim(), url)
      setResult(response)
      setShortCode('')
      setUrl('')
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
    setUrl('')
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            placeholder="Enter short code to update"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            required
            disabled={isLoading}
          />
        </div>
        
        <div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter new URL"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            required
            disabled={isLoading}
          />
          {error && (
            <p className="mt-2 text-red-400 text-sm">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!shortCode || !url || isLoading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          {isLoading ? 'Updating...' : 'Update URL'}
        </button>
      </form>

      {result && (
        <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">URL Updated</h3>
            <button
              onClick={handleReset}
              className="text-gray-400 hover:text-white text-sm"
            >
              Clear
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Updated URL</label>
              <p className="text-gray-300 text-sm break-all">{result.url}</p>
            </div>
            
            <div>
              <label className="block text-xs text-gray-400 mb-1">Short Code</label>
              <p className="text-green-400 font-mono text-sm">{result.shortCode}</p>
            </div>
            
            <div className="pt-2 text-xs text-gray-500">
              Originally created: {new Date(result.createdAt).toLocaleString()} | 
              Last updated: {new Date(result.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateTab 