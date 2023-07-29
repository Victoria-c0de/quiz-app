import preguntas from "./preguntas";
import { useEffect, useState } from "react";

function App() {
  //crear 3 estados
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntacion, setPuntacion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  //estados para el temporizador de respuestas
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);

  function handleAnswerSubmit(isCorrect, e) {
    //añadir puntacion
    if (isCorrect) setPuntacion(puntacion + 1);
    //añadir estilos de preguntas
    e.target.classList.add(isCorrect ? "correct" : "incorrect");
    //cambiar a la siguiente
    setTimeout(() => {
      // Esta función se ejecutará después de un retraso de 1500 milisegundos (1.5 segundos)
      //Luego se comprueba si la variable es igual al indice de la ultima pregunta en el array 'preguntas'
      if (preguntaActual === preguntas.length - 1) {
        setIsFinished(true);
      } else {
        // Si no es la última pregunta,
        // Incrementa el valor de 'preguntaActual' en 1 para pasar a la siguiente pregunta.
        setPreguntaActual(preguntaActual + 1);
        // Restablece el valor de 'tiempoRestante' a 10.
        setTiempoRestante(10);
      }
    }, 1500);
  }


  useEffect(() => {
    //funcion que se ejecuta cada segundo
    const intervalo = setInterval(() => {

      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante === 0) setAreDisabled(true);
    }, 1000);

    //cancelar que esto se ejecute ,limpiar el intervalo.
    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  if (isFinished)
    return (
      <main className="app">
        <div className="juego-terminado">
          <span>
            {" "}
            Obtuviste {puntacion} de {preguntas.length}{" "}
          </span>
          <button onClick={() => (window.location.href = "/")}>
            {" "}
            Volver a jugar
          </button>
        </div>

      </main>
    );


  return (
    <main className="app">
      <div className="lado izquierdo">
        <div className="numero-pregunta">
          <span> Pregunta {preguntaActual + 1} de</span> {preguntas.length}
        </div>
        <div className="titulo-pregunta">
          {preguntas[preguntaActual].titulo}
        </div>
        <div>
          {!areDisabled ? (
            <span className="tiempo-restante">
              Tiempo restante: {tiempoRestante}{" "}
            </span>
          ) : (
            <button onClick={() => {
              setTiempoRestante(10);
              setAreDisabled(false);
              setPreguntaActual(preguntaActual + 1);
            }}>Continuar</button>
          )}
        </div>
      </div>
      <div className="lado-derecho">
        {/* Mapeo de opciones de respuesta */}
        {preguntas[preguntaActual].opciones.map((respuesta) => (
          <button
            disabled={areDisabled}
            key={respuesta.textoRespuesta}
            onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
          >
            {respuesta.textoRespuesta}
          </button>
        ))}
      </div>
    </main>
  );
}

export default App;
