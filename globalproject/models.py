from django.db import models

# Create your models here.
from django.conf import settings
from django.utils import timezone

class Post(models.Model):

    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.

# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.


class AuthorSpecies(models.Model):
    idauthorisation = models.ForeignKey('AuthorisationRes', models.DO_NOTHING, db_column='idauthorisation')
    idspecies = models.ForeignKey('Species', models.DO_NOTHING, db_column='idspecies')

    class Meta:
        managed = False
        db_table = 'author_species'


class AuthorisationRes(models.Model):
    idauthorisation = models.AutoField(primary_key=True)
    name_authorisation = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'authorisation_res'


class Botanist(models.Model):
    idbotanist = models.AutoField(primary_key=True)
    namebotanist = models.CharField(max_length=150, blank=True, null=True)
    function_botanist = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'botanist'


class CollectGathering(models.Model):
    idcollect = models.AutoField(primary_key=True)
    numbercollect = models.CharField(max_length=150, blank=True, null=True)
    commentary = models.CharField(max_length=500, blank=True, null=True)
    collector_number = models.CharField(max_length=150, blank=True, null=True)
    herb_location = models.CharField(max_length=150, blank=True, null=True)
    idprovider = models.ForeignKey('ProviderSendersample', models.DO_NOTHING, db_column='idprovider')
    collector_name = models.CharField(max_length=150)
    year_collect = models.CharField(max_length=50, blank=True, null=True)
    location_gathering = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'collect_gathering'


class CollectSpecies(models.Model):
    idcollect = models.ForeignKey(CollectGathering, models.DO_NOTHING, db_column='idcollect')
    idspecies = models.ForeignKey('Species', models.DO_NOTHING, db_column='idspecies')

    class Meta:
        managed = False
        db_table = 'collect_species'


class Continent(models.Model):
    idcontinent = models.AutoField(primary_key=True)
    namecontinent = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'continent'

class DistributionSpecies(models.Model):
    iddistribution = models.AutoField(primary_key=True)
    ipni_species = models.ForeignKey('Speciesv2', models.DO_NOTHING, db_column='ipni_species', blank=True, null=True)
    accepted_name = models.CharField(max_length=150, blank=True, null=True)
    scientific_name = models.CharField(max_length=150, blank=True, null=True)
    idcountry = models.ForeignKey('Locality', models.DO_NOTHING, db_column='idcountry', blank=True, null=True)
    ddlong = models.DecimalField(max_digits=50, decimal_places=0, blank=True, null=True)
    ddlat = models.DecimalField(max_digits=50, decimal_places=0, blank=True, null=True)
    recorded_by = models.CharField(max_length=150, blank=True, null=True)
    col_date = models.CharField(max_length=150, blank=True, null=True)
    col_year = models.CharField(max_length=150, blank=True, null=True)
    det_by = models.CharField(max_length=9000, blank=True, null=True)
    det_year = models.CharField(max_length=150, blank=True, null=True)
    det_date = models.CharField(max_length=150, blank=True, null=True)
    locality = models.CharField(max_length=9000, blank=True, null=True)
    institute = models.CharField(max_length=4000, blank=True, null=True)
    herbarium_code = models.CharField(max_length=9000, blank=True, null=True)
    barcode = models.CharField(max_length=30000, blank=True, null=True)
    status = models.CharField(max_length=150, blank=True, null=True)
    country_iso3 = models.CharField(max_length=150, blank=True, null=True)
    coordinate_id = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'distribution_species'






class Extraction(models.Model):
    idextraction = models.AutoField(primary_key=True)
    numstatus = models.ForeignKey('Status', models.DO_NOTHING, db_column='numstatus')
    idrun = models.ForeignKey('Run', models.DO_NOTHING, db_column='idrun')
    extrrun_numint = models.IntegerField(blank=True, null=True)
    extrun_numext = models.IntegerField(blank=True, null=True)
    quantity_adn = models.FloatField(blank=True, null=True)
    gel = models.IntegerField(blank=True, null=True)
    shearing = models.IntegerField(blank=True, null=True)
    intlib = models.IntegerField(blank=True, null=True)
    sample_qtity_nbr = models.IntegerField(blank=True, null=True)
    tcs = models.CharField(max_length=150)
    comment_extr = models.CharField(max_length=500, blank=True, null=True)
    barcode = models.CharField(max_length=150, blank=True, null=True)
    date_extraction = models.DateField(blank=True, null=True)
    rarete = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'extraction'


class ExtractionSpecies(models.Model):
    idspecies = models.ForeignKey('Species', models.DO_NOTHING, db_column='idspecies')
    idextraction = models.ForeignKey(Extraction, models.DO_NOTHING, db_column='idextraction')

    class Meta:
        managed = False
        db_table = 'extraction_species'


class Genus(models.Model):
    idgenus = models.CharField(primary_key=True, max_length=150)
    idtribe = models.IntegerField()
    namegenus = models.CharField(max_length=150)
    linkpowo = models.CharField(max_length=950, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'genus'


class Index(models.Model):
    idindex = models.AutoField(primary_key=True)
    grouptag = models.CharField(max_length=150, blank=True, null=True)
    indexnumber = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'index'


class Locality(models.Model):
    idlocality = models.AutoField(primary_key=True)
    country = models.CharField(max_length=150, blank=True, null=True)
    city = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'locality'


class Nirs(models.Model):
    idnirs = models.AutoField(primary_key=True)
    idspecies = models.ForeignKey('Species', models.DO_NOTHING, db_column='idspecies')
    codenirs = models.CharField(max_length=150)
    barcode = models.CharField(max_length=150)
    link_img_nirs = models.CharField(max_length=150, blank=True, null=True)
    comment_nirs = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'nirs'


class ProviderSendersample(models.Model):
    idprovider = models.AutoField(primary_key=True)
    nameprovider = models.CharField(max_length=150, blank=True, null=True)
    idbotanist = models.ForeignKey(Botanist, models.DO_NOTHING, db_column='idbotanist')

    class Meta:
        managed = False
        db_table = 'provider_sendersample'


class Resume(models.Model):
    idresume = models.AutoField(primary_key=True)
    numberspecies = models.IntegerField(blank=True, null=True)
    continent = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'resume'


class Run(models.Model):
    idrun = models.AutoField(primary_key=True)
    run = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'run'


class RunIndex(models.Model):
    idrun = models.ForeignKey(Run, models.DO_NOTHING, db_column='idrun')
    idindex = models.ForeignKey(Index, models.DO_NOTHING, db_column='idindex')

    class Meta:
        managed = False
        db_table = 'run_index'


class Species(models.Model):
    idspecies = models.AutoField(primary_key=True)
    idspecies_phit = models.ForeignKey('SpeciesPhit', models.DO_NOTHING, db_column='idspecies_phit')
    idgenus = models.IntegerField()
    namespecies = models.CharField(max_length=150)
    commentary = models.CharField(max_length=800, blank=True, null=True)
    tcs = models.CharField(max_length=150)
    keepsampl_method = models.CharField(max_length=30)
    idlocation_species = models.IntegerField(blank=True, null=True)
    idlocality = models.ForeignKey(Locality, models.DO_NOTHING, db_column='idlocality')

    class Meta:
        managed = False
        db_table = 'species'


class SpeciesPhit(models.Model):
    idspecies_phit = models.AutoField(primary_key=True)
    namespecies_phit = models.CharField(max_length=500)

    class Meta:
        managed = False
        db_table = 'species_phit'


class Speciesv2(models.Model):
    idspeciesv2 = models.CharField(primary_key=True, max_length=150)
    idgenus = models.CharField(max_length=150)
    idcontinent = models.ForeignKey(Continent, models.DO_NOTHING, db_column='idcontinent')
    namespeciesv2 = models.CharField(max_length=150, blank=True, null=True)
    nameepithet = models.CharField(max_length=150, blank=True, null=True)
    authorspeciesv2 = models.CharField(max_length=150, blank=True, null=True)
    commentsv2 = models.CharField(max_length=1500, blank=True, null=True)
    acceptornot = models.CharField(max_length=150, blank=True, null=True)
    namefamily = models.CharField(max_length=150, blank=True, null=True)
    nametribe = models.CharField(max_length=150, blank=True, null=True)
    validforproject = models.CharField(max_length=150, blank=True, null=True)
    linkpowo = models.CharField(max_length=950, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'speciesv2'


class Specimen(models.Model):
    idspecimen = models.CharField(primary_key=True, max_length=150)
    idgenus = models.CharField(max_length=150, blank=True, null=True)
    namespecimen = models.CharField(max_length=150, blank=True, null=True)
    nameepithet = models.CharField(max_length=150, blank=True, null=True)
    keepsamplemethod = models.CharField(max_length=150, blank=True, null=True)
    nametribe = models.CharField(max_length=150, blank=True, null=True)
    idspeciesv2 = models.CharField(max_length=150, blank=True, null=True)
    comments = models.CharField(max_length=800, blank=True, null=True)
    idlocality = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'specimen'


class Status(models.Model):
    idstatus = models.AutoField(primary_key=True)
    typestatus = models.CharField(max_length=150)
    numstatus = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'status'


class Subfamily(models.Model):
    idsubfamily = models.CharField(primary_key=True, max_length=150)
    namesubfamily = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'subfamily'


class Synonymous(models.Model):
    idsynonymous = models.CharField(primary_key=True, max_length=150)
    namespecies = models.CharField(max_length=150, blank=True, null=True)
    synonymous = models.CharField(max_length=150, blank=True, null=True)
    comments = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'synonymous'


class Tag(models.Model):
    idtag = models.AutoField(primary_key=True)
    idindex = models.ForeignKey(Index, models.DO_NOTHING, db_column='idindex')
    grouptag = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tag'


class Tribe(models.Model):
    idtribe = models.AutoField(primary_key=True)
    idsubfamily =  models.IntegerField()
    nametribe = models.CharField(max_length=300)

    class Meta:
        managed = False
        db_table = 'tribe'
