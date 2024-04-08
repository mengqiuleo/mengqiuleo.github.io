import { useState } from 'react'
import { Link, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Blog from './pages/Blog'
import Post from './pages/Post'

import styles from './styles/App.module.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.nav}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<Post />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
