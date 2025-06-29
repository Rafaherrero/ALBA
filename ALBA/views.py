from django.http import HttpResponse
from django.template import loader
import random

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.conf import settings
import json
import os
from datetime import datetime

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

@require_http_methods(["POST"])
def save_data(request):
    try:
        data = json.loads(request.body)
        filename = data.get('filename')
        file_data = data.get('data')
        
        if not filename or not file_data:
            return JsonResponse({'error': 'Faltan datos requeridos'}, status=400)
        
        save_dir = os.path.join(settings.MEDIA_ROOT, 'alba_exports')
        os.makedirs(save_dir, exist_ok=True)
        file_path = os.path.join(save_dir, filename)
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(file_data, f, ensure_ascii=False, indent=2)
        
        return JsonResponse({
            'success': True,
            'message': 'Archivo guardado correctamente',
            'filename': filename,
            'path': file_path
        })
        
    except json.JSONDecodeError:
        return JsonResponse({'error': 'JSON inválido'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
