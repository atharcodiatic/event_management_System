from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AttendeeViewSet

router = DefaultRouter()
router.register(r'attendees', AttendeeViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
