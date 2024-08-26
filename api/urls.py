from . import views
# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SubfamilyViewSet
#from .views import get_subfamilies 
router = DefaultRouter()
router.register(r'subfamilies', SubfamilyViewSet)

urlpatterns = [
    path('', include(router.urls)),
#    path('' , get_subfamilies, name='get_subfamilies'),
]

