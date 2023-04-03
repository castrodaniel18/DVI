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

### 2.1.5 Mecánicas de jefes

### **REFERENCIAS**

Hemos tomado como referencia principal el juego Vampire Survivors, siguiendo el mismo estilo de juego y mecánicas básicas. Sin embargo, hemos añadido algunas mecánicas distintas basándonos en el juego Enter the Gungeon y hemos cambiado la temática siguiendo la mitología española que hemos ido recopilando de varias fuentes.
