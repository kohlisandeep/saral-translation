import json

from django.shortcuts import render
from rest_framework import mixins, viewsets, views
from rest_framework.templatetags.rest_framework import data

from .models import Endpoint, MLAlgorithm, MLRequest, EnglishToHindiTranslation
from .serializers import MLAlgorithmSerializer, EndpointSerializer, MLRequestSerializer, PersonDataSerialzer
from .machine_learning_models.translate_model import Translate
from rest_framework.response import Response
from .authentication import APIAuthentication
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView  # for api
from rest_framework import viewsets
from rest_framework import status


# Create your views here.

class EndpointView(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    """View to get all the available endpoints"""
    queryset = Endpoint.objects.all()
    serializer_class = EndpointSerializer
    authentication_classes = (APIAuthentication,)


class MLAlgoirthmView(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    """View to get all the available algorithms"""
    queryset = MLAlgorithm.objects.all()
    serializer_class = MLAlgorithmSerializer
    authentication_classes = (APIAuthentication,)


class MLRequestView(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet, mixins.UpdateModelMixin):
    """View to get all the successful request history"""
    queryset = MLRequest.objects.all()
    serializer_class = MLRequestSerializer
    authentication_classes = (APIAuthentication,)


class TranslateView(views.APIView):
    """View to get the translation from english to hindi"""
    authentication_classes = (APIAuthentication,)
    def post(self, request, endpoint):
        algorithm = MLAlgorithm.objects.filter(parent_endpoint__name__iexact=endpoint).first()
        if not algorithm:
            return Response({'status': 'Error', 'Error': 'Given Endpoint Does Not Exists'}, status=404)
        serializer = PersonDataSerialzer(data=request.data)
        if serializer.is_valid():
            data = dict()
            translate_obj = Translate()
            for key in serializer.validated_data:
                data_to_translated = serializer.validated_data.get(key)
                if data_to_translated:
                    translated_data = translate_obj.convert(data_to_translated)
                    data[key] = translated_data
                    mlrequest = MLRequest(input_data=json.dumps(data_to_translated),
                                          full_response=json.dumps(translated_data),
                                          response=json.dumps(translated_data),
                                          feedback="",
                                          parent_mlalgorithm=algorithm)
                    mlrequest.save()
            return Response(data)
        else:
            return Response({'message': 'Invalid data'}, status=400)


class TranslateStringView(views.APIView):

    def get(self, request):
        word = request.query_params.get('query')
        possible_match = EnglishToHindiTranslation.objects.filter(english__iexact=word).first()
        data = {}
        if possible_match is not None:
            data = possible_match.hindi
        return Response({'status': 'Success', 'data': data}, status=200)


class SearchAndUpdateAPIView(APIView):

    def post(self, request):

        data = request.data

        for key in data:
            record = EnglishToHindiTranslation.objects.filter(english__iexact=key).first()
            if record:
                record.hindi = data[key]
                record.save()
            else:
                add_new = EnglishToHindiTranslation.objects.create(english=key, hindi=data[key])

        return Response({'status': 'Success', 'message': 'Saved Successfully'}, status=200)
