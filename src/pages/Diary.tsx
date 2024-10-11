import Wrapper from '../components/Wrapper'

import styles from '../styles/Diary.module.css'

interface DiarySectionProps {
  item: [string, string];
}

const DiarySection: React.FC<DiarySectionProps> = ({ item }) => {
  const [date, content] = item
  return (
    <div  className={styles.section}>
      <div>[{date}]</div>
      {content}
    </div>
  )
}


const Diary = () => {
  const content: [string, string][] = [
    [
      '2024.10.12',
      '工作以后好像没有那么喜欢敲代码了.'
    ],
    [
      '2024.10.01',
      'Hakuna Matata.'
    ]
  ]

  return (
    <Wrapper>
      <div className={`${styles.container}`}>
        {content.map(item => {
          return <DiarySection key={item[1]} item={item} />
        })}
      </div>
    </Wrapper>
  )
}

export default Diary