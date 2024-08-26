from django import forms
from .models import Post
from .models import Subfamily
from .models import Continent

class PostForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = ('title', 'text',)

class SubfamilyForm(forms.ModelForm):

    class Meta:
        model = Subfamily
        fields = ('namesubfamily',)
        labels = {'namesubfamily': 'Subfamily'} 
class ContinentForm(forms.ModelForm):

    class Meta:
        model = Continent
        fields = ('namecontinent',)
        labels = {'namecontinent': 'Continent'}
