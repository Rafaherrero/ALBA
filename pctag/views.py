from django.http import HttpResponse
from django.template import loader
import random

def index(request):
  template = loader.get_template('index.html')
  context = {
    'gender': random.choice(['hombre', 'mujer']),
    'age': random.randint(6, 19),
    'concepts': random.choice(['secuencias', 'bucles', 'condicionales', 'variables', 'funciones', 'eventos']),
    'calification': round(random.uniform(0,10),2),
    'emotions': random.choice(['negativas', 'positivas', 'neutras']),
    'tries': random.randint(1, 5),
    'help': random.choice(['Sí', 'No']),
    'q1': random.randint(1, 5),
    'q2': random.randint(1, 5),
    'q3': random.randint(1, 5),
  }
  return HttpResponse(template.render(context))