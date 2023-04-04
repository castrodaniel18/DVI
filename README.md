# Folklore Hunters
Folklore Hunters es un videojuego desarrollado para la asignatura Desarrollo de Videojuegos mediante Tecnologías Web de la Universidad Complutense de Madrid (UCM) durante el curso 2022-23.

## Descripción del proyecto
Este videojuego está desarrollado con el framework de Phaser3 y está pensado para jugarse en un navegador web.
El juego está ambientado en la mitología española, temática que debemos seguir este curso, y cuenta con enemigos, escenarios y objetos basados en distintos mitos del folclore ibérico.
## Capturas del juego/bocetos
<image src="public/assets/web/portada.png" alt="Portada del juego">

## Enlace al juego
[Folklore Hunters](https://castrodaniel18.github.io/DVI/dist/)

# Arquitectura del juego
La arquitectura del juego se puede ver en el siguiente archivo UML

<image src="https://raw.githubusercontent.com/castrodaniel18/DVI/master//UML.vpd.png">

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

 - Elección de clase: al comienzo de la partida, el jugador tendrá que escoger qué tipo de cazador quiere ser durante esa partida, lo que hará varias sus estadísticas iniciales.
 
 - Movimiento: el jugador será capaz de desplazarse en ocho direcciones haciendo uso de las teclas w (arriba), a (izquierda), s(abajo) y d (derecha) y pudiendo combinarlas para crear el movimiento en diagonal.
 
 - Disparos: Para apuntar el jugador utilizará el ratón, de forma que los disparos irán dirigidos hacia el punto donde se encuentre el cursor. Para disparar se utilizará el click izquierda de ratón, de forma que cada vez que se pulse se disparará una vez, aunque esto es variable en función al arma que se lleve.
 
 - Dash: el jugador tendrá la posibilidad de hacer un dash que le permitirá avanzar una pequeña distancia en la dirección en la que esté mirando, lo que le permitirá esquivar algunos ataques. Además, si el jugador consigue utilizar el dash en el momento preciso para esquivar un ataque, se le recompensará con una reducción de la velocidad del enemigo que lanzó el ataque durante un breve periodo de tiempo.

### 2.1.2 Mecánicas de los enemigos
 - Movimiento: los enemigos se moverán constantemente hacia el jugador  hasta llegar a la distancia mínima necesaria para dañarle. Todos los enemigos van a tener el mismo tipo de movimiento a excepción de los jefes de nivel, que seguirán un patrón más específico.
 
 - Ataque: existirán algunos enemigos con ataques cuerpo a cuerpo que tendrán que acercarse a tí para poder dañarte, mientras que otros atacarán a distancia.
 
 - Puntos débiles: cada tipo de enemigo contará con un punto débil distinto. En caso de que el jugador consiga golpear ese punto, hará mucho más daño de lo normal. 

### 2.1.3 Mecánicas de escenario
 - Experiencia: por cada enemigo que el jugador maté, este soltará puntos de experiencia que el jugador tendrá que coger pasando por encima para poder ir subiendo de nivel.
 
 - Subida de nivel: cada vez que el jugador consiga subir de nivel se mostrará una caja con 3 objetos aleatorios. El jugador tendrá que escoger uno de estos para mantener durante el resto de la partida. Si el objeto que sale en la caja ya lo había cogido con anterioridad el jugador, lo podrá coger otra vez para mejorar su efecto.
 
 - Consumibles: en los escenarios se generarán de forma aleatoria objetos consumibles que darán al enemigo efectos temporales como un aumento de velocidad, de daño, invisibilidad, etc.
 - Escenario: el jugador podrá moverse por todo el escenario que vea en ese nivel, pero al llegar a los límites del escenario se chocará y no podrá continuar. También habrá elementos estéticos repartidos por el mapa que no tendrán una utilidad concreta pero que no podrán ser traspasados ni por el jugador ni por los enemigos o los ataques.

### 2.1.4 Mecánicas de objetos
 - Poción de velocidad: duplica la velocidad del jugador durante 10 segundos.

### 2.1.5 Mecánicas de jefes

## 2.2 Dinámicas

 - El jugador podrá aprovechar el hecho de poder moverse en una dirección mientras apunta hacia otra para poder disparar mientras está huyendo de un enemigo o poder coger los puntos de experiencia mientras dispara al siguiente enemigo entre otras cosas, todo dependiendo de la capacidad de coordinación que tenga la persona que está jugando.
 
 - El jugador podrá utilizar la recompensa obtenida al utilizar bien el dash, para tener más tiempo y poder apuntar con mayor facilidad al punto débil del enemigo.

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
La estética que hemos elegido para el juego es el estilo de pixel art, ya que nos parecía el más adecuado para un juego de este tipo.  Además pixel art nos parecía el tipo de arte más fácil de encontrar en internet de forma gratuita y teniendo muchas posibilidades distintas.

## 4.1 Escenario


## 4.2 Personajes

 - Jugador: el sprite del jugador lo hemos creado desde cero y de forma que tenga animación para el desplazamiento tanto en las 4 direcciones habituales como en las diagonales.
<img src="https://raw.githubusercontent.com/castrodaniel18/DVI/master/dist/assets/sprites/player.png"  width="100" height="200">

 - Enemigos: para los enemigos hemos utilizado un generador de sprites que permite personalizar desde un sprite básico añadiendo todo tipo de elementos.
 [Universal LPC Sprite Sheet Character Generator (sanderfrenken.github.io)](https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Character-Generator/#?body=Body_color_light&head=Human_male_light&sex=male&shadow=none&wound_arm=none&arms=none&armour=none&belt=none&weapon=Gnarled_staff_gnarled&weapon_magic_crystal=Crystal_red&clothes=Longsleeve_black&chainmail=none&bandages=none&jacket=Iverness_cloak_black&jacket_collar=Frock_collar_gold&legs=Pants_black&shoes=Boots_black&hat=Magic_brown)
 (Ejemplo del sprite de goblin creado a partir del generador)
<img src="https://raw.githubusercontent.com/castrodaniel18/DVI/master/dist/assets/sprites/goblin.png"  width="600" height="800">

## 4.3 Objetos

 - Bola de fuego: Obtenido de [cleanpng](https://www.cleanpng.com/png-body-jewellery-font-4261378/)  
 
 ![Bola de fuego](https://raw.githubusercontent.com/castrodaniel18/DVI/master/dist/assets/elements/fireball.png)
 
 - Poción de velocidad: Obtenido de [kindpng](https://www.kindpng.com/imgv/TwhwihT_potion-pixel-art-animation-hd-png-download/)
![enter image description here](https://raw.githubusercontent.com/castrodaniel18/DVI/master/dist/assets/elements/potion.png)

 - Barra de vida: creada por nosotros
<img src="https://raw.githubusercontent.com/castrodaniel18/DVI/master/dist/assets/elements/health.png"  width="300" height="300">

# 5. Niveles

## 5.1 Galicia

## 5.2 Asturias


# 6. Sonido
El juego contará con una canción de fondo que se escuchará desde que cargue el juego en el menú principal y que será posible silenciar desde la pestaña de ajustes.
Si el tiempo lo permite se añadirán efectos de sonidos para los ataques tanto del jugador como de los enemigos y un sonido que se escuchará cuando te maten para indicar que se ha acabado la partida.

# 7. Menú

 - Empezar juego: botón que dirige directamente a la pestaña de selección de clase  para empezar la partida.
 
 - Ajustes: pestaña con la configuración de la partida. Las opciones que contiene son:
	 - Silenciar juego: quita el sonido tanto de la música de fondo como de los efectos de sonido dentro del juego.
	 - Pantalla completa: pone el juego en modo pantalla completa para que no se vea la web de fondo.
	 - Dificultad juego: te permite elegir la dificultad de la partida fácil, normal o difícil.
 - Ayuda: muestra una pestaña en la que se enseñan los controles y unas instrucciones básicas para entender el juego.

# 8. Referencias

Hemos tomado como referencia principal el juego Vampire Survivors, siguiendo el mismo estilo de juego y mecánicas básicas. Sin embargo, hemos añadido algunas mecánicas distintas basándonos en el juego Enter the Gungeon y hemos cambiado la temática siguiendo la mitología española que hemos ido recopilando de varias fuentes.
