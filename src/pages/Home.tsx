import Avatar from '../components/Home/Avatar'
import Wrapper from '../components/Wrapper'
import Content from '../components/Home/Content'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Wrapper>
        <Avatar />
        <Content />
        <Footer />
      </Wrapper>
    </div>  
  )
}

export default Home