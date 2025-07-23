import React, { useState } from 'react'

const Tabs = ({ tabs, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <div className="w-full">
      {/* Enhanced tab navigation */}
      <div className="relative glass-strong rounded-2xl p-2 mb-8 border border-white/10">
        <nav className="flex relative">
          {/* Active tab background indicator */}
          <div 
            className="absolute top-1 bottom-1 bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 rounded-xl transition-all duration-300 ease-out shadow-lg"
            style={{
              left: `${(activeTab * 100) / tabs.length}%`,
              width: `${100 / tabs.length}%`,
              transform: 'translateX(4px)',
              right: '4px'
            }}
          />
          
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`relative flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex-1 justify-center z-10 group ${
                activeTab === index
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <div className={`transition-all duration-300 ${
                activeTab === index 
                  ? 'scale-110 text-white' 
                  : 'group-hover:scale-105 group-hover:text-neutral-200'
              }`}>
                {tab.icon}
              </div>
              <span className={`hidden sm:inline transition-all duration-300 ${
                activeTab === index 
                  ? 'text-white font-semibold' 
                  : 'group-hover:text-neutral-200'
              }`}>
                {tab.label}
              </span>
              
              {/* Active indicator dot */}
              {activeTab === index && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-80 animate-pulse"></div>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab content with enhanced animation */}
      <div className="relative">
        <div 
          key={activeTab}
          className="animate-fade-in"
          style={{
            animation: 'fadeInUp 0.4s ease-out'
          }}
        >
          {tabs[activeTab]?.content}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Tabs 