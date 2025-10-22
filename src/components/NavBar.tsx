import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from '../styles/Nav.module.css'
import SunIcon from '../svg/sun.svg?react'
import MoonIcon from '../svg/moon.svg?react'
import LifeLineIcon from '../svg/lifeline.svg?react'

const NavBar = ({ setMode, mode }) => {

  const [position, setPosition] = useState({ X: 0, Y: 0 })
  const handleClick = (event: MouseEvent) => {

    const { clientX, clientY } = event
    setPosition({ X: clientX, Y: clientY })

    // const changeTheme = () => {
    //   const transition = document.startViewTransition(() => {
    //     if (mode === 'light') {
    //       document.documentElement.classList.remove('dark')
    //     } else {
    //       document.documentElement.classList.add('dark')
    //     }
    //   })

    //   transition.ready.then(() => {
    //     const { clientX, clientY } = event
    //     // 半径
    //     const radius = Math.hypot(
    //       Math.max(clientX, innerHeight - clientX),
    //       Math.max(clientY, innerHeight - clientY)
    //     )

    //     // const isDark = document.documentElement.classList.contains('dark')
    //     const isDark = mode === 'dark' ? true : false
    //     const clipPath = [
    //       //根据圆心的位置和半径画圆
    //       `circle(0px at ${clientX}px ${clientY}px)`,
    //       `circle(${radius}px at ${clientX}px ${clientY}px)`,
    //     ]
    //     document.documentElement.animate(
    //       { clipPath },
    //       { 
    //         duration: 500, 
    //         pseudoElement: isDark
    //           ? "::view-transition-old(root)"
    //           : "::view-transition-new(root)"
    //       }
    //     )
    //   })
    // }
    // console.log('eve', event)
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
    localStorage.setItem('mode', mode === 'light' ? 'dark' : 'light')
    // changeTheme()
  };

  useEffect(() => {
    // toggle HTML theme
    // if (mode === 'light') {
    //   document.documentElement.classList.remove('dark')
    // } else {
    //   document.documentElement.classList.add('dark')
    // }

    const transition = document.startViewTransition(() => {
      if (mode === 'light') {
        document.documentElement.classList.remove('dark')
      } else {
        document.documentElement.classList.add('dark')
      }
    })

    transition.ready.then(() => {
      // const { clientX, clientY } = event
      // 半径
      const X = position.X, Y = position.Y
      const radius = Math.hypot(
        Math.max(X, innerHeight - X),
        Math.max(Y, innerHeight - Y)
      )

      const isDark = document.documentElement.classList.contains('dark')
      // const isDark = mode === 'dark' ? true : false
      const clipPath = [
        //根据圆心的位置和半径画圆
        `circle(0px at ${X}px ${Y}px)`,
        `circle(${radius}px at ${X}px ${Y}px)`,
      ]
      document.documentElement.animate(
        { clipPath: isDark ? clipPath.reverse() : clipPath },
        {
          duration: 500,
          pseudoElement: isDark
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)"
        }
      )
    })
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
        <Link to='/diary'>
          {/* <span className={`iconfont  ${styles.mobile} ${styles.icon}`}>
            &#xe684;
          </span> */}
          <LifeLineIcon className={`${styles.mobile} ${styles.lifeline}`} />
        </Link>

        {/* Laptop Link */}
        <Link to='/' className={`${styles.link} ${styles.laptop}`}>
          Me
        </Link>
        <Link to='/blog' className={`${styles.link} ${styles.laptop}`}>
          Blog
        </Link>
        {/* <Link to='/diary' className={`${styles.link} ${styles.laptop}`}>
          Diary
        </Link> */}

        {/* Other Icon */}
        <a
          href='https://github.com/mengqiuleo'
          rel='noreferrer'
          target='_blank'
          className={`iconfont ${styles.icon}`}
        >
          &#xe885;
        </a>
        {/* <span className={`iconfont ${styles.icon}`} onClick={handleClick}>
          &#xe635;
        </span> */}
        {mode === 'light' && <SunIcon className={`${styles.icon}`} onClick={handleClick} />}
        {mode === 'dark' && <MoonIcon className={`${styles.icon}`} onClick={handleClick} />}
      </nav>
    </div>
  );
};

export default NavBar
