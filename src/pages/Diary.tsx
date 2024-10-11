import Wrapper from '../components/Wrapper'

import styles from '../styles/Diary.module.css'

const Diary = () => {
  return (
    <div>
      <Wrapper>
      <div className={`${styles.content}`}>
      <article>
        <p>
          哈喽, 我是 xiaoy👻, 坐标北京, 24届前端工程师.
          <br/>
          这里用来记录一些无聊的生活日常.
        </p>
        <br/>
        <p>
          React 和 Vue 都在用, 不过都是一般水平, 之后可能会学一些 Hybrid 混合开发、React Native 的东西. 业余时间也在参与开源, 也买了一些书, 不过都没读多少. 最近对《周易》很感兴趣
        </p>
        <br/>
        <p>
          希望我的人生除了敲代码之外还有很多精彩的地方
          <br/>
          想去不同的地方旅居, 成为一个数字游民...
          <br/>
          想收集各个地方的明信片 & 邮票...
          <br/>
          如果不考虑收入, 希望做一个木匠...
        </p>
        <br/>
        <p>
          认可 基因彩票 的观点, 或许我感受到的痛苦都是自身价值观带来的.
        </p>
      </article>
      <br/><br/>
    </div>
      </Wrapper>
    </div>  
  )
}

export default Diary