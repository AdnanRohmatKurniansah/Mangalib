import './App.css'
import RecommendedList from './components/RecommendedList'
import Popular from './components/Popular'
import ManhwaList from './components/ManhwaList'
import Layout from './layouts/Layout'

function App() {

  return (
    <Layout>
        <RecommendedList />
          <Popular />
        <ManhwaList />
    </Layout>
  )
}

export default App
