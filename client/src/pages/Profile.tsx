import styled from 'styled-components';
import backgroundImg from '../assets/images/profile_background.jpg';
import ChangeProfile from '../components/profile/user/ChangeProfile';
import LikeList from '../components/profile/like/LikeList';
import EditProfile from '../components/profile/edit/EditProfile';
import ImageUpload from '../components/upload/ImageUpload';
import MusicUpload from '../components/upload/MusicUpload';
import { useSelector } from 'react-redux';
import { EditState } from '../feature/profile/editSlice';

const Profile = () => {
  const isEdit = useSelector((state: { edit: EditState }) => state.edit.isEdit);

  return (
    <Layout>
      <ContentContainer>
        {isEdit ? <EditProfile /> : <ChangeProfile />}
        {sessionStorage.getItem('admin') === 'true' ? (
          <ColumnDiv>
            <ImageUpload />
            <MusicUpload />
          </ColumnDiv>
        ) : (
          <LikeList />
        )}
      </ContentContainer>
    </Layout>
  );
};

export default Profile;

export const Layout = styled.div`
  box-sizing: border-box;
  max-width: 100%;
  width: 100%;
  padding: 5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 100%;
    height: 100%;
    background-image: url(${backgroundImg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: -1;
    transform: scale(1.02);
  }
`;

export const ContentContainer = styled.div`
  box-sizing: border-box;
  max-width: 924px;
  width: 100%;
  flex-direction: column;
  box-shadow: 0 0 0.2rem 0.1rem rgba(255, 255, 255, 0.7);
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ColumnDiv = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
`;
