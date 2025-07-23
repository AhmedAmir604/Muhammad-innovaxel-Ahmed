import React, { useState } from 'react'
import { urlService } from '../../services/api'

const GetTab = () => {
  const [shortCode, setShortCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

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

    const code = shortCode.split("/").pop();

    setShortCode(code);

    setIsLoading(true)
    
    try {

      const response = await urlService.getUrl(code.trim())
      // console.log(response);
      setResult(response)
      setShortCode('')
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
          placeholder="Enter short code..."
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
          className="btn-primary w-full disabled:opacity-50"
        >
          {isLoading ? 'Getting...' : 'Get URL'}
        </button>
      </form>

      {result && (
        <div className="glass rounded-xl p-4 border border-blue-500/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-blue-400 text-sm font-medium">✓ Found</span>
            <button
              onClick={() => setResult(null)}
              className="text-neutral-400 hover:text-white text-sm"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 glass rounded-lg">
              <span className="text-neutral-300 text-sm break-all pr-2">{result.url}</span>
              <button
                onClick={() => handleRedirect(result.url)}
                className="text-neutral-400 hover:text-white p-1 flex-shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
            
            <div className="text-xs text-neutral-500 text-center">
              Code: {result.shortCode} • {new Date(result.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GetTab
