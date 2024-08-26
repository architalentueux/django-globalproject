from django.urls import path
from . import views
from django.urls import include
from .views import check_item
from .views import check_species
from .views import check_coords
from .views import post_thegenusspecies
# url des vues de django
urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('post/new/', views.post_new, name='post_new'),
    path('post/acceuil/', views.post_acceuil, name='post_acceuil'),
    path('', views.react_app, name='react_app'),
    path('post/distribution/', views.post_distribution, name='post_distribution'),
    path('post/thegenusspecies/', views.post_thegenusspecies, name='post_thegenusspecies'),
    #add your myapi app urls path here
#    path('api/', include('myapi.urls')),
    path('api/', include('api.urls')),
    path('check-item/', views.check_item, name='check_item'),
    path('check-species/', views.check_species, name='check_species'),
    path('<str:distribution_id>/check-coords/', views.check_coords, name='check_coords'),
    path('autocomplete/', views.autocomplete_search, name='autocomplete'),
    path('search_species/', views.search_species_genus, name='search_species'),
    path('<str:namegenus>/check-species-bygenus/', views.check_species_bygenus, name='check_species_bygenus'),
# search_species_genus
# check_species
#    path('~/django/myapi', views.hello_world, name='hello_world')
]
