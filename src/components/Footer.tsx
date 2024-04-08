import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p className={styles.cc}>
        © 2024 Xiaoy's Blog.{' '}
        <a
          href='https://github.com/mengqiuleo/mengqiuleo.github.io'
          rel='noreferrer'
          target='_blank'
        >
          Source
        </a>
      </p>
    </div>
  );
};

export default Footer
