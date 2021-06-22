import Image from 'next/image'
import { Layout } from '@components/Layout'
import styled from 'styled-components'

const Main = styled.main`
  display: flex;
  align-items: center;
  flex: 1;
  /* padding-top: calc(var(--header-height) * -1); */

  &::before {
    content: '';
    background: #9d3ff5;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: polygon(100% 0, 100% 22%, 27% 120%, 0 72%, 0 0);
    z-index: var(--zindex-bg);
  }
`

const Presentation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`

const Description = styled.div`
  align-self: start;
  flex: 1 0 300px;
  /* margin-top: 5rem; */
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  color: #fff;
  font-weight: bold;
`

const SubTitle = styled.p`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #fff;
  line-height: 1.6;
`

const ImageContainer = styled.div`
  flex: 1 0 300px;
`

const IndexPage = () => (
  <Layout title="EasyBudget">
    <Main>
      <Presentation>
        <Description>
          <Title>Easy Budget</Title>
          <SubTitle>
            Manage all your budget easily and customize your incomes or expenses
            categories as you want
          </SubTitle>
        </Description>
        <ImageContainer>
          <Image
            // layout="responsive"
            width={600}
            height={400}
            src="/banner.svg"
          />
        </ImageContainer>
      </Presentation>
    </Main>
  </Layout>
)

export default IndexPage
