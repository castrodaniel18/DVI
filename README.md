# Folklore Hunters

Folklore Hunters es un videojuego desarrollado para la asignatura Desarrollo de Videojuegos mediante Tecnologías Web de la Universidad Complutense de Madrid (UCM) durante el curso 2022-23.

  

## Descripción del proyecto

Este videojuego está desarrollado con el framework de Phaser3 y está pensado para jugarse en un navegador web.

El juego está ambientado en la mitología española, temática que debemos seguir este curso, y cuenta con enemigos, escenarios y objetos basados en distintos mitos del folclore ibérico.

## Capturas del juego/bocetos

<image  src="public/assets/web/portada.png"  alt="Portada del juego">

  

## Enlace al juego

[Folklore Hunters](https://castrodaniel18.github.io/DVI/)

  

# Arquitectura del juego

La arquitectura del juego se puede ver en el siguiente archivo UML

  

<image  src="https://raw.githubusercontent.com/castrodaniel18/DVI/master/uml.png">

  

# Folklore Hunters

#### *Visual Studio Games*

#### Miguel Zayas Boíza, Daniel Castro López, Iulius Gherasim, Rogger Huayllasco de la Cruz

## **Documento de diseño**

  

# 1. Información básica

  

- Título: Folklore Hunters

- Género: Shooter por oleadas, Roguelike

- Plataforma: Web

- Audiencia objetivo: Casual

  

## 1.1 Descripción

Este juego consiste en un shooter por oleadas en el que el jugador tendrá que sobrevivir y matar la mayor cantidad de enemigo posibles para poder enfrentarse al jefe del nivel y poder pasar a la siguiente zona.

Al derrotar enemigos el jugador irá obteniendo experiencia con la que podrá subir de nivel. Cada vez que suba de nivel tendrá la posibilidad de elegir entre tres objetos aleatorios que le proporcionarán una mejora permanente durante toda la partida. Además, también podrá obtener mejoras recogiendo objetos que habrá esparcidos por el mapa, solo que estos tendrán un efecto temporal.

El objetivo final del juego será recorrer todas las zonas del mapa derrotando el mayor número de enemigos posibles para hacerse lo suficientemente fuerte para derrotar a todos los jefes finales y salvar el mundo.

  

## 1.2 Ambientación

El escenario que se plantea en el juego es que el jugador es un cazador que se ha encontrado con que todo el país ha sido invadido por seres mitológicos que hasta ahora ni siquiera se sabía si existían realmente. Nuestro protagonista tomará el papel del héroe que va a salvar a todo el país, recorriendo cada región de España para derrotar a todos los monstruos. En cada región se encontrará con seres mitológicos típicos de esa región y, cuando haya acabado con suficientes monstruos débiles, obligará a aparecer al jefe, que en cada región será uno de los seres mitológicos más conocidos de esa región.

Del mismo modo, tanto los objetos que pueda recoger del suelo, como los objetos que el personaje obtiene al subir de nivel, serán objetos basados en la mitología de España.

  

# 2. Jugabilidad

  

## 2.1 Mecánicas

  

### 2.1.1 Mecánicas del jugador

  

- Elección de clase: al comienzo de la partida, el jugador tendrá que escoger qué tipo de mago quiere ser:

  

- Piromancer: Un mago de fuego que ataca tirando bolas de fuego, tiene más vida inicial que el resto de personajes.

  

- Electromancer: Un mago de electricidad que ataca tirando bolas de rayos, se mueve más rápido que el resto de personajes.

  

- Luminomancer: Un mago de luz que ataca tirando bolas de luz, tiene más disparos que los demás personajes y hacen más daño, además dispara más seguido.

- Movimiento: el jugador será capaz de desplazarse en ocho direcciones haciendo uso de las teclas w (arriba), a (izquierda), s(abajo) y d (derecha) y pudiendo combinarlas para crear el movimiento en diagonal. El jugador podrá moverse por todo el escenario que vea en ese nivel, pero al llegar a los límites del escenario se chocará y no podrá continuar. También habrá elementos estéticos repartidos por el mapa que no tendrán una utilidad concreta pero que no podrán ser traspasados ni por el jugador ni por los enemigos o los ataques.

- Disparos: Para apuntar el jugador utilizará el ratón, de forma que los disparos irán dirigidos hacia el punto donde se encuentre el cursor. Para disparar se utilizará el click izquierda de ratón, de forma que cada vez que se pulse se disparará una vez, aunque esto es variable en función al arma que se lleve. Cada tipo de boss contará con un punto débil distinto. En caso de que el jugador consiga golpear ese punto, hará mucho más daño de lo normal.

- Dash: el jugador tendrá la posibilidad de hacer un dash que le permitirá avanzar una pequeña distancia en la dirección en la que esté mirando, lo que le permitirá esquivar algunos ataques. Además, de vez en cuando los enemigos pueden lanzar un ataque especial que el jugador podrá utilizando el dash. Si la consigue esquivar correctamente se le recompensará. Esta recompensará potenciará el siguiente ataque que lance el jugador, que inflingirá más daño.

  

### 2.1.2 Mecánicas de los enemigos

- Movimiento: los enemigos se moverán constantemente hacia el jugador hasta llegar a la distancia mínima necesaria para dañarle. Todos los enemigos van a tener el mismo tipo de movimiento.

- Ataque: existirán algunos enemigos con ataques cuerpo a cuerpo que tendrán que acercarse a tí para poder dañarte, mientras que otros atacarán a distancia.

### 2.1.3 Lógica de escenario

- Experiencia: por cada enemigo que el jugador mate, este soltará puntos de experiencia que el jugador tendrá que coger pasando por encima para poder ir subiendo de nivel. En la parte superior de la pantalla habrá un barra de experiencia que muestre cuánto queda hasta llegar al próximo nivel.

- Subida de nivel: cada vez que el jugador consiga subir de nivel se mostrará una caja con 3 objetos aleatorios. El jugador tendrá que escoger uno de estos para mantener durante el resto de la partida. Si el objeto que sale en la caja ya lo había cogido con anterioridad el jugador, lo podrá coger otra vez para mejorar su efecto. Dentro de los objetos que se pueden conseguir al subir de nivel se incluyen tanto mejoras del arma, como consumibles y cambios en las recompensas obtenidas al realizar correctamente los dashes.

- Consumibles: en los escenarios se generarán de forma aleatoria objetos consumibles que darán al enemigo efectos temporales como un aumento de velocidad, de daño, invisibilidad, etc.

  

- Estadísticas personaje: en alguna parte de la pantalla se podrá ver en todo momento una representación de las estadísticas actuales del personaje (vida, velocidad de movimiento, velocidad de ataque, número de bolas de fuego).

  

### 2.1.4 Mecánicas de objetos

- Poción de velocidad: aumenta la velocidad del jugador un 50% durante 10 segundos.

- Poción de salud: Cura un 30% de la vida del jugador.

- Poción de invencibilidad: vuelve al jugador inmune al daño de los enemigos durante 10 segundos.

- Poción de daño: Duplica el daño del jugador durante 10 segundos.

 - Manto nuberu: incrementa un 1% la velocidad del jugador.
 
 - Piedra de San Pedro: reduce un 1% el daño recibido por el jugador.
 
 - Cuchillo Sacauntos: incrementa un 5% el daño producido por el enemigo.
 
 - Colmillo chupasangre: incrementa un 5% el robo de vida de los enemigos.

  

### 2.1.5 Mecánicas de jefes

  

- Punto débil: los jefes serán enemigos mucho más grandes que los normales y que contarán con un punto débil en el que los disparos harán muchos más daño.

- Patrones: no contarán con un patrón de movimiento, pero sí con un patrón de comportamiento, de forma que primero seguirán al jugador un periodo de tiempo, después pararán y lanzarán un ataque. Este patrón se repetirá pero variando el tipo de ataque que lance cada vez que se pare.

  

## 2.2 Dinámicas

  

- El jugador podrá aprovechar el hecho de poder moverse en una dirección mientras apunta hacia otra para poder disparar mientras está huyendo de un enemigo o poder coger los puntos de experiencia mientras dispara al siguiente enemigo entre otras cosas, todo dependiendo de la capacidad de coordinación que tenga la persona que está jugando.

- El jugador podrá utilizar el dash para esquivar ataques y poder apuntar con mayor facilidad al punto débil del enemigo y hacerle más daño con el disparo potenciado.

  

- Si el jugador es lo suficientemente hábil podrá utilizar los elementos estéticos del escenario como cubierta para evitar que le den los disparos o para despistar a algún enemigo en un momento dado.

  

# 3. Controles

  

- W: movimiento hacia arriba

- A: movimiento hacia la izquierda

- S: movimiento hacia abajo

- D: movimiento hacia la derecha

- SPACE: dash en la dirección en la que esté mirando el jugador

- Cursor: posición hacia la que saldrán los ataques que haga el jugador

- Click izquierdo ratón: ataque

  

# 4. Estética

La estética que hemos elegido para el juego es el estilo de pixel art, ya que nos parecía el más adecuado para un juego de este tipo. Además pixel art nos parecía el tipo de arte más fácil de encontrar en internet de forma gratuita y teniendo muchas posibilidades distintas.

  

## 4.1 Escenario

- Los escenarios han sido creados con Tiled utilizando el siguiente tileset: //TODO poner el tileset

  

## 4.2 Personajes

  

- Jugador: el sprite del jugador lo hemos creado desde cero y de forma que tenga animación para el desplazamiento tanto en las 4 direcciones habituales como en las diagonales. Finalmente se decidió cambiar los sprites del personaje del jugador, para así representar mejor la mecánica de elección de clase. Ahora el jugador puede ser uno de tres magos.

  

<img  src="https://raw.githubusercontent.com/castrodaniel18/DVI/master/dist/assets/sprites/player.png"  width="100"  height="200">

  

//TODO poner imagenes de los nuevos personajes

  

- Enemigos: para los enemigos hemos utilizado un generador de sprites que permite personalizar desde un sprite básico añadiendo todo tipo de elementos.

[Universal LPC Sprite Sheet Character Generator (sanderfrenken.github.io)](https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Character-Generator/#?body=Body_color_light&head=Human_male_light&sex=male&shadow=none&wound_arm=none&arms=none&armour=none&belt=none&weapon=Gnarled_staff_gnarled&weapon_magic_crystal=Crystal_red&clothes=Longsleeve_black&chainmail=none&bandages=none&jacket=Iverness_cloak_black&jacket_collar=Frock_collar_gold&legs=Pants_black&shoes=Boots_black&hat=Magic_brown)

(Ejemplo del sprite de goblin creado a partir del generador)

<img  src="https://raw.githubusercontent.com/castrodaniel18/DVI/master/dist/assets/sprites/goblin.png"  width="600"  height="800">

  

## 4.3 Objetos

  

- Bola de fuego: Obtenido de [cleanpng](https://www.cleanpng.com/png-body-jewellery-font-4261378/)

  

![Bola de fuego](https://raw.githubusercontent.com/castrodaniel18/DVI/master/dist/assets/elements/fireball.png)

- Poción de velocidad: Obtenido de [kindpng](https://www.kindpng.com/imgv/TwhwihT_potion-pixel-art-animation-hd-png-download/)

![enter image description here](https://raw.githubusercontent.com/castrodaniel18/DVI/master/dist/assets/elements/potion.png)

  

- Barra de vida: creada por nosotros

<img  src="https://raw.githubusercontent.com/castrodaniel18/DVI/master/dist/assets/elements/health.png"  width="300"  height="300">

  

## 4.4 Tipos de enemigos

 - Diañu (goblin): Este enemigo será el enemigo estandar del primer nivel. Aparecerá en gran cantidad, se moverá a velocidad normal y tendrá 50 puntos de vida. Atacará cuerpo a cuerpo y quitará 10 de vida al jugador.
 
 - Ventolín: Este enemigo aparecerá en el nivel 1. Será un enemigo que se moverá más lento pero atacará a distancia.
 - Centipede: es el boss del nivel 1. Será un enemigo mucho más grande que el resto y con patrones de ataque más impredecibles. Tendrá una gran cantidad de vida y ataque.
 - Cuelebre:  este enemigo aparece en la primera oleada del nivel 2. Son enemigos pequeños y con poca vida, pero al atacar avanzan una gran distancia para intentar morder al jugador.
 - Tarasca: es el enemigo que aparece en la segunda oleada del nivel 2. Son escorpiones que tienen bastante vida. No son muy rápido, pero lanzan ataques de veneno a distancia.
 - Urco: en otro enemigo que aparece en el nivel 2. Es una especie de perro que cuenta con una gran velocidad y ataque.

  

# 5. Niveles

Cada nivel del juego estará basado en una comunidad autónoma de España, lo primeros dos niveles serán Asturias y Galicia ya que la mitologías de estas dos regiones es la que más nos ha gustado.

Antes de empezar el juego se mostrará un mapa de España que servirá como selector de niveles. En cada Comunidad Autónoma habrá un botón para acceder a ese nivel.

Al principio todos los niveles estarán bloqueados salvo el de Galicia, de forma que hasta que no consigas superar ese nivel no podrás desbloquear otro.

Cada vez que se supere un nivel se verá reflejado en el mapa para que el jugador pueda saber en todo momento el progreso que lleva en el juego.

  

![mapa de España](https://raw.githubusercontent.com/castrodaniel18/DVI/master/public/assets/elements/spainMap.png)

  

Respecto a la lógica del juego, en principio en todos los niveles se seguirá el mismo patrón:

  

- Fase 1: oleada de enemigos normales de tipo 1.

- Fase 2: oleada de enemigos normales de tipo 2.

- Fase 3: oleada de enemigos normales de tipo 1 y 2.

- Fase 4: oleada de enemigos normales de tipo 1 y 2 y jefe final.

## 5.1 Asturias

El primer nivel estará basado en Asturias. El escenario de este nivel tendrá una temática de bosque y los enemigos que aparecerán en este nivel son el Diañu, el ventolin, y el Centipede.

## 5.2 Galicia

El segundo nivel estará basado en Galicia. El escenario de este nivel tendrá una temática de agua, con un río o el mar.
Los enemigos que aparecenrán serán el culiebre, el tarasca y el urco.
  
  

# 6. Sonido

El juego contará con una canción de fondo que se escuchará desde que cargue el juego en el menú principal.
Desde el menú de ajustes se podrá regular el volumen y silenciarla.

  

# 7. Menú

  

- Empezar juego: botón que dirige directamente a la pestaña de selección de clase para empezar la partida.

- Ajustes: pestaña con la configuración de la partida. Las opciones que contiene son:

	- Cambiar volumen juego: se contará con un barra para elegir el volumen exacto que se quiera tener en la canción de fondo.

	- Pantalla completa: pone el juego en modo pantalla completa para que no se vea la web de fondo.

	- Dificultad juego: te permite elegir la dificultad de la partida fácil, normal o difícil. La dificultad modificará la vida, daño y velocidad de movimiento de los enemigos.

- Ayuda: muestra una pestaña en la que se enseñan los controles y unas instrucciones básicas para entender el juego.

  

# 8. Referencias

  

Hemos tomado como referencia principal el juego Vampire Survivors, siguiendo el mismo estilo de juego y mecánicas básicas. Sin embargo, hemos añadido algunas mecánicas distintas basándonos en el juego Enter the Gungeon y hemos cambiado la temática siguiendo la mitología española que hemos ido recopilando de varias fuentes.