import React, { useState } from 'react'
import { urlService } from '../../services/api'

const DeleteTab = () => {
  const [shortCode, setShortCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!shortCode.trim()) {
      setError('Please enter a short code')
      return
    }

    setShowConfirm(true)
  }
  
  const code = shortCode.split("/").pop();

  const handleConfirmDelete = async () => {
    setIsLoading(true)
    setShowConfirm(false)
    
    try {
      await urlService.deleteUrl(code.trim())
      setResult({ code: code.trim() })
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
          placeholder="Short code to delete..."
          className="input-field"
          required
          disabled={isLoading}
        />
        
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <div className="glass rounded-lg p-3 border border-red-500/20">
          <p className="text-xs text-neutral-400">
            ⚠️ This action cannot be undone
          </p>
        </div>

        <button
          type="submit"
          disabled={!shortCode || isLoading}
          className="btn-primary w-full disabled:opacity-50 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
        >
          {isLoading ? 'Deleting...' : 'Delete URL'}
        </button>
      </form>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="glass rounded-xl p-4 border border-red-500/30">
          <div className="text-center space-y-3">
            <h3 className="text-sm font-medium text-white">Confirm Deletion</h3>
            <p className="text-xs text-neutral-400">
              Delete short code <span className="text-red-400 font-mono">{shortCode}</span>?
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="btn-secondary flex-1 text-sm py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="btn-primary flex-1 text-sm py-2 bg-gradient-to-r from-red-500 to-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="glass rounded-xl p-4 border border-red-500/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-red-400 text-sm font-medium">✓ Deleted</span>
            <button
              onClick={() => setResult(null)}
              className="text-neutral-400 hover:text-white text-sm"
            >
              ×
            </button>
          </div>
          
          <div className="text-xs text-neutral-500 text-center">
            Code: {result.shortCode} • Permanently deleted
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteTab 