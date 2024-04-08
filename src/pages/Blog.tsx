import { useEffect, useState } from 'react'

import Content from '../components/Blog/Content'
import Footer from '../components/Footer'
import Wrapper from '../components/Wrapper'
import Loading from '../components/Loading'

import github from '../utils/github'

// 整体的 blog list 页面
const blog = () => {
  const [issues, setIssues] = useState({})
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await github.listIssues()
        setIssues(res)
        setLoading(false)
      } catch (err) {
        console.error('加载 issues list 出错', error)
        window.location.assign(`https://github.com/mengqiuleo/mengqiuleo.github.io/issues`)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <Wrapper>
      <Content posts={issues} />
      <Footer />
    </Wrapper>
  )
}

export default blog