from rest_framework import permissions
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/movie_community/', include('movie_community.urls')),
    path('api/v1/movie_community/accounts/', include('accounts.urls')),
]