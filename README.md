# PCTAG - Una aplicación para etiquetar casos relacionados con el Pensamiento Computacional

<p align="center">
  <img src="https://github.com/Rafaherrero/pctag/blob/main/imgs/logo_pctag.png" style="width:300px"/>
</p>
<p align="center"><em>Imagen generada con Inteligencia Artificial (DALL·E)</em></p>

Los sistemas de Inteligencia Artificial necesitan miles/millones de casos de los que extraer patrones con los que posteriormente calcular una salida. Una de las técnicas más utilizadas se basa en el aprendizaje supervisado, donde los datos están etiquetados para poder determinar correctamente cuál es la salida esperada.

Sin embargo, obtener estos datos previamente etiquetado requiere de un gran trabajo humano, por lo que con este proyecto se plantea una aplicación web para aligerar este proceso. *PCTAG* genera casos de manera aleatoria relacionados con el desarrollo de habilidades de Pensamiento Computacional, de manera que un profesional pueda indicar si esa persona debe continuar con el concepto que estaba trabajando, volver al concepto anterior o pasar el siguiente. Esta información servirá para entrenar un sistema de aprendizaje adaptativo basado en emociones para el entrenamiento de habilidades de Pensamiento Computacional [1].

[1] Herrero-Álvarez, R. (2023). Development of an open-source emotion-based adaptive learning support system using computational thinking activities. *Proceedings of the 2023 Conference on Innovation and Technology in Computer Science Education V. 2*, 601-602.  [https://doi.org/10.1145/3587103.3594141](https://doi.org/10.1145/3587103.3594141).

## Descripción

*PCTAG* consiste en una página web donde se mostrarán diferentes casos de manera aleatoria teniendo en cuenta las siguientes 10 variables:
1. Género: en este caso se contempla mujer y hombre.
2. Edad: en un rango de 6 a 19 años.
3. Conceptos: diferentes conceptos de programación, en concreto secuencias, bucles, condicionales, variables, funciones y eventos.
4. Intentos: cantidad de veces que ha necesitado para superar esos ejercicios, entre 1 y 5.
5. Calificación: puntuación obtenida en ese concepto, entre 0 y 10 con dos decimales.
6. Ayuda: necesitó o no ayuda.
7. Emociones: clasificadas en negativas, positivas y neutras.
8. Cuestionario. Pregunta 1 (¿Te han gustado estas actividades?): variando entre 1 y 5.
9. Cuestionario. Pregunta 2 (¿Crees que necesitas mejorar?): variando entre 1 y 5.
10. Cuestionario. Pregunta 3 (¿Te ha resultado fácil?): variando entre 1 y 5. 

Con esta información, un profesional deberá marcar si esa persona debe realizar ejercicios relacionados con un concepto anterior, reforzarlo con más actividades o pasar al siguiente. Cada vez que marque una opción se recargará el caso con nuevos valores aleatorios y aumentará el contador de casos etiquetados. Una vez termine, podrá darle al botón de descargar, donde se generará un fichero JSON con todos los datos.

<p align="center">
  <img src="https://github.com/Rafaherrero/pctag/blob/main/imgs/pctag.gif" style="width:700px"/>
</p>
<p align="center"><em>GIF mostrando el funcionamiento de PCTAG</em></p>

## Instalación
*PCTAG* utiliza Django como framework para el desarrollo de la aplicación web, por lo que es indispensable que lo tengamos instalado en nuestro sistema, comenzando con Python y, preferiblemente, un gestor de paquetes como *pip*. Puedes consultar como instalar ambos desde las páginas web oficiales: [Instalar Python](https://wiki.python.org/moin/BeginnersGuide/Download); [Instalar *pip*](https://pip.pypa.io/en/stable/installation/).

Una vez lo tengamos, es necesario ejecutar el siguiente comando para instalarlo:
```console
$ python  -m  pip  install  Django
```

Con Django ya instalado lo primero que tenemos que hacer es crear un proyecto ejecutando el siguiente comando:
```console
$ django-admin  startproject  miproyecto
```

Ahora, nos desplazamos a la carpeta `miproyecto` y creamos nuestra aplicación, *PCTAG*, ejecutando este comando:
```console
$ python  manage.py  startapp  pctag
```

Una vez creada la aplicación, tenemos que modificar el fichero `settings.py` de `miproyecto`, añadiendo la aplicación que acabamos de crear, `pctag`, a la lista de aplicación instaladas, `INSTALLED_APPS`. También tenemos que modificar el fichero `urls.py` de `miproyecto` e incluir la ruta a la aplicación creada, quedando como sigue:
```
urlpatterns = [
	path('', include('pctag.urls')),
	path('admin/', admin.site.urls)
]
```

Ejecutamos también el siguiente comando:
```console
$ python manage.py migrate
```

Por último, tenemos que colocar los todos ficheros de la carpeta `pctag` de este repositorio dentro de la carpeta `pctag` que Django ha creado para nuestra aplicación. Si recibimos algún aviso de que se sobrescribirán ficheros, aceptamos el aviso.

## Funcionamiento

Una vez terminado los pasos de instalación, nos situaremos en la carpeta de `miproyecto` y ejecutaremos este comando para lanzar el servidor, por defecto en [http://127.0.0.1:8000/](http://127.0.0.1:8000/):
```console
$ python  manage.py  runserver
```

Cabe mencionar que se ha utilizado Django para el desarrollo de esta aplicación por su gran versatilidad y facilidad de implementación. Es por ello que se plantean algunas líneas futuras como el uso de bases de datos (como SQLite) para el almacenamiento de los resultados de etiquetado, o la gestión de usuarios de manera que el usuario final no tenga que desplegar la aplicación, si no simplemente acceder a una página web y desde ahí realizar el etiquetado.

**Proyecto realizado por [Rafael Herrero Álvarez](http://rafaherrero.com/).**