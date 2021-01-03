from django.urls import path, include
from . import views
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('signup/', views.signup),
    path('api-token-auth/', obtain_jwt_token)
]
