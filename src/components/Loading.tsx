import Wrapper from './Wrapper'

import styles from '../styles/Loading.module.css'

const Loading = () => {
  return (
    <Wrapper>
      <p className={styles.loading}>loading</p>
    </Wrapper> 
  )
}

export default Loading
