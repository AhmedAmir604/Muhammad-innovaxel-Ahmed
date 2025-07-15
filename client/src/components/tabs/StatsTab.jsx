import React, { useState } from 'react'
import { urlService } from '../../services/api'

const StatsTab = () => {
  const [shortCode, setShortCode] = useState('')
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

    setIsLoading(true)
    
    try {
      const response = await urlService.getStats(shortCode.trim())
      setResult(response)
      setShortCode('')
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
            placeholder="Enter short code for stats"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
            disabled={isLoading}
          />
          {error && (
            <p className="mt-2 text-red-400 text-sm">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!shortCode || isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          {isLoading ? 'Getting Stats...' : 'Get Statistics'}
        </button>
      </form>

      {result && (
        <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">URL Statistics</h3>
            <button
              onClick={handleReset}
              className="text-gray-400 hover:text-white text-sm"
            >
              Clear
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Original URL</label>
              <p className="text-gray-300 text-sm break-all">{result.url}</p>
            </div>
            
            <div>
              <label className="block text-xs text-gray-400 mb-1">Short Code</label>
              <p className="text-purple-400 font-mono text-sm">{result.shortCode}</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-300 mb-1">
                  {result.accessCount}
                </div>
                <div className="text-sm text-gray-400">Total Clicks</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
              <div>
                <label className="block text-gray-400 mb-1">Created</label>
                <div>{new Date(result.createdAt).toLocaleString()}</div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Last Accessed</label>
                <div>{new Date(result.updatedAt).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StatsTab 