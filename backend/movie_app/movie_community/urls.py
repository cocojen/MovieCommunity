from django.urls import path, include
from . import views


urlpatterns = [
    # GET : 전체 영화 리스트 반환
    path('all_movies/', views.all_movie_list),

    # GET : 장르별 영화 리스트 반환
    path('movie_list_by_genre/', views.movie_list_by_genre),

    # GET/POST : 특정 영화의 리뷰 리스트, 리뷰 작성
    path('movies/<int:movie_id>/reviews/', views.review_detail),

    # GET/POST : 전체 리뷰 리스트, 리뷰 작성
    path('reviews/', views.review_list),

    # DELETE : 리뷰 업데이트 및 삭제
    path('reviews/<int:review_id>/', views.update_review),

    # GET : 로그인한 유저가 작성한 리뷰 리스트
    path('user_reviews/', views.user_review_list),

    # GET/POST : 리뷰에 달린 코멘트 리스트, 리뷰에 코멘트 작성
    # 대댓글
    path('reviews/<int:review_id>/comments/', views.comment_list),

    # GET : 영화 제목 검색 결과 반환
    path('search_movie_title/', views.search_by_movie_title),

    # GET : 영화 추천 결과 반환
    path('recommend/<str:genre>/', views.recommend_movie),

    # GET : 로그인한 사용자가 리뷰 작성자인지 아닌지 boolean 값 반환
    path('reviews/<int:reviewId>/writer/', views.findWriter),

    # PUT : 유저가 작성한 리뷰를 확인했을 때 checked time 을 현재 시간으로 업데이트
    path('movies/<int:movieId>/reviewsChecked', views.updateReviewCheckedDate),

    # POST : IMDB 주소를 입력하면 영화 정보를 크롤링해서 DB에 저장
    path('register_movie/', views.register_movie),

]
