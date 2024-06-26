import ThemeCarousel from '../components/theme/themeList/ThemeCarousel';
import styled, { keyframes } from 'styled-components';
import gif1 from '../assets/theme/1.gif';
import gif2 from '../assets/theme/2.gif';
import gif3 from '../assets/theme/3.gif';
import gif4 from '../assets/theme/4.gif';
import gif5 from '../assets/theme/5.gif';
import { useState } from 'react';
import EmblaCarousel from '../components/theme/themeList/Carousel';
import { EmblaOptionsType } from 'embla-carousel-react';

const ThemeList = () => {
  const themeData = [
    {
      src: gif1,
      title: 'Nature',
      content: '아름다운 자연 풍경',
    },
    {
      src: gif2,
      title: 'Space',
      content: '우주의 무한함',
    },
    {
      src: gif3,
      title: 'Animal',
      content: '다양한 동물의 귀여운 매력',
    },
    {
      src: gif4,
      title: 'Pixel',
      content: '화려한 픽셀 아트의 세계',
    },
    {
      src: gif5,
      title: 'Retro',
      content: '과거로 돌아가는 레트로 감성',
    },
  ];
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const gifList = themeData.map((el) => el.src);
  const currentThemeImageUrl = gifList[currentThemeIndex];
  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  // 캐러셀 슬라이드 사용 시 주석 ********************************
  return (
    <Layout>
      <BlurredBackground imageUrl={currentThemeImageUrl} />
      <ThemeCarousel
        gifList={gifList}
        currentThemeIndex={currentThemeIndex}
        setCurrentThemeIndex={setCurrentThemeIndex}
      />
      <TextContainer>
        <h1>{themeData[currentThemeIndex].title}</h1>
        <p>{themeData[currentThemeIndex].content}</p>
      </TextContainer>
    </Layout>
  );
  // 캐러셀 슬라이드 사용 시 주석해제 ********************************
  //   return (
  //     <Layout>
  //         <EmblaCarousel slides={SLIDES} options={OPTIONS} />
  //     </Layout>
  //   );
};

export default ThemeList;
//페이드 아웃 애니메이션
const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50%{
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// 캐러셀 슬라이드 사용 시 주석 ********************************
const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
// 캐러셀 슬라이드 사용 시 주석해제 ********************************
// const Layout = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: black;
//   height: 100vh;
// `;
const BlurredBackground = styled.div<{ imageUrl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(5px);
  z-index: -1;
  transform: scale(1.02);
`;

const TextContainer = styled.section`
  width: 50vw;
  height: 20vh;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //페이드 아웃 1.5초
  animation: ${fadeInAnimation} 1.5s ease-in-out;
  > h1 {
    margin: 0;
    @media (min-width: 300px) {
      font-size: 200%;
      margin-bottom: 0;
    }
    @media (min-width: 768px) {
      font-size: 250%;
    }
    @media (min-width: 1024px) {
      font-size: 300%;
    }
  }
  > p {
    font-weight: bold;
    @media (min-width: 300px) {
      font-size: 110%;
    }
    @media (min-width: 768px) {
    }
    @media (min-width: 1024px) {
      font-size: 130%;
    }
  }
  @media (min-width: 300px) {
    margin-top: 50px;
    flex-direction: column;
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 1024px) {
    margin-top: 0px;
    flex-direction: row;
  }
`;
