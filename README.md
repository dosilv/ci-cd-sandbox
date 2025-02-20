# 🚀 모노레포 프로젝트 배포 CI/CD 파이프라인 구축

## 워크플로우 개요

<img width="765" alt="image" src="https://github.com/user-attachments/assets/f217fb74-8e79-4aa7-8611-e375a7856590" />

### 1. 의존성 설치 🌱

프로젝트의 의존성을 설치하고, 캐싱하여 각 프로젝트 빌드 시 재사용 가능하도록 준비합니다.

### 2. 빌드 📦

matrix를 사용하여 개별 프로젝트를 병렬로 빌드합니다. 실패 시 의존성을 설치 후 재시도합니다.

### 3. 배포 🚀

빌드된 프로젝트를 각 S3 버킷에 배포하고, CloudFront 캐시를 무효화해 변경사항을 즉시 반영합니다.

<img width="1068" alt="image" src="https://github.com/user-attachments/assets/097cf469-d1b9-49f0-bcee-35e0f03e00a7" />

## 주요 링크 🔗

S3 버킷 웹사이트 엔드포인트

- next app: http://dosilv-ci-cd-sandbox.s3-website.ap-northeast-2.amazonaws.com
- chapter1-3: http://front-4th-chapter1-3.s3-website.ap-northeast-2.amazonaws.com
- chapter2-2: http://front-4th-chapter2-2.s3-website.ap-northeast-2.amazonaws.com
- chapter3-2: http://front-4th-chapter3-2.s3-website.ap-northeast-2.amazonaws.com

CloudFront 배포 도메인

- next app: https://d2tu72bsyzf5r5.cloudfront.net
- chapter1-3: https://d1w6mx1810khk7.cloudfront.net
- chapter2-2: https://dx4iuban5rigb.cloudfront.net
- chapter3-2: https://de9dy3cer8c9.cloudfront.net

## 주요 개념

### 🐱 Github Actions

Github에서 제공하는 자동화 CI/CD 자동화 플랫폼으로, 특정 이벤트(push, pull request 등)나 정해진 일정에 따라 자동으로 작업을 실행

- **워크플로우(Workflow)**: YAML 파일로 정의되며, 하나 이상의 작업(Job)을 포함
- **이벤트(Event)**: 워크플로우를 트리거하는 특정 활동 또는 규칙
- **작업(Job)**: 독립된 가상 머신이나 컨테이너에서 실행되는 일련의 단계로서, 기본적으로 병렬로 실행됨
- **단계(Step)**: 작업(Job) 내에서 실행되는 개별 작업으로서, 순차적으로 실행됨
- **액션(Action)**: 자주 반복되는 작업을 재사용 가능한 단위로 만든 것
- **러너(Runner)**: 워크플로우가 실행되는 서버

### 📂 S3 (Simple Storage Service)

웹사이트의 정적 파일(html, css, js, 이미지 등)을 저장하는 공간

- 역할
  - 코드를 Github에 push하면, github actions에 의해 빌드된 결과물을 S3에 업로드
- S3 버킷 필수 설정
  - PublicReadGetObject 정책 설정: 파일을 외부에서 읽을 수 있도록 허용
  - 정적 웹 호스팅 활성화: S3에서 직접 웹사이트 제공 가능

### 🚀 CloudFront

S3의 파일을 전 세계 어디서든 빠르게 제공하는 CDN (Content Delivery Network)

- 역할
  - S3에 배포된 정적 웹사이트를 캐싱해두었다가, 사용자가 웹사이트에 접속하면 캐시된 콘텐츠를 제공
  - 최신 변경 사항이 반영될 수 있도록 CloudFront 캐시 무효화(Invalidation) 처리 필요
- CloudFront 필수 설정
  - S3를 오리진(Origin)으로 설정

### 🔐 IAM

AWS 서비스들이 안전하게 통신할 수 있도록 리소스에 대한 권한을 관리

- 역할
  - CodeBuild가 S3에 파일을 업로드하고, CloudFront가 S3에서 파일을 가져오거나 캐시 무효화를 할 수 있도록 권한 부여

## 추후 개선 사항 💬

- 배포 전 테스트 자동화 단계 추가
- paths-filter를 이용해 변경사항이 있는 프로젝트만 빌드 및 배포
- 중복 코드(checkout repository, setup node.js 등) 별도의 액션으로 분리
- 기타 실행 시간을 단축할 수 있는 방안 모색

# CDN의 성능 개선 효과 분석

### 🌐 network 탭 비교

| <img width="1294" alt="image" src="https://github.com/user-attachments/assets/cbc3932d-0e82-4029-9937-6b95a82ea19b" /> | <img width="1294" alt="image" src="https://github.com/user-attachments/assets/c52902d4-19b0-45c6-b8f1-c8baa3e95723" /> |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| CDN 적용 전                                                                                                            | CDN 적용 후                                                                                                            |

| 항목                       | CDN 적용 전 | CDN 적용 후 | 개선율 |
| -------------------------- | ----------- | ----------- | ------ |
| 총 요청 수                 | 16          | 16          | -      |
| 총 전송 크기               | 503KB       | 203KB       | 59.6%  |
| 가장 큰 스크립트 로드 시간 | 319ms       | 173ms       | 46%    |
| 페이지 로드 완료 시간      | 568ms       | 379ms       | 33.3%  |

전반적인 콘텐츠 전송 크기 감소로 스크립트 및 페이지 로드 시간이 감소

### 🤹 performance 탭 비교

| <img width="1292" alt="image" src="https://github.com/user-attachments/assets/1f81c75c-2ba0-4b99-b54f-7ca0c3d53fb6" /> | <img width="1292" alt="image" src="https://github.com/user-attachments/assets/e5eb84c1-8ca8-44f5-8252-d15c476aad8a" /> |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| CDN 적용 전                                                                                                            | CDN 적용 후                                                                                                            |

| 항목                           | CDN 적용 전 | CDN 적용 후 | 개선율 |
| ------------------------------ | ----------- | ----------- | ------ |
| Largest Contentful Paint (LCP) | 0.45s       | 0.2s        | 55.6%  |
| Cumulative Layout Shift (CLS)  | 0.63 (poor) | 0 (good)    | 100%   |

- Largest Contentful Paint (LCP): 페이지에서 가장 큰 콘텐츠 요소가 렌더링되는 데 걸리는 시간
- Cumulative Layout Shift (CLS): 페이지 로드 중에 발생하는 예기치 않은 레이아웃 변경의 정도
  LCP가 감소함으로써 사용자가 페이지의 주요 콘텐츠를 훨씬 빠르게 볼 수 있게 되었고, CLS가 감소해 페이지 로드 중에 레이아웃 변경이 발생하지 않아 사용자 경험이 향상됨

💡 CLS에서 차이가 발생하는 이유는 다음과 같이 분석

- 폰트 로딩 속도가 빨라져 시스템 폰트가 표시되는 시간이 줄어 레이아웃 변경 최소화
- 이미지 로딩 속도 또한 개선되어 이미지 크기 명시 부족으로 인한 레이아웃 변경 가능성 감소

### ⚡️ lighthouse 탭 비교

| <img width="1292" alt="image" src="https://github.com/user-attachments/assets/eaf91890-f121-4460-b7ee-00f78b61fa28" /> | <img width="1292" alt="image" src="https://github.com/user-attachments/assets/6a3ec73e-f12e-4e93-a250-552c4ccc304b" /> |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| CDN 적용 전                                                                                                            | CDN 적용 후                                                                                                            |

| 항목           | CDN 적용 전 | CDN 적용 후 | 개선율 |
| -------------- | ----------- | ----------- | ------ |
| Performance    | 90          | 100         | 11.1%  |
| Accessibility  | 100         | 100         | 0%     |
| Best Practices | 79          | 100         | 26.6%  |
| SEO            | 100         | 100         | 0%     |

- Performance: 웹 페이지의 로딩 속도 및 사용자 인터랙션 반응 속도를 측정하며, LCP 및 CLS 개선과 리소스 압축이 영향을 미쳤을 것으로 분석
- Accessibility: 웹 페이지가 장애를 가진 사용자를 포함한 모든 사용자가 쉽게 이용할 수 있도록 설계되었는지 평가하는 항목으로, CDN 적용으로 인한 변화 없음
- Best Practices: 웹 페이지가 최신 웹 표준 및 모범 사례를 준수하는지 평가하며, CloudFront 배포 생성 시 뷰어 프로토콜 정책을 `Redirect HTTP to HTTPS`로 설정함으로써 보안상 개선이 있었음
- SEO: 웹 페이지가 검색 엔진에 더 잘 노출될 수 있도록 최적화되었는지 평가하며, 현재 프로젝트에서 CDN 적용으로 인한 변화 없음

### 정리

CDN 적용으로 인해 콘텐츠 전송, 렌더링 성능, 보안 등 여러 방면에서 개선이 있었고, 이러한 효과는 현재 단계에서는 미미할 수 있으나 앱의 사이즈가 커질수록 뚜렷해질 것으로 예상됨!
