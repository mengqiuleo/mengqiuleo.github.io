import { Link } from 'react-router-dom'

import styles from '../styles/Cd.module.css'

const Cd = () => {
  return (
    <div className={styles.cd}>
      <Link to='/blog' className={styles.link}>
        cd..
      </Link>
    </div>
  )
}

export default Cd
