import axios from 'axios';
import {
  Musics,
  LoginInfo,
  SignUpInfo,
  IThemeItemProps,
  ItemInfo,
  EditType,
  UserInfo,
} from '../types/types';

const BASE_URL = 'https://api.cozystates.com/';

// 음악 리스트 요청
export const GetMusic = (ThemeId: string | undefined): Promise<Musics> =>
  axios
    .get(`${BASE_URL}theme/${ThemeId}/music/list`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    })
    .then((res) => res.data);

// 회원가입
export const SignUp = (data: SignUpInfo) =>
  axios.post(`${BASE_URL}members`, data).then((res) => {
    return res;
  });

// 로그인
export const Login = async (data: LoginInfo) => {
  const response = await axios.post(
    `${BASE_URL}members/login`,
    {
      email: data.email,
      password: data.password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    }
  );

  return response;
};

// 로그아웃
export const Logout = async (): Promise<any> => {
  const accessToken = sessionStorage.getItem('accessToken');
  const refreshToken = sessionStorage.getItem('refreshToken');

  try {
    const response = await axios.post(
      `${BASE_URL}members/logout`,
      {
        refreshToken: refreshToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      await RenewAccessToken();
      return Logout();
    }
    throw error;
  }
};

// 프로필 수정
export const PetchEditProfile = async (data: EditType): Promise<any> => {
  const accessToken = sessionStorage.getItem('accessToken');
  const memberId = sessionStorage.getItem('memberId');

  try {
    const response = await axios.patch(
      `${BASE_URL}members/${memberId}`,
      {
        imageUrl: data.imageUrl,
        username: data.username,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      await RenewAccessToken();
      return PetchEditProfile(data);
    }
    throw error;
  }
};

// 테마 이미지 리스트 가져오기
export const GetThemeItems = async (
  themeId: number,
  pageParam: number,
  sizeParam: number
): Promise<IThemeItemProps> => {
  const accessToken = sessionStorage.getItem('accessToken');

  try {
    const response = await axios.get(
      `${BASE_URL}theme/${themeId}?page=${pageParam}&size=${sizeParam}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      await RenewAccessToken();
      return GetThemeItems(themeId, pageParam, sizeParam);
    }
    throw error;
  }
};

// 업로드 요청
export const PostUploadImg = async (data: FormData) => {
  const accessToken = sessionStorage.getItem('accessToken');
  const response = await axios.post(`${BASE_URL}contentsUpload`, data, {
    headers: {
      'Content-Type': 'multipart/form-data', // multipart/form-data
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const PostUploadMusic = async (data: FormData) => {
  const accessToken = sessionStorage.getItem('accessToken');
  const response = await axios.post(`${BASE_URL}admins/musicUpload`, data, {
    headers: {
      'Content-Type': 'multipart/form-data', // multipart/form-data
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

// 이미지 좋아요 상태 업데이트
export const UpdateLike = async (contentId: number): Promise<ItemInfo> => {
  const accessToken = sessionStorage.getItem('accessToken');

  try {
    const response = await axios.patch(`${BASE_URL}likes/${contentId}`, null, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      await RenewAccessToken();
      return UpdateLike(contentId);
    }
    throw error;
  }
};

// 좋아요한 테마 이미지 리스트 가져오기
export const GetThemeLikes = async (
  themeId: number,
  pageParam: number,
  sizeParam: number
): Promise<IThemeItemProps> => {
  const accessToken = sessionStorage.getItem('accessToken');

  try {
    const response = await axios.get(
      `${BASE_URL}contents/likes/${themeId}?page=${pageParam}&size=${sizeParam}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      await RenewAccessToken();
      return GetThemeLikes(themeId, pageParam, sizeParam);
    }
    throw error;
  }
};

// 토큰 재발급 API
export const RenewAccessToken = async () => {
  const accessToken = sessionStorage.getItem('accessToken');
  const refreshToken = sessionStorage.getItem('refreshToken');

  try {
    const response = await axios.post(
      `${BASE_URL}tokens`,
      {
        refreshToken: refreshToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const newAccessToken = response.headers['authorization'];
    sessionStorage.setItem('accessToken', newAccessToken);

    return response.data;
  } catch (error) {
    // 토큰 갱신 실패 시 처리
    console.error('액세스 토큰 갱신에 실패했습니다:', error);

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('memberId');

    alert('액세스 토큰 갱신에 실패했습니다. 다시 로그인 해주세요.');
    window.location.href = '/';
    throw error;
  }
};

// 상세 이미지 정보 가져오기
export const GetDetailedItem = async (contentId: number): Promise<any> => {
  const accessToken = sessionStorage.getItem('accessToken');
  try {
    const response = await axios.get(`${BASE_URL}contents/${contentId}`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      await RenewAccessToken();
      return GetDetailedItem(contentId);
    }
    throw error;
  }
};

// 회원정보 불러오기
export const GetUserInfo = async (): Promise<UserInfo> => {
  const accessToken = sessionStorage.getItem('accessToken');
  const memberId = sessionStorage.getItem('memberId');
  try {
    const response = await axios.get(`${BASE_URL}members/${memberId}`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      await RenewAccessToken();
      return GetUserInfo();
    }
    throw error;
  }
};

// 프로필 페이지에서 좋아요 리스트 불러오기
export const GetLikedContents = async (
  pageParam: number,
  sizeParam: number
): Promise<IThemeItemProps> => {
  const accessToken = sessionStorage.getItem('accessToken');

  try {
    const response = await axios.get(
      `${BASE_URL}contents/likes?page=${pageParam}&size=${sizeParam}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      await RenewAccessToken();
      return GetLikedContents(pageParam, sizeParam);
    }
    throw error;
  }
};

// 회원 탈퇴
export const DeleteMemberInfo = async (): Promise<any> => {
  const memberId = sessionStorage.getItem('memberId');
  const accessToken = sessionStorage.getItem('accessToken');
  try {
    const response = await axios.delete(`${BASE_URL}members/${memberId}`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      await RenewAccessToken();
      return DeleteMemberInfo();
    }
    throw error;
  }
};
