# [Haanppen-math-forntend] 자기주도 수학 학습 서비스 외주 개발

**배포 주소**

https://hanapi.hopto.org/

## 프로젝트 소개

수학 학원 내부에서 온라인 수업을 진행하거나 오프라인 수업을 보존하여 학생이 자기주도적으로 학습을 할 수 있는데 도움을 주는 웹 서비스 프로젝트입니다.

## 전체 아키텍쳐
![about 틀 (2)](https://github.com/user-attachments/assets/495ac464-8578-441c-bae3-363a38b3aa85)

## 개발 동기

오프라인 강의 영상을 유튜브에 공유하면 외부에서 쉽게 접근이 가능해 보안적인 문제가 발생하고, 학생이 스스로 영상을 찾아보기 힘들기 때문에 학원 자체적인 온라인 수업 웹 서비스를 개발하게 되었습니다.

## 기대 효과

1. 학생이 지난 오프라인 수업을 복습할 수 있다.
2. 선생님은 오프라인 수업뿐만 아니라, 온라인 수업을 진행할 수 있다.
3. 온라인으로 질문을 올리고 선생님이 답변해줄 수 있다.

## 개발 기간

2024.07.15 ~ 현재 진행형

## 팀원

### FE
김선우 [@coririri](https://github.com/coririri)
  
### BE
윤희종 [@huhdy32](https://github.com/huhdy32)


## 기술 스택

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

