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

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          placeholder="Short code for analytics..."
          className="input-field"
          required
          disabled={isLoading}
        />
        
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={!shortCode || isLoading}
          className="btn-primary w-full disabled:opacity-50 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
        >
          {isLoading ? 'Loading...' : 'Get Analytics'}
        </button>
      </form>

      {result && (
        <div className="glass rounded-xl p-4 border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-purple-400 text-sm font-medium">📊 Analytics</span>
            <button
              onClick={() => setResult(null)}
              className="text-neutral-400 hover:text-white text-sm"
            >
              ×
            </button>
          </div>

          {/* Main Stats */}
          <div className="text-center mb-4 p-4 glass rounded-lg bg-gradient-to-br from-purple-500/10 to-violet-500/10">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              {formatNumber(result.accessCount)}
            </div>
            <div className="text-xs text-neutral-400">Total Clicks</div>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 glass rounded-lg">
              <div className="text-xs text-neutral-400 mb-1">Original URL</div>
              <div className="text-neutral-300 text-sm break-all">{result.url}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2 glass rounded-lg text-center">
                <div className="text-neutral-400">Created</div>
                <div className="text-neutral-300">{new Date(result.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="p-2 glass rounded-lg text-center">
                <div className="text-neutral-400">Last Access</div>
                <div className="text-neutral-300">{new Date(result.updatedAt).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="text-xs text-neutral-500 text-center">
              Code: {result.shortCode} • Status: Active
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StatsTab 