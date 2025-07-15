import React, { useState } from 'react'

const Tabs = ({ tabs, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <div className="w-full">
      <div className="border-b border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === index
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                {tab.icon && <span className="text-lg">{tab.icon}</span>}
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-8">
        {tabs[activeTab]?.content}
      </div>
    </div>
  )
}

export default Tabs 