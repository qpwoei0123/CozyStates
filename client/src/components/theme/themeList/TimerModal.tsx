import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const TimerModal = ({ handleTogglePlay }: { handleTogglePlay: () => void }) => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleYesButtonClick = () => {
    handleTogglePlay();
    setShowModal(false);
  };

  const handleNoButtonClick = () => {
    setShowModal(false);
  };

  return (
    <ModalContainer show={showModal}>
      <ModalContent>
        <div>음악과 함께?</div>
        <ButtonContainer>
          <Button onClick={handleYesButtonClick}>예</Button>
          <Button onClick={handleNoButtonClick}>아니오</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalContainer>
  );
};

// 스타일드 컴포넌트를 사용하여 모달 스타일을 정의합니다.
const slideRigthIn = keyframes`
  0% , 100%{
    right: -20%;
  }
  10%, 90% {
    opacity: 1;
    right: 0%;
  }
`;

// 모달 창의 뒷 배경이 어두워지는 오버레이 스타일
const ModalOverlay = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 어두운 배경 색상 */
  display: ${(props) =>
    props.show
      ? 'block'
      : 'none'}; /* showModal 상태에 따라 보이기/숨기기 설정 */
`;

// 모달 창을 감싸는 컨테이너 스타일
const ModalContainer = styled.div<{ show: boolean }>`
  position: fixed;
  bottom: 0;
  right: 0;
  opacity: 0;
  background-color: white;
  padding: 20px;
  border-radius: 20px 0 0 20px;
  z-index: 300;
  display: ${(props) =>
    props.show
      ? 'block'
      : 'none'}; /* showModal 상태에 따라 보이기/숨기기 설정 */
  animation: ${slideRigthIn} 3s ease-in-out;
`;

// 모달 창의 내용 스타일
const ModalContent = styled.div`
  text-align: center;
`;

// 버튼들을 감싸는 컨테이너 스타일
const ButtonContainer = styled.div`
  margin-top: 20px;
`;

// 예/아니오 버튼 스타일
const Button = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #007bff; /* 버튼 배경 색상 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default TimerModal;
