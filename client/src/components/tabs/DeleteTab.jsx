import React, { useState } from 'react'
import { urlService } from '../../services/api'

const DeleteTab = () => {
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
      await urlService.deleteUrl(shortCode.trim())
      setResult({ shortCode: shortCode.trim() })
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
            placeholder="Enter short code to delete"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
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
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          {isLoading ? 'Deleting...' : 'Delete URL'}
        </button>
      </form>

      {result && (
        <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">URL Deleted</h3>
            <button
              onClick={handleReset}
              className="text-gray-400 hover:text-white text-sm"
            >
              Clear
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Deleted Short Code</label>
              <p className="text-red-400 font-mono text-sm">{result.shortCode}</p>
            </div>
            
            <div className="pt-2 text-xs text-gray-500">
              URL successfully deleted
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteTab 