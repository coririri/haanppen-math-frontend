# [Haanppen-math-forntend] 자기주도 수학 학습 서비스 외주 개발

**배포 주소**

https://hanapi.hopto.org/

### 프로젝트 소개

수학 학원 내부에서 온라인 수업을 진행하거나 오프라인 수업을 보존하여 학생이 자기주도적으로 학습을 할 수 있는데 도움을 주는 웹 서비스 프로젝트입니다.

### 개발 동기

오프라인 강의 영상을 유튜브에 공유하면 외부에서 쉽게 접근이 가능해 보안적인 문제가 발생하고, 학생이 스스로 영상을 찾아보기 힘들기 때문에 학원 자체적인 온라인 수업 웹 서비스를 개발하게 되었습니다.

### 기대 효과

1. 학생이 지난 오프라인 수업을 복습할 수 있다.
2. 선생님은 오프라인 수업뿐만 아니라, 온라인 수업을 진행할 수 있다.
3. 온라인으로 질문을 올리고 선생님이 답변해줄 수 있다.

### 개발 기간

2024.07.15 ~ 현재 진행형

### 팀원

### FE
김선우 [@coririri](https://github.com/coririri)
  
### BE
윤희종 [@huhdy32](https://github.com/huhdy32)

### 기술 스택

- **react 18.2.0**
- **typescript 5.7.2**
    - 좀 더 명시적이고 안전한 타입 활용으로 생산성을 높이기 위해 사용했습니다.
- **eslint 8.56.0 / prettier 3.2.4**
    - 코드 컨벤션을 준수하기 위해 사용했습니다.
- **tailwindcss 3.4.14**
    - 별도의 CSS 파일 관리 없이 생산성을 높이며 스타일링을 적용시키기 위해 사용하였습니다.
    - eslint 플러그인과 함께 사용하여 동일한 컨벤션을 준수하도록 작업했습니다.
- **[zustand 5.0.2](https://zustand-demo.pmnd.rs/)**
    - 모달 처럼 다양한 컴포넌트에서 공통으로 사용되는 상태 값을 전역으로 효과적으로 관리하기 위해 사용하였습니다.
- **[axios 1.6.8](https://axios-http.com/kr/)**
    - 효과적이고 편리하게 네트워크 요청을 관리하기 위해 사용 됨.
    - 대표적 활용 예시: 요청,응답 intercecpt, 데이터 자동 JSON 변환, 직관적인 코드
- **[tanstack/react-query 5.40.0](https://tanstack.com/query/latest)**
    - 데이터 캐싱과 api 요청을 효율적으로 처리 하기 위해 사용 됨.
    - 무한 스크롤을 구현하기 위해 해당 라이브러리의 `useInfiniteQuery` hook을 사용했습니다.
- **[react-datepicker 7.3.0](https://reactdatepicker.com/)**
    - 달력 관련 UI및 기능을 간편하게 구현하기 위해 사용 하였습니다.

## 집중했던 부분들

### **접근성**

- aria 속성들을 최대한 활용하고, 모달이 열려있을 때 focus가 모달 밖으로 나가지 않도록 하는 등 웹 접근성을 고려하여 구현해보았습니다.

- 색상 대비등을 고려하여 가시성을 해치지 않도록 노력했습니다.

- 서비스 특성 상 모바일 사용자들이 많을 것으로 예상하여 우선 모바일 화면에 맞추어 UI를 구성했습니다.

### **서비스 브랜딩 UI/UX 경험**

- *통일된 브랜드 색상 사용*
    
    
    `lightblue: '#C9D2FF'`
  
    ![lightblue](https://github.com/Step3-kakao-tech-campus/Team4_FE/assets/89011648/bb96e12e-e3f0-44c9-bb7b-225120c3d04b)

    
    `gray: '#808080’`
    
    ![gray](https://github.com/Step3-kakao-tech-campus/Team4_FE/assets/89011648/e1ba8a02-4376-42fd-b6fc-9df38841a7ef)

    
    `blue: '#5b76ff'`
    
    ![blue](https://github.com/Step3-kakao-tech-campus/Team4_FE/assets/89011648/801c8871-61a7-46a1-a8d4-7808d7025262)

    
    `red: '#ff5d5d'`
    
    ![red](https://github.com/Step3-kakao-tech-campus/Team4_FE/assets/89011648/128fca3a-450a-4351-8942-5d16e376cc4f)

    
- *자주 사용 되는 UI의 통일*
    - 버튼
        
        ![cancelButton](https://github.com/Step3-kakao-tech-campus/Team4_FE/assets/89011648/c65c1aa9-5149-4524-b341-5f83a9ef12dd)

        ![deleteButton](https://github.com/Step3-kakao-tech-campus/Team4_FE/assets/89011648/cf0b3e0a-8859-4fc3-92cd-e8ce713f1fbc)

        ![okButton](https://github.com/Step3-kakao-tech-campus/Team4_FE/assets/89011648/ee7603c8-b13d-4085-a4e2-01612a0c6f68)

        
    - 페이지 제목 카드
        
        ![pageTitleCard](https://github.com/Step3-kakao-tech-campus/Team4_FE/assets/89011648/b55139d9-807e-4eb6-b1f7-6f92d86c5806)

        

### 비동기 요청 에러 처리

- 비동기 요청에서 에러 발생 시에 빈 화면이 렌더링되는 등 UX를 해치는 동작을 방지하기 위해 데이터 유효성 검사, 에러 캐칭 등을 적용하여 구현했습니다.

## 주요 기능 및 구현 방법

### 기능1. **지도 범위 내 음식점 검색**

1. **동작 과정 영상**
    
    

    https://github.com/Step3-kakao-tech-campus/Team4_FE/assets/89011648/68d694fc-cd4f-4de1-8a44-dab61e0744c9


    
- **구현 방법**
    - 구글 지도 라이브러리를 이용하여 현재 지도 화면의 좌하단 좌표(최소 경위도), 우상단 좌표(최대 경위도)를 얻은 뒤 해당 값과 함께 백엔드에 요청을 보내 범위 내 음식점을 가져오도록 구현하였습니다.

### 기능2. 다국어 지원

- **동작 설명**
    1. **랜딩 페이지 또는 하단 네비게이션 바 에서 본인의 서비스 언어를 선택 합니다.**
        
        ![lang1](https://github.com/Step3-kakao-tech-campus/Team4_FE/assets/89011648/4861bbdb-757c-4a29-9a6c-db76b6482e20)

        
    2. **페이지의 서비스는 사용자가 선택한 언어로 번역되어 제공됩니다.**
        
        ![lang2](https://github.com/Step3-kakao-tech-campus/Team4_FE/assets/89011648/fd28f2ca-de30-41b5-8c9c-e731233fca72)

        
    3. **리뷰 내용을 사용자가 선택한 언어로 번역할 수 있는 기능을 제공합니다.**
        
        

        https://github.com/Step3-kakao-tech-campus/Team4_FE/assets/89011648/c90d7806-3c33-4e9e-b589-55d40bb32acf


        
- **구현 방법**
    - 사용자의 언어 설정을 i18-next를 통해 불러와 리뷰 내용과 함께 구글 번역 API로 요청을 보냅니다.
    - 원문 내용, 번역된 내용을 함께 보관하여 토글 방식으로 보여줄 수 있도록 구현하였습니다.
    - 번역 되었는지 여부를 알려주는 flag를 선언하여 이미 한 번 번역되었다면 다시 번역 요청을 보내는 것이 아니라 저장된 번역 내용을 보여주어 불필요한 API 요청을 방지합니다.

## 주문 프롬프트 생성 기능

- **기능 설명**
    - 음식점 리뷰에서 메뉴 태그를 선택하여 주문 프롬프트에 메뉴를 추가할 수 있습니다.
- **동작 과정 영상**
    
    

    https://github.com/Step3-kakao-tech-campus/Team4_FE/assets/89011648/7cab8a8d-3c90-438f-b47f-e7b128010265


    
- **구현 방법**
    - 사용자가 리뷰를 작성 할 때, 사진의 원하는 위치에 메뉴 태그를 삽입할 수 있게 합니다.
    - 리뷰 상세 페이지에서는 메뉴 태그를 선택하여 원하는 메뉴들을 메뉴 프롬프트에 추가할 수 있습니다.

### 전역 모달 구현 (검색&언어 선택)

- **기능 설명**
    
    전역 페이지에서 공통으로 쓰이는 모달들을 하단 네비게이션 바에 등록해 어느 페이지에서나 사용할 수 있도록 구현하였습니다.
    
    아래 영상의 하단 네비게이션 바의 4번째 버튼과 5번째 버튼이 각각 검색 모달을 띄우는 버튼, 언어 선택 모달을 띄우는 버튼입니다.
    
- **동작 과정 영상**
    
    

    https://github.com/Step3-kakao-tech-campus/Team4_FE/assets/89011648/eb0a4bfa-cf8d-41d0-8f4e-54dfa35dd366


    
- **구현 방법**
    
    redux를 이용해 모달 상태를 관리하고, 커스텀 hook을 만들어 브라우저 해시를 통해 모달을 구현하였습니다.
    
    ```tsx
    /* src/hooks/modal.ts */
    import { useEffect } from 'react';
    import { useDispatch } from 'react-redux';
    import { ModalType } from '../types/modal';
    import { open, close } from '../store/slices/modalSlice';
    
    export function useModal(type: ModalType) {
      const dispatch = useDispatch();
    
      useEffect(() => {
        const { hash } = window.location;
        if (hash === `#${type}`) {
          dispatch(open(type));
        }
      }, []);
    
      useEffect(() => {
        const handleModalOpen = () => {
          const { hash } = window.location;
          if (hash === `#${type}`) {
            dispatch(open(type));
          } else {
            dispatch(close(type));
          }
        };
        window.addEventListener('hashchange', handleModalOpen);
    
        return () => window.removeEventListener('hashchange', handleModalOpen);
      }, [type]);
    
      const openModal = () => {
        window.location.hash = type;
      };
    
      return { openModal };
    }
    ```
    

## 리뷰 작성 기능

- **기능 설명**
    - 사용자는 메뉴 사진들, 방문 인원, 사용 금액, 리뷰 내용, 그리고 메뉴 태그들을 입력하여 리뷰를 작성할 수 있습니다.
    - 메뉴 사진은 업로드 하면 캐러셀 UI를 사용해 다른 업로드 한 이미지들을 확인할 수 있습니다.
- **동작 과정 영상**
    

    https://github.com/Step3-kakao-tech-campus/Team4_FE/assets/89011648/a62d342d-f32f-4f08-a748-9cf67d3e225d


- **구현 방법**
    - input file을 통해 이미지 파일을 입력받은 후, 파일 타입과 크기를 검사하여 문제가 없다면 이미지를 자르는 모달을 띄웁니다.
    - react-easy-crop 라이브러리를 이용하여 이미지를 자른 뒤 Blob 데이터를 저장합니다.
    - 리뷰 내용과 방문 인원, 사용한 금액을 적고 작성 완료 버튼을 누르면 백엔드 API 응답으로 S3 presignedUrl이 이미지 개수에 맞게 제공됩니다.
    - 전달받은 S3 presignedUrl에 각 이미지를 업로드하고 해당 경로와 이미지에 생성한 메뉴 태그를 묶어 백엔드로 전송합니다.

## 그 외 부가기능들

### 음식점&리뷰 좋아요 하기

- **기능 설명**
    
    로그인 상태에서 음식점 상세 페이지와 리뷰 상세 페이지에서 좋아요를 눌러 저장할 수 있습니다.
    
- **동작 과정 영상**
    
    

    https://github.com/Step3-kakao-tech-campus/Team4_FE/assets/89011648/9c7c64f4-b05a-483a-8896-06d5955d6605


    
- **구현 방법**
    - 리뷰, 음식점 상세 페이지를 렌더링하는 요청을 할 때, 사용자의 토큰을 보내 해당 하는 곳을 좋아요 했는지도 함께 받아 옵니다.
    - 로그인 한 사용자가 리뷰나 음식점 상세 페이지에서 좋아요 버튼을 클릭 할 시 서버로 해당 하는 곳의 좋아요 요청을 보냅니다.
    - 사용자가 좋아요 한 상태를 관리해 좋아요한 상태라면 꽉찬 하트 아이콘으로 그렇지 않다면 빈 하트 아이콘을 표시 합니다.

### 최근에 본 맛집

- **기능 설명**
    
    로그인 시 최근에 본 음식점을 저장하여 보여줍니다.
    
- **동작 과정 이미지**
    
    ![recent](https://github.com/Step3-kakao-tech-campus/Team4_FE/assets/89011648/d2ccfcfc-d794-4703-846d-bb4e99c3ad41)

    
- **구현 방법**
    
    - 음식점 상세 페이지에 접속할 때 localStorage에 해당 음식점 정보를 음식점 목록 컴포넌트에 필요한 데이터로 압축해 저장합니다.
    - 저장 시 중복을 확인하여 같은 음식점이 여러 개 저장되지 않도록 구현했습니다.
    - 마이페이지의 최근에 본 음식점 페이지에서 localStorage에 저장된 해당 음식점들을 가져와 보여줍니다.

---
