import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Blog from './pages/Blog'
import Post from './pages/Post'
import Diary from './pages/Diary'

import styles from './styles/App.module.css'

function App() {
  return (
    <div className={styles.nav}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path='/diary' element={<Diary />} />
        <Route path="/blog/:id" element={<Post />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
