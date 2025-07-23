import React from 'react'
import Tabs from './Tabs'
import CreateTab from './tabs/CreateTab'
import GetTab from './tabs/GetTab'
import UpdateTab from './tabs/UpdateTab'
import DeleteTab from './tabs/DeleteTab'
import StatsTab from './tabs/StatsTab'

const UrlShortener = () => {
  const tabs = [
    {
      label: 'Create',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      content: <CreateTab />
    },
    {
      label: 'Get',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      content: <GetTab />
    },
    {
      label: 'Update',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      content: <UpdateTab />
    },
    {
      label: 'Delete',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      content: <DeleteTab />
    },
    {
      label: 'Stats',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      content: <StatsTab />
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 via-accent-500/20 to-primary-500/20 rounded-3xl blur-xl opacity-50"></div>
        
        <div className="relative glass-strong rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-500">
          {/* Header with shimmer effect */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full animate-pulse"></div>
              <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-neutral-200 bg-clip-text text-transparent">
                URL Management
              </h2>
              <div className="w-3 h-3 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
            <p className="text-neutral-400 text-sm max-w-md mx-auto">
              Create, manage, and track your shortened URLs with powerful tools
            </p>
          </div>
          
          <Tabs tabs={tabs} defaultTab={0} />
        </div>
      </div>
    </div>
  )
}

export default UrlShortener 