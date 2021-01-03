from django.db import models
from django.conf import settings

# Create your models here.


class Movie(models.Model):
    imdb_title_id = models.TextField()
    title = models.TextField()
    year = models.TextField()
    genre = models.TextField()
    duration = models.TextField()
    country = models.TextField()
    language = models.TextField()
    director = models.TextField()
    actors = models.TextField()
    description = models.TextField()
    avg_vote = models.TextField(null=True, blank=True)
    poster_path = models.TextField(null=True, blank=True)
    avg_star = models.TextField(null=True, blank=True)


class Review(models.Model):
    movie = models.ForeignKey(
        Movie, verbose_name=("리뷰 단 영화"), on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="reviews")

    like_users = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='like_reviews', blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    star = models.IntegerField()
    checked_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content


class Review_Comment(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    review = models.ForeignKey(
        Review, verbose_name=("오리지널 리뷰"), on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content
