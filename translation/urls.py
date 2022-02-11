from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EndpointView, MLAlgoirthmView, MLRequestView, TranslateView, SearchAndUpdateAPIView, TranslateStringView

router = DefaultRouter()
router.register(r'endpoints', EndpointView, basename='endpoints')
router.register(r'mlalgorithms', MLAlgoirthmView, basename='mlalgorithms')
router.register(r'mlrequest', MLRequestView, basename='mlrequest')
urlpatterns = [
    path('v1/', include(router.urls)),
    path('v1/translate/<str:endpoint>/', TranslateView.as_view(), name='translate'),
    path('v1/translate', TranslateStringView.as_view(), name='translatestring'),
    path('v1/translation/update', SearchAndUpdateAPIView.as_view()),
]
