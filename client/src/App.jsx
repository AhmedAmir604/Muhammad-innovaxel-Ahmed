import React from 'react'
import Layout from './components/Layout'
import Hero from './components/Hero'
import UrlShortener from './components/UrlShortener'

function App() {
  return (
    <Layout>
      <Hero />
      <UrlShortener />
    </Layout>
  )
}

export default App
