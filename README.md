## Oh, Young Me
---
기간 : 2020.12.01 ~ 2020.12.20

다국적 영화에 대해 리뷰를 남기고 토론할 수 있는 영화 커뮤니티입니다. "오늘 볼 영화를 내일로 미루지 말자"의 약자인 "Oh, Young Me" 를 커뮤니티 이름으로 정했습니다. 프론트엔드와 백엔드 모두 담당한 프로젝트입니다.



### 프로젝트 상세 사항
---

#### 사용 기술
- Python, Django, sqlite3, AWS EC2, NginxX, Javascript, Vue.js, Vuex, Vuetify


#### 주제 선정 계기
- 영화 커뮤니티는 많지만, 영미권이나 아시아권 등의 메이저 지역 영화가 주를 이루고 있습니다.  인도나 중동아시아 등 전세계 각국의 마이너 영화들에 대해 토론하고 추천하는 커뮤니티를 만들고자 했습니다.


#### 데이터 관리
- 영화 정보는 Kaggle에서 IMDB movie dataset 파일을 사용하였습니다. 유저가 영화를 등록할 때는 해당 영화의 IMDB 아이디를 입력하면 자동으로 영화정보를 크롤링하여 디비에 저장합니다.



#### ERD

![erd](README.assets\movie_erd.jpg)


### 사용 화면

![user_view](README.assets\userview.gif)


