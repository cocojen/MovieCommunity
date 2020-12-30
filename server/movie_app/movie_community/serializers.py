from rest_framework import serializers
from .models import Movie, Review, Review_Comment


class ReviewCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review_Comment
        fields = ('id', 'content', 'created_at',
                  'updated_at', 'review', 'movie')


class ReviewSerializer(serializers.ModelSerializer):

    comments = ReviewCommentSerializer(many=True, read_only=True)

    class Meta:
        model = Review
        fields = ('id', 'content', 'movie', 'star', 'comments', 'user', 'created_at', 'updated_at')




class MovieSerializer(serializers.ModelSerializer):

    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ('id', 'title', 'year', 'genre', 'duration', 'country', 'language', 'director', 'actors', 'description', 'avg_vote', 'poster_path',
                  'avg_star', 'reviews')
        # fields = '__all__'


class MovieExportSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = '__all__'