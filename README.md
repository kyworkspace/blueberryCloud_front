# BLUEBERRY CLOUD _ FRONT
### 2021-03-13
- First Init
- 리덕스 환경 및 프록시 설정

### sidebar 작업
- layout/sidebar/index
- menu 타이틀 및 URL 관리 menu.jsx

### header
- 로그인 및 상태창 관리
- rightbar에서 메뉴 관리 / Section에 세부 컴포넌트 추가해둠
- 각 컴포넌트 분류

### 메인URL 관리 
- Root index.js

### DashBoard Contents
- route/index.js 에서 URL 설정
- components/ 에서 설정
- route에 반영

### Redux
- /redux에 모아둠

### Reactstrap
- 한줄을 최대 12라고 판단함.
- 사진이나 동영상 파일및 폴더는 1로 계산 해볼 예정

### API's
- route에 연결 URL 기본 값 저장해둠.

### 사진 업로드
- 다중 업로드 기능
- 사진마다 설명 및 태그를 부착할 수 있는 기능
![image](https://user-images.githubusercontent.com/45280952/111907051-fda35780-8a96-11eb-9d4e-34f23c83cbad.png)
![image](https://user-images.githubusercontent.com/45280952/111907055-05fb9280-8a97-11eb-9193-c44a7bc800a8.png)
- 모달 벗어나면 저장된 파일 로컬에서도 삭제해야함 - 아직 기능 미정


### 화면 구성
![image](https://user-images.githubusercontent.com/45280952/111332400-18e81e80-86b5-11eb-97f1-b5ff7c1246bb.png)

#### 모든 파일 뷰어
![image](https://user-images.githubusercontent.com/45280952/111907073-157adb80-8a97-11eb-8dbb-226ba8f57c4f.png)

### 헤더 아이콘 
- favicon.png 수정 필요

### CLOUD
- 폴더 구조 확립
- 뒤로가기 기능 구성
- 화면 UI 변경
![image](https://user-images.githubusercontent.com/45280952/115579810-7c431d00-a301-11eb-9c76-6c2361061a7b.png)

### 파일 저장 경로
- Root/아이디/ 할려고 했으나 잘안되서 날짜로 변경
- formData에서 field값을 빼서 경로를 설정할수 있는 방법을 찾아야함
- formData에서 처리할게 아니고, 파일 저장할때 업로드한 파일 경로를 가져와서 서버에서 물리적인 경로 변경시켜주는 것으로 해결함

### 영상 이슈 해결
- ffmpeg로 converting이 생각보다 오래걸렸음.
- 영상 플레이시 최대 가로 800 세로 450 으로 설정함