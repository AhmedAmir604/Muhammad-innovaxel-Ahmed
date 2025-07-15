import React, { useState } from 'react'
import { urlService } from '../services/api'
import { isValidUrl, buildShortUrl } from '../utils/helpers'

const UrlShortener = () => {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  
  const [shortCode, setShortCode] = useState('')
  const [isGetting, setIsGetting] = useState(false)
  const [getResult, setGetResult] = useState(null)
  const [getError, setGetError] = useState('')

  const [updateShortCode, setUpdateShortCode] = useState('')
  const [updateUrl, setUpdateUrl] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateResult, setUpdateResult] = useState(null)
  const [updateError, setUpdateError] = useState('')

  const [deleteShortCode, setDeleteShortCode] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteResult, setDeleteResult] = useState(null)
  const [deleteError, setDeleteError] = useState('')

  const [statsShortCode, setStatsShortCode] = useState('')
  const [isGettingStats, setIsGettingStats] = useState(false)
  const [statsResult, setStatsResult] = useState(null)
  const [statsError, setStatsError] = useState('')

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

  const handleUpdateUrl = async (e) => {
    e.preventDefault()
    setUpdateError('')
    
    if (!updateShortCode.trim()) {
      setUpdateError('Please enter a short code')
      return
    }

    if (!isValidUrl(updateUrl)) {
      setUpdateError('Please enter a valid URL (starting with http:// or https://)')
      return
    }

    setIsUpdating(true)
    
    try {
      const response = await urlService.updateUrl(updateShortCode.trim(), updateUrl)
      setUpdateResult(response)
      setUpdateShortCode('')
      setUpdateUrl('')
    } catch (error) {
      setUpdateError(error.message)
      setUpdateResult(null)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteUrl = async (e) => {
    e.preventDefault()
    setDeleteError('')
    
    if (!deleteShortCode.trim()) {
      setDeleteError('Please enter a short code')
      return
    }

    setIsDeleting(true)
    
    try {
      await urlService.deleteUrl(deleteShortCode.trim())
      setDeleteResult({ shortCode: deleteShortCode.trim() })
      setDeleteShortCode('')
    } catch (error) {
      setDeleteError(error.message)
      setDeleteResult(null)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleGetStats = async (e) => {
    e.preventDefault()
    setStatsError('')
    
    if (!statsShortCode.trim()) {
      setStatsError('Please enter a short code')
      return
    }

    setIsGettingStats(true)
    
    try {
      const response = await urlService.getStats(statsShortCode.trim())
      setStatsResult(response)
      setStatsShortCode('')
    } catch (error) {
      setStatsError(error.message)
      setStatsResult(null)
    } finally {
      setIsGettingStats(false)
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

  const handleUpdateReset = () => {
    setUpdateResult(null)
    setUpdateError('')
    setUpdateShortCode('')
    setUpdateUrl('')
  }

  const handleDeleteReset = () => {
    setDeleteResult(null)
    setDeleteError('')
    setDeleteShortCode('')
  }

  const handleStatsReset = () => {
    setStatsResult(null)
    setStatsError('')
    setStatsShortCode('')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">

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

      <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-6">Update URL</h2>
        <form onSubmit={handleUpdateUrl} className="space-y-6">
          <div>
            <input
              type="text"
              value={updateShortCode}
              onChange={(e) => setUpdateShortCode(e.target.value)}
              placeholder="Enter short code to update"
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg"
              required
              disabled={isUpdating}
            />
          </div>
          
          <div>
            <input
              type="url"
              value={updateUrl}
              onChange={(e) => setUpdateUrl(e.target.value)}
              placeholder="Enter new URL"
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg"
              required
              disabled={isUpdating}
            />
            {updateError && (
              <p className="mt-2 text-red-400 text-sm">{updateError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!updateShortCode || !updateUrl || isUpdating}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200"
          >
            {isUpdating ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Updating...</span>
              </div>
            ) : (
              <span>Update URL</span>
            )}
          </button>
        </form>

        {updateResult && (
          <div className="mt-8 p-6 bg-gray-700 rounded-xl border border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Updated URL</h3>
              <button
                onClick={handleUpdateReset}
                className="text-gray-400 hover:text-white text-sm"
              >
                Clear
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Updated URL</label>
                <p className="text-gray-300 text-sm break-all">{updateResult.url}</p>
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1">Short Code</label>
                <p className="text-green-400 font-mono text-sm">{updateResult.shortCode}</p>
              </div>
              
              <div className="pt-2 text-xs text-gray-500">
                Originally created: {new Date(updateResult.createdAt).toLocaleString()} | 
                Last updated: {new Date(updateResult.updatedAt).toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-6">Delete URL</h2>
        <form onSubmit={handleDeleteUrl} className="space-y-6">
          <div>
            <input
              type="text"
              value={deleteShortCode}
              onChange={(e) => setDeleteShortCode(e.target.value)}
              placeholder="Enter short code to delete"
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-lg"
              required
              disabled={isDeleting}
            />
            {deleteError && (
              <p className="mt-2 text-red-400 text-sm">{deleteError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!deleteShortCode || isDeleting}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200"
          >
            {isDeleting ? (
              <div className="flex items-center justify-center space-x-2">
                <span>Deleting...</span>
              </div>
            ) : (
              <span>Delete URL</span>
            )}
          </button>
        </form>

        {deleteResult && (
          <div className="mt-8 p-6 bg-gray-700 rounded-xl border border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">URL Deleted</h3>
              <button
                onClick={handleDeleteReset}
                className="text-gray-400 hover:text-white text-sm"
              >
                Clear
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Deleted Short Code</label>
                <p className="text-red-400 font-mono text-sm">{deleteResult.shortCode}</p>
              </div>
              
              <div className="pt-2 text-xs text-gray-500">
                URL successfully deleted
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-6">Get Statistics</h2>
        <form onSubmit={handleGetStats} className="space-y-6">
          <div>
            <input
              type="text"
              value={statsShortCode}
              onChange={(e) => setStatsShortCode(e.target.value)}
              placeholder="Enter short code for stats"
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
              required
              disabled={isGettingStats}
            />
            {statsError && (
              <p className="mt-2 text-red-400 text-sm">{statsError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!statsShortCode || isGettingStats}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200"
          >
            {isGettingStats ? (
              <div className="flex items-center justify-center space-x-2">
                <span>Getting Stats...</span>
              </div>
            ) : (
              <span>Get Statistics</span>
            )}
          </button>
        </form>

        {statsResult && (
          <div className="mt-8 p-6 bg-gray-700 rounded-xl border border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">URL Statistics</h3>
              <button
                onClick={handleStatsReset}
                className="text-gray-400 hover:text-white text-sm"
              >
                Clear
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Original URL</label>
                <p className="text-gray-300 text-sm break-all">{statsResult.url}</p>
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1">Short Code</label>
                <p className="text-purple-400 font-mono text-sm">{statsResult.shortCode}</p>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Total Clicks</label>
                <p className="text-purple-300 text-2xl font-bold">{statsResult.accessCount}</p>
              </div>
              
              <div className="pt-2 text-xs text-gray-500">
                Created: {new Date(statsResult.createdAt).toLocaleString()} | 
                Last accessed: {new Date(statsResult.updatedAt).toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UrlShortener 