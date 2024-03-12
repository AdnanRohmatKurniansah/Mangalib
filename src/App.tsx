import './App.css'
import RecommendedList from './components/RecommendedList'
import Popular from './components/Popular'
import ManhwaList from './components/ManhwaList'
import Layout from './layouts/Layout'
import { DescContext } from './context/DescContext'
import { useState } from 'react'

function App() {
  const [desc, setDesc] = useState<string | null>(null);

  return (
    <DescContext.Provider value={{ desc, setDesc }}>
      <Layout>
        <RecommendedList />
          <Popular />
        <ManhwaList />
      </Layout>
    </DescContext.Provider>
  )
}

export default App
