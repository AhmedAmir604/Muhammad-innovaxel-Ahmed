import React from 'react'

const Hero = () => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white via-neutral-100 to-neutral-200 bg-clip-text text-transparent">
              Make Your{' '}
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-accent-500 bg-clip-text text-transparent animate-pulse">
                Links
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-xl rounded-lg"></div>
            </span>
            <br />
            <span className="bg-gradient-to-r from-neutral-100 to-neutral-300 bg-clip-text text-transparent">
              Shorter & Smarter
            </span>
          </h1>
        </div>
        
        <p className="text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Transform long, complex URLs into clean, trackable short links with powerful analytics
        </p>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <div className="glass px-4 py-2 rounded-full hover:glass-strong transition-all duration-300 group">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">Real-time Analytics</span>
            </div>
          </div>
          <div className="glass px-4 py-2 rounded-full hover:glass-strong transition-all duration-300 group">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">Custom Aliases</span>
            </div>
          </div>
          <div className="glass px-4 py-2 rounded-full hover:glass-strong transition-all duration-300 group">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">Secure & Fast</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero 