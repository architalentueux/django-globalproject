from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
# api/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse

from rest_framework import viewsets
from .models import Subfamily
from .serializers import SubfamilySerializer

from django.core.serializers import serialize

class SubfamilyViewSet(viewsets.ModelViewSet):
    queryset = Subfamily.objects.all()
    subfamilies = Subfamily.objects.all()
    serializer_class = SubfamilySerializer
   
#    def get_subfamilies(request):
#        subfamilies = Subfamily.objects.all()
#        serializer = SubfamilySerializer(subfamilies, many=True)
#        return Response(serializer.data)


#    def get_subfamilies(request):
#        subfamilies_data = [{'idsubfamily': subfamilies.idsubfamily,
#        'namesubfamily': subfamily.namesubfamily} for subfamily in subfamilies] 
    # try to recup selected option

#        return JsonResponse({'subfamilies':subfamilies_data})

 #   return render(request, {'subfamilies':subfamilies})



#@api_view(['GET'])
#def get_subfamilies(request):
#    subfamilies = Subfamily.objects.all()
#    subfamilies = serialize('json', subfamilies)
#    subfamilies_data = [{'idsubfamily': subfamiles.idsubfamily,
#    'namesubfamily': subfamily.namesubfamily} for subfamily in subfamilies]
    # try to recup selected option
    
 #   subfamilies_data = json.dumps({'subfamilies': subfamilies_data})
 #   return Response(sub_families_data, content_type='application/json')
#    return JsonResponse({'subfamilies':subfamilies_data})
 #   return render(request, {'subfamilies':subfamilies})



