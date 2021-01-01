from django.contrib import admin
from accounts.models import User
from .models import Movie, Review, Review_Comment

admin.site.register(User)
admin.site.register(Movie)
admin.site.register(Review)
admin.site.register(Review_Comment)