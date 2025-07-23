import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating orbs for visual appeal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="text-center py-8 animate-fade-in">
          <div className="inline-flex items-center space-x-3 glass px-6 py-3 rounded-2xl hover:glass-strong transition-all duration-300">
            <div className="relative">
              {/* <div className="w-8 h-8 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">S</span>
              </div> */}
              <div className="absolute -inset-1 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg blur opacity-30 pulse-ring"></div>
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-white via-neutral-100 to-neutral-200 bg-clip-text text-transparent">
              Short<span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Link</span>
            </h1>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-4 max-w-4xl animate-slide-up">
          {children}
        </main>

        <footer className="text-center py-6">
          <div className="glass inline-block px-4 py-2 rounded-full hover:glass-strong transition-all duration-300">
            <p className="text-neutral-400 text-xs">© 2025 Muhammad Ahmed</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Layout 