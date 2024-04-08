import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'

import Wrapper from '../components/Wrapper'
import Cd from '../components/Cd'
import Footer from '../components/Footer'
import Loading from '../components/Loading'

import { getPostList } from '../store/listSlice'

import github from '../utils/github'
import { mdToHtml} from '../utils/postTools'

import styles from '../styles/Markdown.module.css'


const Post = () => {
  const { id } = useParams() //* 这里的 id 是 number（第几篇文章）
  // const list = useSelector(getPostList)

  // if(!list || list.length === 0){
  //   // window.location.href = `https://github.com/mengqiuleo/mengqiuleo.github.io/issues/${id}`
  //   window.location.assign(`https://github.com/mengqiuleo/mengqiuleo.github.io/issues/${id}`)
  // }
  // let signalPost = list.find(post => post.number == id)

  // if(!signalPost || Object.keys(signalPost) == 0) {
    
  // }

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await github.getIssue(id)
        res['htmlContent'] = await mdToHtml(res.body)
        res['date'] = format(new Date(res.created_at), 'yyyy-MM-dd')
        setData(res)
        setLoading(false)
      } catch (err) {
        console.error('加载单个 issues 出错', error)
        window.location.assign(`https://github.com/mengqiuleo/mengqiuleo.github.io/issues/${id}`)
      }
    }

    fetchData()
  }, [id])

  // 如果数据还在加载中，显示加载中的状态
  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <Wrapper>
      <p className={styles.title}>{data.title}</p>
      <p className={styles.date}>{data.date}</p>
      <article className='md'>
        <div dangerouslySetInnerHTML={{ __html: data.htmlContent }} />
      </article>
      <Cd />
      <Footer />
    </Wrapper>
  )
}

export default Post