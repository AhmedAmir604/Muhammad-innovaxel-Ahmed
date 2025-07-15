import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">

      <header className="text-center py-6">
        <h1 className="text-2xl font-bold text-white">
          Short<span className="text-primary-500">Link</span>
        </h1>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="text-center py-6 mt-auto">
        <p className="text-gray-400 text-sm">© 2025 Muhammad Ahmed</p>
      </footer>
      
    </div>
  )
}

export default Layout 