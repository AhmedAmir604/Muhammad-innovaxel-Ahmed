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
      setError('Please enter a valid URL')
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

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          placeholder="Short code to update..."
          className="input-field"
          required
          disabled={isLoading}
        />
        
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="New URL destination..."
          className="input-field"
          required
          disabled={isLoading}
        />
        
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={!shortCode || !url || isLoading}
          className="btn-primary w-full disabled:opacity-50 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        >
          {isLoading ? 'Updating...' : 'Update URL'}
        </button>
      </form>

      {result && (
        <div className="glass rounded-xl p-4 border border-green-500/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-green-400 text-sm font-medium">✓ Updated</span>
            <button
              onClick={() => setResult(null)}
              className="text-neutral-400 hover:text-white text-sm"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 glass rounded-lg">
              <div className="text-xs text-neutral-400 mb-1">New URL</div>
              <div className="text-neutral-300 text-sm break-all">{result.url}</div>
            </div>
            
            <div className="text-xs text-neutral-500 text-center">
              Code: {result.shortCode} • Updated {new Date(result.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateTab 