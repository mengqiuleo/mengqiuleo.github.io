import { Link } from 'react-router-dom'

import styles from '../../styles/Post.module.css'

const Post = ({ title, date, id }) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className={styles.post}>
        <p className={styles.title}>{title}</p>
        <p className={styles.date}>{date}</p>
      </div>
    </Link>
  );
};

export default Post;
