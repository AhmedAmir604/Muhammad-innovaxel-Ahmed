import React, { useState } from 'react'
import { urlService } from '../../services/api'
import { isValidUrl, buildShortUrl } from '../../utils/helpers'

const CreateTab = () => {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL')
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

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative group">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/your-very-long-url..."
            className="input-field pr-12 group-hover:shadow-lg transition-all duration-300"
            required
            disabled={isLoading}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 group-hover:text-neutral-300 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        </div>
        
        {error && (
          <div className="error-card rounded-xl p-3 animate-fade-in">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!url || isLoading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Creating magic...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {console.log(import.meta.env.VITE_MODE)}
                <span>Shorten URL</span>
              </>
            )}
          </div>
        </button>
      </form>

      {result && (
        <div className="success-card rounded-2xl p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-green-400 font-semibold">Link Created!</span>
            </div>
            <button
              onClick={() => setResult(null)}
              className="text-neutral-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Main short URL display */}
            <div className="relative group">
              <div className="glass-strong rounded-xl p-4 border border-primary-500/30 hover:border-primary-500/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-3">
                    <div className="text-xs text-neutral-400 mb-1">Your Short URL</div>
                    <div className="text-primary-400 font-mono text-lg font-semibold break-all">
                      {result.shortUrl}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(result.shortUrl)}
                    className={`btn-secondary px-4 py-2 text-sm transition-all duration-300 ${
                      copied ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''
                    }`}
                  >
                    {copied ? (
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Copied!</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Additional info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="glass rounded-lg p-3">
                <div className="text-xs text-neutral-400 mb-1">Short Code</div>
                <div className="text-accent-400 font-mono text-sm">{result.shortCode}</div>
              </div>
              <div className="glass rounded-lg p-3">
                <div className="text-xs text-neutral-400 mb-1">Created</div>
                <div className="text-neutral-300 text-sm">{new Date(result.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
            
            {/* Original URL preview */}
            <div className="glass rounded-lg p-3">
              <div className="text-xs text-neutral-400 mb-1">Original URL</div>
              <div className="text-neutral-300 text-sm break-all opacity-75">{result.url}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateTab 