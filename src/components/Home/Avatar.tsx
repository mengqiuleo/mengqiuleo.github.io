import { useRef, useState } from 'react'

import styles from '../../styles/Avatar.module.css'

const Avatar = () => {
  const [index, setIndex] = useState(0)
  const ref = useRef()
  const words = ['Jingyi', 'Xiaoy']

  setTimeout(() => {
    if (ref.current) {
      ref.current.classList.add(styles.out)
    }
  }, 2900)

  const handleEnd = () => {
    ref.current.classList.remove(styles.out)
    setIndex((prev) => (prev + 1 === words.length ? 0 : prev + 1))
  };

  return (
    <div className={styles.container}>
      <img
        src='/avatar.jpg'
        width={100}
        height={100}
        className={styles.avatar}
      />
      <div className={styles.description}>
        <h1 className={styles.name} ref={ref} onTransitionEnd={handleEnd}>
          {words[index]}
        </h1>
        <p className={styles.tag}>前端工程师👩🏻‍💻 / 明信片收藏家✉ / City Walk🚶🏻‍♀️</p>
      </div>
    </div>
  );
};

export default Avatar
