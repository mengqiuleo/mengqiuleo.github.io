import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import styles from '../styles/Nav.module.css'

const NavBar = ({ setMode, mode }) => {
  const handleClick = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
    localStorage.setItem('mode', mode === 'light' ? 'dark' : 'light')
  };

  useEffect(() => {
    // toggle HTML theme
    if (mode === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [mode]);

  return (
    <div className={styles.container}>
      <Link to='/' className={styles.signature}>
        Xiaoy's World
      </Link>
      <nav className={styles.nav}>
        {/* Mobile Icon */}
        <Link to='/blog'>
          <span className={`iconfont  ${styles.mobile} ${styles.icon}`}>
            &#xe634;
          </span>
        </Link>

        {/* Laptop Link */}
        <Link to='/' className={`${styles.link} ${styles.laptop}`}>
          Me
        </Link>
        <Link to='/blog' className={`${styles.link} ${styles.laptop}`}>
          Blog
        </Link>

        {/* Other Icon */}
        <a
          href='https://github.com/mengqiuleo'
          rel='noreferrer'
          target='_blank'
          className={`iconfont ${styles.icon}`}
        >
          &#xe885;
        </a>
        <span className={`iconfont ${styles.icon}`} onClick={handleClick}>
          &#xe635;
        </span>
      </nav>
    </div>
  );
};

export default NavBar
