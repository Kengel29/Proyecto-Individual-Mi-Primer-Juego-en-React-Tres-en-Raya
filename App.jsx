import { useState, useEffect } from 'react';

// Jugadores con toque dominicano
const JUGADORES = {
  X: { nombre: 'Taíno', icono: '' },
  O: { nombre: 'Caribe', icono: '' },
};

// Las 8 formas de ganar
const LINEAS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
  [0, 4, 8], [2, 4, 6],            // diagonales
];

const FRASES_GANAR = [
  '¡Klk,te la ganaste!',
];
const FRASES_PERDER = [
' ¡Usted se la caba de beber!'
  ]

const FRASES_EMPATE = [
  '¡Empate! Nadie dio el brazo a torcer ',
  '¡Quedaron empatao’ como en el noveno inning! ',
];

function calcularGanador(casillas) {
  for (const [a, b, c] of LINEAS) {
    if (casillas[a] && casillas[a] === casillas[b] && casillas[a] === casillas[c]) {
      return { ganador: casillas[a], linea: [a, b, c] };
    }
  }
  return null;
}

function pitido(frecuencia) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = frecuencia;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    // si el navegador no soporta audio, el juego debe seguir funcionando
  }
}

function cargarGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem('tres-en-raya-rd'));
    if (guardado && Array.isArray(guardado.casillas)) return guardado;
  } catch (e) {}
  return { casillas: Array(9).fill(null), turnoX: true, puntos: { X: 0, O: 0, empates: 0 } };
}

export default function App() {
  const inicial = cargarGuardado();
  const [casillas, setCasillas] = useState(inicial.casillas);
  const [turnoX, setTurnoX] = useState(inicial.turnoX);
  const [puntos, setPuntos] = useState(inicial.puntos);
  const [mensaje, setMensaje] = useState('');

  const resultado = calcularGanador(casillas);
  const empate = !resultado && casillas.every((c) => c !== null);
  const jugadorActual = turnoX ? 'X' : 'O';

  // Guardar el juego en el navegador cada vez que algo cambia
  useEffect(() => {
    localStorage.setItem('tres-en-raya-rd', JSON.stringify({ casillas, turnoX, puntos }));
  }, [casillas, turnoX, puntos]);

  // Cuando termina la partida: sumar punto y mostrar mensaje dominicano
  useEffect(() => {
    if (resultado) {
      setPuntos((p) => ({ ...p, [resultado.ganador]: p[resultado.ganador] + 1 }));
      setMensaje(FRASES_GANAR[Math.floor(Math.random() * FRASES_GANAR.length)]);
      [523, 659, 784].forEach((f, i) => setTimeout(() => pitido(f), i * 120));
    } else if (empate) {
      setPuntos((p) => ({ ...p, empates: p.empates + 1 }));
      setMensaje(FRASES_EMPATE[Math.floor(Math.random() * FRASES_EMPATE.length)]);
      pitido(200);
    }
  }, [resultado?.ganador, empate]);

  function jugar(i) {
    if (casillas[i] || resultado || empate) return;
    const nuevas = [...casillas];
    nuevas[i] = jugadorActual;
    setCasillas(nuevas);
    setTurnoX(!turnoX);
    pitido(turnoX ? 440 : 330);
  }

  function reiniciar() {
    setCasillas(Array(9).fill(null));
    setTurnoX(true);
    setMensaje('');
  }

  function borrarMarcador() {
    setPuntos({ X: 0, O: 0, empates: 0 });
    reiniciar();
  }

  const terminado = resultado || empate;

  return (
    <main className="pagina">
      <h1>🇩🇴 Tres en Raya Quisqueya</h1>
      <p className="subtitulo">Taíno vs Caribe</p>

      <section className="marcador">
        <div className="punto azul">{JUGADORES.X.icono} {JUGADORES.X.nombre}<strong>{puntos.X}</strong></div>
        <div className="punto gris">Empates<strong>{puntos.empates}</strong></div>
        <div className="punto rojo">{JUGADORES.O.icono} {JUGADORES.O.nombre}<strong>{puntos.O}</strong></div>
      </section>

      <p className="estado">
        {terminado
          ? resultado
            ? `Ganó ${JUGADORES[resultado.ganador].nombre} ${JUGADORES[resultado.ganador].icono}`
            : 'Empate'
          : `Turno de ${JUGADORES[jugadorActual].nombre} ${JUGADORES[jugadorActual].icono}`}
      </p>

      <div className="tablero">
        {casillas.map((valor, i) => (
          <button
            key={i}
            className={`casilla ${valor === 'X' ? 'azul' : 'rojo'} ${
              resultado && resultado.linea.includes(i) ? 'ganadora' : ''
            }`}
            onClick={() => jugar(i)}
            aria-label={`Casilla ${i + 1}`}
          >
            {valor}
          </button>
        ))}
      </div>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <div className="botones">
        <button className="btn" onClick={reiniciar}>Reiniciar</button>
        <button className="btn secundario" onClick={borrarMarcador}>Borrar marcador</button>
      </div>
    </main>
  );
}
