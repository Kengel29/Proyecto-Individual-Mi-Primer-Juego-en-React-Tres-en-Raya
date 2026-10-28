Tres en Raya Quisqueya 🇩🇴

## Nombre, Apellido y Matrícula: Kendri Tatis (100263465)

## Descripción del juego

Juego interactivo de Tres en Raya (3x3) desarrollado con React y Vite, ambientado con temática dominicana:

Los personajes son Taíno vs Caribe.

La interfaz utiliza los colores de la bandera dominicana.

Al terminar cada partida se muestra una frase criolla como "¡Klk, ganaste! ¡De lo mío!".

Incluye marcador de victorias/empates, botón de Reiniciar y efectos de sonido.

Persistencia de datos: el estado del juego y el marcador se guardan en el navegador utilizando localStorage.

## Cómo ejecutarlo

npm install
npm run dev


Luego abre el enlace local que aparece en la terminal (como ejemplo: http://localhost:5173).

## ¿Qué aprendí?

Aprendí a utilizar el hook useState para controlar dinámicamente el estado del tablero (un arreglo de 9 posiciones) y la alternancia de turnos entre los jugadores (X y O), manteniendo la inmutabilidad del estado en React.

## ¿Qué parte fue más difícil?

La parte más difícil fue la visualización del juego al probarlo en el navegador. Cuando intentaba visualizarlo directamente o abrir la previsualización del servidor de desarrollo, el entorno no me lo permitía directamente y me abría una pestaña adicional indicando "Open", lo que dificultaba verificar los cambios visuales en tiempo real.
