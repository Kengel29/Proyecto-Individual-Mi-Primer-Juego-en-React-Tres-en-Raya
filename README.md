# Tres en Raya Quisqueya 🇩🇴

## Nombre, Apellido y Matrícula: Kendri Tatis (100263465)

## Descripción del juego

Juego interactivo de Tres en Raya (3x3) desarrollado con React y Vite, ambientado con temática dominicana:

* Los personajes son Taíno vs Caribe.
* La interfaz utiliza los colores de la bandera dominicana.
* Al terminar cada partida se muestra una frase criolla como "¡Klk, ganaste! ¡Te la acabas de beber!".
* Incluye marcador de victorias/empates, botón de Reiniciar y efectos de sonido.
* Persistencia de datos: el estado del juego y el marcador se guardan en el navegador utilizando localStorage.

## Cómo ejecutarlo

1. `npm install`
2. `npm run dev`

Luego abre el enlace local que aparece en la terminal (ej. `http://localhost:5173/`) para probar el juego en tiempo real.

## ¿Qué aprendí?

Aprendí a utilizar el hook useState para controlar dinámicamente el estado del tablero (un arreglo de 9 posiciones) y la alternancia de turnos entre los jugadores, manteniendo la inmutabilidad del estado en React, además de integrar almacenamiento persistente con `localStorage`.

## ¿Qué parte fue más difícil?

La parte más difícil fue la configuración inicial del entorno de desarrollo local y el despliegue del proyecto en GitHub Pages. Durante el proceso, me enfrenté a retos técnicos clave como la gestión de rutas de assets en Vite (propiedad `base`), la restricción de permisos de ejecución en scripts de PowerShell, y la sincronización de ramas en Git para evitar errores de compilación y pantallas en blanco. Superar estos obstáculos me permitió comprender a fondo cómo empaquetar aplicaciones web modernas basadas en React para producción y su correcta puesta en marcha en servidores externos.
