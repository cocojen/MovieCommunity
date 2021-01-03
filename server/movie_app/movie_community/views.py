from .serializers import MovieSerializer, ReviewSerializer, ReviewCommentSerializer, MovieExportSerializer
from .models import Movie, Review, Review_Comment
from accounts.models import User
from django.shortcuts import get_object_or_404, get_list_or_404
from django.core import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from bs4 import BeautifulSoup
from django.http import JsonResponse, HttpResponse
import json
import urllib.request
from django.core import serializers
from django.forms.models import model_to_dict
from django.db.models import Avg
import datetime
import json
from django.views.generic import ListView


@api_view(['GET'])
def all_movie_list(request):
    movies = get_list_or_404(Movie)
    moviesSerializer = MovieSerializer(movies, many=True)

    return Response(data=moviesSerializer.data)


# 장르별로 10개씩 영화 반환
@api_view(['GET'])
def movie_list_by_genre(request):
    # movies = get_list_or_404(Movie)
    comedy_movies = Movie.objects.filter(genre__startswith="Comedy")[:10]
    romance_movies = Movie.objects.filter(genre__startswith="Romance")[:10]
    thriller_movies = Movie.objects.filter(genre__startswith="Thriller")[:10]
    action_movies = Movie.objects.filter(genre__startswith="Action")[:10]
    horror_movies = Movie.objects.filter(genre__startswith="Horror")[:10]

    comedy_movies_serializer = MovieSerializer(comedy_movies, many=True)
    romance_movies_serializer = MovieSerializer(romance_movies, many=True)
    thriller_movies_serializer = MovieSerializer(thriller_movies, many=True)
    action_movies_serializer = MovieSerializer(action_movies, many=True)
    horror_movies_serializer = MovieSerializer(horror_movies, many=True)

    response_data = {}
    response_data['comedy_movies'] = comedy_movies_serializer.data
    response_data['romance_movies'] = romance_movies_serializer.data
    response_data['thriller_movies'] = thriller_movies_serializer.data
    response_data['action_movies'] = action_movies_serializer.data
    response_data['horror_movies'] = horror_movies_serializer.data

    return JsonResponse({'movies_by_genre': response_data})


@api_view(['GET', 'POST'])
def review_detail(request, movie_id):
    # GET 요청) 영화정보와 리뷰와 리뷰코멘트들을 묶어 반환.
    if request.method == 'GET':
        movie = get_object_or_404(Movie, pk=movie_id)
        reviews = Review.objects.filter(movie_id=movie_id)
        for review in reviews:
            comments = Review_Comment.objects.filter(review_id=review.id)
            review.comments = comments
        movie.reviews = reviews
        serializer = MovieSerializer(movie)
        return Response(serializer.data)

    # POST 요청)유저가 리뷰를 작성할 때 :
    elif request.method == 'POST':
        content = request.data.get('content')
        star = request.data.get('star')
        movie = get_object_or_404(Movie, pk=movie_id)
        review = Review(content=content, star=star,
                        movie=movie, user=request.user)
        review.save()
        serialized_obj = serializers.serialize('json', [review])

        dict_obj = model_to_dict(review)
        serialized = json.dumps(dict_obj)
        return Response(serialized)


@api_view(['PUT'])
def updateReviewCheckedDate(request, movieId):
    print('----------------------update checked Time !!!!!!')
    reviewIds = list(Review.objects.filter(movie_id=movieId).filter(user_id=request.user.id).values_list('id', flat=True))
    for reviewId in reviewIds:
        review = get_object_or_404(Review, pk=reviewId)
        review.checked_time = datetime.datetime.now()
        review.save()
        print(review.checked_time)
    
    return Response(data={'msg' : 'checked_date updated'})


# 마이페이지) 유저가 리뷰를 작성한 영화(겹치지 않게)목록을 반환해주기.
@api_view(['GET'])
def user_review_list(request):
    my_movies_ids = list(Review.objects.filter(user_id=request.user.id).values_list('movie_id', flat=True).distinct())
    
    movies = []
    # 내가 리뷰를 작성한 영화 아이디들을 for loop
    for movieId in my_movies_ids:
        movie = {Movie.objects.filter(id=movieId).values('id', 'title', 'avg_vote', 'year')}
        my_vote = Review.objects.filter(user_id=request.user.id).filter(movie_id=movieId).aggregate(Avg('star'))
        my_review_count = Review.objects.filter(user_id=request.user.id).filter(movie_id=movieId).count()
        reviewIds = list(Review.objects.filter(movie_id=movieId).filter(user_id=request.user.id).values_list('id', flat=True))
        print('my review ids : ', reviewIds)

        new_comments = []
        new_comments_count = 0
        for reviewId in reviewIds:
            rv = get_object_or_404(Review, pk=reviewId)
            print(f'rv.checked time : {rv.checked_time}')
            review_comments = Review_Comment.objects.filter(review_id=reviewId).filter(created_at__gte=rv.checked_time)
            if len(review_comments) != 0:
                print(f'number of new comments:  {len(review_comments)}')
                new_comments_count += len(review_comments)
                review_comments_serializer = ReviewCommentSerializer(review_comments, many=True)
                new_comments.append(review_comments_serializer.data)
        data = {
            'movie': movie,
            'my_review_count' : my_review_count,
            'newly_added_review_comments' : new_comments,
            'newly_added_review_counts' : new_comments_count,
            'my_vote': my_vote,
        }
        movies.append(data)
    
    return Response(movies, status=status.HTTP_200_OK)


# 리뷰작성 & 모든 리뷰 리스트 반환
@api_view(['GET', 'POST'])
def review_list(request):
    if request.method == 'GET':
        reviews = get_list_or_404(Review)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(data=serializer.data)

    elif request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


# 리뷰 업데이트하기 (수정 , 삭제)
@api_view(['PUT', 'DELETE'])
def update_review(request, review_id):
    review = get_object_or_404(Review, pk=review_id)

    if review.user_id != request.user.id:
        print('자신이 작성한 글만 지울 수 있습니다.')
        return Response({'error': '자신이 작성한 글만 지울 수 있습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        review.delete()
        return Response({'id': review_id, 'message': 'review deleted'}, status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        review.content = request.data.get('content')
        review.save()
        return Response({'msg': 'saved'})


# 유저가 리뷰 작성할 때 input에서 영화 제목 검색하면, 밑에 타이틀 쫘르륵 떠서 선택하게 하기
@api_view(['GET'])
def search_by_movie_title(request):
    keyword = request.data.get('title')
    searched_movies = Movie.objects.filter(title__contains=keyword)
    serializer = MovieSerializer(searched_movies, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# GET/POST : 리뷰에 달린 코멘트 리스트, 리뷰에 코멘트 작성
@api_view(['GET', 'POST'])
def comment_list(request, review_id):
    if request.method == 'POST':
        serializer = ReviewCommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def recommend_movie(request, genre):
    recommend_movies = Movie.objects.filter(
        genre__startswith=genre).order_by('-avg_vote')[:1]
    serializer = MovieSerializer(recommend_movies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def findWriter(request, reviewId):
    review = get_object_or_404(Review, pk=reviewId)
    if request.user.id == review.user_id:
        return Response({'isWriter': True})
    else:
        return Response({'isWriter': False})

@api_view(['GET'])
def get_proper_movie_poster(request):
    # movies = get_list_or_404(Movie)
    movies = Movie.objects.order_by("id")[100:]

    for movie in movies:
        url = 'https://www.imdb.com/title/'
        movie_id = movie.imdb_title_id
        url = url + movie_id
        req = urllib.request.Request(url)
        res = urllib.request.urlopen(url).read()
        soup = BeautifulSoup(res, 'html.parser')
        soup = soup.find("div", class_="poster")
        imgUrl = soup.find("img")["src"]
        movie.poster_path = imgUrl
        movie.save()
        print(movie.id)
    print('completed')
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def register_movie(request):
    print(request.data.get('url'))
    imdbId = request.data.get('url')
    url = 'https://www.imdb.com/title/' + imdbId + '/?ref_=hm_tpks_tt_1_pd_tp1'
    res = urllib.request.urlopen(url).read()
    soup = BeautifulSoup(res, 'html.parser')
    title = soup.select('div > h1')[0].text
    poster_link = soup.find("div", class_="poster")
    poster_link = poster_link.img['src']
    plot = soup.find('div',{'class':'summary_text'}).get_text()
    new_movie = Movie(imdb_title_id=imdbId, title=title, poster_path=poster_link, description=plot)
    new_movie.save()
    # movie = Movie.objects.get()

    movie = Movie.objects.get(imdb_title_id=imdbId)
    serializer = MovieSerializer(movie)
    return Response({'movie': serializer.data})
