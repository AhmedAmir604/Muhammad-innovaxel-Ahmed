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
      icon: '✨',
      content: <CreateTab />
    },
    {
      label: 'Get URL',
      icon: '🔍',
      content: <GetTab />
    },
    {
      label: 'Update',
      icon: '✏️',
      content: <UpdateTab />
    },
    {
      label: 'Delete',
      icon: '🗑️',
      content: <DeleteTab />
    },
    {
      label: 'Statistics',
      icon: '📊',
      content: <StatsTab />
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">URL Management</h2>
          <p className="text-gray-400">Create, manage, and track your shortened URLs</p>
        </div>
        
        <Tabs tabs={tabs} defaultTab={0} />
      </div>
    </div>
  )
}

export default UrlShortener 