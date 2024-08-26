
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.utils import timezone
from .models import Post
from .models import Subfamily
from .models import Continent
from .models import Tribe
from .models import Genus
from .models import Speciesv2
from .models import DistributionSpecies
from .forms import PostForm

# importation des forms
from .forms import SubfamilyForm
from .forms import ContinentForm
# importation des reponses 
from django.http import StreamingHttpResponse
import json

from django.http import JsonResponse
# Create your views here.
def post_list(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    subfamilies = Subfamily.objects.all()
    continents = Continent.objects.all()
    tribes = Tribe.objects.all()
    genus = Genus.objects.all()
    # try to recup selected option
     
    return render(request, 'globalproject/post_list.html', {'posts':posts, 'subfamilies':subfamilies, 'continents':continents, 'tribes':tribes, 'genus':genus})

def subfamily_list(request):
    subfamilies = Subfamily.objects.values_list()
    return render(request, 'globalproject/post_list.html', {'subfamilies':subfamilies})

def react_app(request):
    return render(request, 'globalproject/base.html')

# view for distribution template
def post_distribution(request):
#    distribution = DistributionSpecies.objects.filter(country_iso3='CIV')
    return render(request, 'globalproject/post_distribution.html')

#new view
def post_new(request):
    form = PostForm()
    return render(request, 'globalproject/post_edit.html', {'form': form})

# creation des vues issus du formulaire forms
def post_acceuil(request):
    subfamily = SubfamilyForm()
    continent = ContinentForm()
    subfamilies = Subfamily.objects.all()
    continents = Continent.objects.all()
    # essaie de recuperation de la variable 
    variable_value = request.GET.get('variable')

    context = {
            'variable_value': variable_value
        }
    response_data = {
            'message': 'Variable récupérée avec succès',
            'variable': variable_value
        }
    return render(request, 'globalproject/post_acceuil.html', {'Continent':continent, 'Subfamily':subfamily,
    'subfamilies':subfamilies, 'continents':continents,  'variable_value':variable_value})

# creation de la vue pour renvoyer une reponse a l'utilisateur vue test variable
def check_item(request):
    if request.method == 'GET':
        variable = request.GET.get('variable')
        tribselect = request.GET.get('tribselect')
#        tribsubfamly = Tribe.objects.filter(idsubfamily=variable)
        try:
#            tribes = Tribe.objects.all()
            tribsubfamly = Tribe.objects.filter(idsubfamily=variable)
            #filtrer les genre suivant les tribus
            genustrib = Genus.objects.filter(idtribe=tribselect)
            # Convertir les objets Django en dictionnaires
            tribsubfamly = [{'idtribe': tribsubf.idtribe, 'nametribe': tribsubf.nametribe} for tribsubf in tribsubfamly]
            item = 'parfait'

            genustrib = [{'idgenus': genustr.idgenus, 'namegenus': genustr.namegenus} for genustr in genustrib]
            return JsonResponse({'message': 'Item found', 'variable': variable, 'tribsubfamly': tribsubfamly,
            'tribselect':tribselect, 'genustrib': genustrib},)
        except:
            return JsonResponse({'message': 'Item not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# check-species
@csrf_exempt
def check_species(request):
    if request.method == 'POST':
        # essaie de selection du continent et de la subfamille
        if 'lecontinent' in request.POST:
            lecontinent = request.POST.get('lecontinent')
            print(lecontinent)
        if 'lecontinent' in request.POST and 'dropdown1' in request.POST:
            lecontinent = request.POST.get('lecontinent')
            dropdown1 = request.POST.get('dropdown1')
            print(dropdown1)
        
        if 'lecontinent' in request.POST and 'dropdown1' in request.POST and 'letribe' in request.POST:
            lecontinent = request.POST.get('lecontinent')
            dropdown1 = request.POST.get('dropdown1')
            letribe = request.POST.get('letribe')
        
        if 'lecontinent' in request.POST and 'dropdown1' in request.POST and 'letribe' in request.POST and 'legenus' in request.POST:
            lecontinent = request.POST.get('lecontinent')
            dropdown1 = request.POST.get('dropdown1')
            letribe = request.POST.get('letribe')
            legenus = request.POST.get('legenus')

        if dropdown1 == "0":
            dropdown1 = None
        if letribe == "0":
            letribe = None
            print(legenus)
        if legenus == "0":
            legenus = None

            print("le dropdown1 est 0")
        else:
            print("ou se trouve le continent")
#        conselec = request.POST.get('dropdown2')
#        subselec = request.POST.get('subselec')
#        con = request.POST.get('con')
#        tribsubfamly = Tribe.objects.filter(idsubfamily=variable)
        try:
             # filtrer grace a l id de la subfamily/
#            tribesubfamly = Tribe.objects.filter(idsubfamily=dropdown1).values_list('nametribe', flat=True)

#            Tribu.objects.filter(family_id=family_id).values_list('name', flat=True)
            # filtrer les especes avec les noms des tribes et des continents
            especes = None  # Initialiser la variable especes à None
            
#            if dropdown1 is not None and lecontinent is not None:
            #filtrer les genre suivant les tribus
#                 tribessubfamily = Tribe.objects.filter(idsubfamily=dropdown1).values_list('nametribe', flat=True)
#                 especes = Speciesv2.objects.filter(nametribe=tribessubfamily, idcontinent=lecontinent)
#                 print("lobjet est:", especes)
         
            if lecontinent is not None and dropdown1 is None:
               especes = Speciesv2.objects.filter(idcontinent=lecontinent)
               
               print("le contin nest pas vide")
            if dropdown1 is not None or dropdown1==0 and lecontinent is not None and letribe is None:
               print("le dropdown nest pas vide")
               tribessubfamily = Tribe.objects.filter(idsubfamily=dropdown1).values_list('nametribe', flat=True)
               print(tribessubfamily)
               especes = Speciesv2.objects.filter(nametribe__in=tribessubfamily, idcontinent=lecontinent)
               print("lequerysetespeces",especes)
              
            if letribe is not None and dropdown1 is not None and lecontinent is not None and legenus is None:
               tribe = Tribe.objects.get(idtribe=letribe)
               tribe_name = tribe.nametribe  # Récupérer le nom de la tribu
               especes = Speciesv2.objects.filter(nametribe=tribe_name, idcontinent=lecontinent)
            
            if legenus is not None and dropdown1 is not None and lecontinent is not None and letribe is not None:
               tribe = Tribe.objects.get(idtribe=letribe)
               tribe_name = tribe.nametribe  # Récupérer le nom de la tribu
               especes = Speciesv2.objects.filter(nametribe=tribe_name, idgenus=legenus, idcontinent=lecontinent) 
#            if dropdown1  and lecontinent is not None:
#               especes = Speciesv2.objects.filter(idcontinent=lecontinent)

#               print("le contin nest pas vide")

#            if lecontinent is not None and dropdown1 is not None: 
#               especes = Speciesv2.objects.filter(nametribe=tribessubfamily, idcontinent=lecontinent)
            # ajouter dans les dictionnaires
            #
            #   especes = [{'idspeciesv2': esp.idspeciesv2, 'namespeciesv2': esp.namespeciesv2, 'nametribe': esp.nametribe} for esp in especes]
         
#            elif dropdown1 is not None and lecontinent is not None:
            #filtrer les genre suivant les tribus
#               tribessubfamily = Tribe.objects.filter(idsubfamily=dropdown1).values_list('nametribe', flat=True)
#               especes = Speciesv2.objects.filter(nametribe=tribessubfamily, idcontinent=lecontinent)
#               print("lobjet est:", especes)
#            genustrib = Genus.objects.filter(idtribe=tribselect)
            # Convertir les objets Django en dictionnaires
#            tribsubfamly = [{'idtribe': tribsubf.idtribe, 'nametribe': tribsubf.nametribe} for tribsubf in tribsubfamly]
            if especes is not None:
               especes_data = [{'idspeciesv2': esp.idspeciesv2, 'namespeciesv2': esp.namespeciesv2, 'nametribe': esp.nametribe, 'authorspeciesv2': esp.authorspeciesv2, 'linkpowo': esp.linkpowo} for esp in especes]
            else:
               especes_data = []
               item = 'aucune correspondance'
            item = 'parfait'
#            dropdown2 = request.POST.get('dropdown2')
            conselec = 'echec'
#            genustrib = [{'idgenus': genustr.idgenus, 'namegenus': genustr.namegenus} for genustr in genustrib]
            return JsonResponse({'message': 'Item found','lecontinent': lecontinent, 'conselec': conselec, 'item': item, 'especes': especes_data},)
        except:
            return JsonResponse({'message': 'Item not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
# on test le renvoie progressif
def stream_data(data):
    for item in data:
        yield json.dumps(item) + '\n'
        yield '\n'  # Pour séparer chaque élément JSON

def check_coords(request, distribution_id):
  print('j ai dans distribu id',distribution_id)
  with open('globalproject/static/distribution_species6.json', 'r', encoding='utf-8') as f:
#   print(json.load(f))
   distribution_species = json.load(f)
  
  print(distribution_species)
  print("ca a marche")
  if request.method == 'GET':
   try:
    print("je suis entree dans le try")
    distribution_id = distribution_id
#    distribution = DistributionSpecies.objects.filter(ipni_species=distribution_id)
#    distribution = DistributionSpecies.objects.select_related('ipni_species').filter(ipni_species=distribution_id).iterator()
#    print(distribution)
    print("je suis entree dans le try au niveau2")
    print("il est ou herve miaou")
#    with open('~/django/globalproject/static/distribution_species.json', 'r', encoding='utf-8') as f:
#     print("suis je dans le with")
#     distribution_species = json.load(f)
#     print(distribution_species)
#    print(distribution_species)
    print("tu es ou")
    print(distribution_id)
    def search_distribution_species(distribution_id, distribution_species):
     distribution = []
     for entry in distribution_species:
      print(entry)
      if entry['ipni'] == distribution_id:
       print("ok")
       print(entry['ipni'])
       distribution.append(entry)
     return distribution
       #yield entry
    print("debut-1 aff distribution")
    distribution = search_distribution_species(distribution_id, distribution_species)
    print("debut aff distribution")
    print(distribution)
    print("fin affichage distribution")
# recuperation de l'id du genre et nom du genre pour afficher sur la distribution
#    specie2 = Speciesv2.objects.get(idspeciesv2=distribution_id)
#    idgenre2 =  specie2.idgenus
#    genus2 = Genus.objects.get(idgenus=idgenre2)
#    genusdistr = genus2.namegenus
# recuperation de la liste des especes qui appartiennent au genre specifique
#    liste_species_genus = Speciesv2.objects.filter(idgenus=idgenre2)
    
# uniquement pour tester sur la meme page de distribution
#    distribution = DistributionSpecies.objects.get(iddistribution=distribution_id)
#    coords = [{'latitude': distributionspecies.ddlat, 'longitude': distributionspecies.ddlong, 'species': distributionspecies.accepted_name}]
#    coords = {'latitude': distribution.ddlat, 'longitude': distribution.ddlong,}  
#    return JsonResponse(coords)

        # Créez une liste pour stocker les coordonnées de toutes les espèces correspondantes
#    coords_list = []
    # initialisation de la liste pour les distribution de genre
    sp_of_genus_dst = []
    # Itérer sur tous les objets Species correspondants
#    for distribu in distribution:
#        coords_list.append({
#            'latitude': distribu.ddlat,
#            'longitude': distribu.ddlong,
#            'espece': distribu.accepted_name,
#            'country': distribu.country_iso3,
#            'collector': distribu.recorded_by,
            # Ajoutez d'autres champs si nécessaire
#        })
#        return JsonResponse({'species_coords': coords_list, },safe=False)
    def extract_coordinates(distribution):
     extracted_data = []
     for item in distribution:
        # Récupérer les valeurs de latitude, longitude et identifiant
        latitude = item.get('ddlat')
        longitude = item.get('ddlong')
        espece = item.get('accepted_name')
        country = item.get('country_iso3')
        collector = item.get('recorded_by')
        collector_num = item.get('colnum')
        # Ajouter les informations extraites à la liste
        extracted_data.append({
            'latitude': latitude,
            'longitude': longitude,
            'espece': espece,
            'country': country,
            'collector': collector,
            'collector_num': collector_num
        })
        return extracted_data

# Utilisation de la fonction
    extracted_data = extract_coordinates(distribution)
#print(extracted_data)

    print("on va essayer")
    coords_list = [{
#            'latitude': distribu.ddlat,
            'latitude': distribu['ddlat'],
#            'longitude': distribu.ddlong,
            'longitude': distribu['ddlong'],
            'espece': distribu['accepted_name'],
            'country': distribu['country_iso3'],
            'collector': distribu['recorded_by'],
            'collector_num': distribu['colnum'], 
            # Ajoutez d'autres champs si nécessaire
         } for distribu in distribution]
    print("okkkkkkkkkkkkkkkkkkkkkkk")
    print(extracted_data)
    print("puis je avoir les coordoonnees")
    print(coords_list)
    print("les coordoonnees ont marchés")
#    coords_list = [{'latitude': distribu.ddlat, 'longitude': distribu.ddlong,  'espece': distribu.accepted_name, 'country': distribu.country_iso3, 'collector': distribu.recorded_by,} for distribu in distribution]
# recuperation de l'id du genre et nom du genre pour afficher sur la distribution
#    coords_list = extracted_data
    specie2 = Speciesv2.objects.get(idspeciesv2=distribution_id)
    idgenre2 =  specie2.idgenus
    genus2 = Genus.objects.get(idgenus=idgenre2)
    genusdistr = genus2.namegenus
# recuperation de la liste des especes qui appartiennent au genre specifique
#    liste_species_genus = Speciesv2.objects.filter(idgenus=idgenre2)
  
    # Parcourir chaque espèce et récupérer ses informations de distribution
 #   for esp in liste_species_genus:
#        distribution_genus = DistributionSpecies.objects.filter(ipni_species=esp.idspeciesv2)
    # Ajouter les informations de distribution à la liste des résultats
#        for distri_genus in distribution_genus:
#            sp_of_genus_distr = {
#                'species_name': esp.namespeciesv2,
#                'latitude': distri_genus.ddlat,
#                'longitude': distri_genus.ddlong,
#                'idspecies': esp.idspeciesv2,
#                'country': distri_genus.country_iso3,
#                'collector': distri_genus.recorded_by,
#            }
#            sp_of_genus_dst.append(sp_of_genus_distr) 
    # Passer les coordonnées des espèces au contexte
#    context = {
#        'species_coords': coords_list,
#    }

#    return render(request, 'globalproject/post_distribution.html', context)

 # Créez une liste pour stocker les coordonnées de tous les objets correspondants
#    coords = []

    # Itérer sur tous les objets DistributionSpecies correspondants
#    for distribution in distributions:
#        coords.append({
#            'latitude': distribution.ddlat,
#            'longitude': distribution.ddlong,
#            'species': distribution.accepted_name
#        })
    message = 'j ai quand meme une vue info'
    print(message)
    print(coords_list)
#    return JsonResponse({'species_coords': coords_list, 'message': message, 'genus': genusdistr, 'distrib_gen': sp_of_genus_dst}, safe=False)
#    return StreamingHttpResponse({'species_coords': stream_data(coords_list)}, content_type='application/json')
    return JsonResponse({'species_coords': coords_list, 'message': message, 'genus': genusdistr},safe=False)
   except:
    return JsonResponse({'message': 'Item not found'}, status=404)
#    return JsonResponse(coords, safe=False)

# essaie de realisation de l'autocompletion en fonction des suggestions
def autocomplete_search(request):
    query = request.GET.get('term')
    print(query)
    sugestspecies = Speciesv2.objects.filter(namespeciesv2__icontains=query)
#    locations = Location.objects.filter(location__icontains=query)
    suggestions = list(sugestspecies.values_list('namespeciesv2', flat=True))
    return JsonResponse(suggestions, safe=False)


# essaie d'affichage des especes et genre a checker

def search_species_genus(request):
    if request.method == 'GET':
        name_species_or_genus = request.GET.get('name') 
        # essaie de selection du continent et de la subfamille
        Species = Speciesv2.objects.get(namespeciesv2=name_species_or_genus)

        return JsonResponse({'idspecies':Species.idspeciesv2, 'namespecies': Species.namespeciesv2, 'author': Species.authorspeciesv2, 'linkpowo': Species.linkpowo},safe=False)



# recuperation des especes par nom du genre sélectionné
def check_species_bygenus(request, namegenus):
#    namegenus= namegenus.lower()
    if request.method == 'GET':
#        namegenus = request.GET.get('namegenus')
        print(namegenus)
        try:
#           recupere moi le code ipni du genre selectionné dans la table des genre
            
            genus = Genus.objects.get(namegenus=namegenus)
            print(genus)
            # recupere moi l'identifiant du genus dans genustrib
            identgenus= genus.idgenus
            # sort la liste des especes issus de cet identifiant
            especesbygenus = Speciesv2.objects.filter(idgenus=identgenus)
            # Convertir les objets Django en dictionnaires
            especesbygenuslist = [{'idspecies':spbygenus.idspeciesv2, 'namespecies': spbygenus.namespeciesv2, 'nametribe': spbygenus.nametribe, 'authorspeciesv2': spbygenus.authorspeciesv2, 'linkpowo': spbygenus.linkpowo } for spbygenus in especesbygenus]
           
            return JsonResponse({'especesbygenus':especesbygenuslist},)
        except:
            return JsonResponse({'message': 'Item not found'}, status=404)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# view list of species for genus selected
def post_thegenusspecies(request):
#    distribution = DistributionSpecies.objects.filter(country_iso3='CIV')
    return render(request, 'globalproject/post_thegenusspecies.html')

