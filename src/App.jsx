import preguntas from "./preguntas";
import { useState, useEffect } from "react";

function App() {
  const [preguntaActual, setPreguntaActual] = useState(0);// Estado para la pregunta actual
  const [puntuación, setPuntuación] = useState(0);// Estado para almacenar la puntuación
  const [isFinished, setIsFinished] = useState(false);// Estado para saber si el cuestionario ha terminado
  const [tiempoRestante, setTiempoRestante] = useState(10);// Estado para el temporizador de respuestas
  const [areDisabled, setAreDisabled] = useState(false); // Estado para deshabilitar los botones de respuesta cuando el tiempo se agota
  const [answersShown, setAnswersShown] = useState(false); // Estado para mostrar las respuestas al final del cuestionario

  // Función que maneja la selección de una respuesta
  function handleAnswerSubmit(isCorrect, e) {
    // añadir puntuación
    if (isCorrect) setPuntuación(puntuación + 1);
    // añadir estilos de pregunta
    e.target.classList.add(isCorrect ? "correct" : "incorrect");
    // Cambiar a la siguiente pregunta después de 1.5 segundos

    setTimeout(() => {
      if (preguntaActual === preguntas.length - 1) {
        setIsFinished(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
        setTiempoRestante(10);
      }
    }, 1500);
  }
  // Efecto que se ejecuta cuando cambia el estado tiempoRestante
  // Función que se ejecuta cada segundo para el temporizador
  useEffect(() => {
    const intervalo = setInterval(() => {  // Reducir el tiempo restante en 1 segundo
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante === 0) setAreDisabled(true); // Si el tiempo se agota, deshabilitar los botones de respuesta
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonta o el tiempoRestante cambia
    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  // Si el cuestionario ha terminado, mostrar el mensaje de juego terminado con la puntuación obtenida y dos botones para volver a jugar o ver las respuestas
  if (isFinished)
    return (
      <main className="app">
        <div className="juego-terminado">
          <span>
            {" "}
            Obtuviste {puntuación} de {preguntas.length}{" "}
          </span>
          <button onClick={() => (window.location.href = "/")}>
            {" "}
            Volver a jugar
          </button>
          <button
            onClick={() => {
              setIsFinished(false);
              setAnswersShown(true);
              setPreguntaActual(0);
            }}
          >
            Ver respuestas
          </button>
        </div>
      </main>
    );

  // Si se están mostrando las respuestas, mostrar la pregunta actual y la respuesta correcta junto con un botón para avanzar a la siguiente pregunta o volver a jugar  
  if (answersShown)
    return (
      <main className="app">
        <div className="lado-izquierdo">
          <div className="numero-pregunta">
            <span> Pregunta {preguntaActual + 1} de</span> {preguntas.length}
          </div>
          <div className="titulo-pregunta">
            {preguntas[preguntaActual].titulo}
          </div>
          <div>
            {
              preguntas[preguntaActual].opciones.filter(
                (opcion) => opcion.isCorrect
              )[0].textoRespuesta
            }
          </div>
          <button
            onClick={() => {
              if (preguntaActual === preguntas.length - 1) {
                window.location.href = "/";
              } else {  // Si no es la última pregunta, avanzar a la siguiente
                setPreguntaActual(preguntaActual + 1);
              }
            }}
          >
            {preguntaActual === preguntas.length - 1
              ? "Volver a jugar"
              : "Siguiente"}
          </button>
        </div>
      </main>
    );

  // Si el cuestionario aún no ha terminado y no se están mostrando las respuestas, mostrar la pregunta actual con las opciones de respuesta disponibles  
  return (
    <main className="app">
      <div className="lado-izquierdo">
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
            <button
              onClick={() => {
                setTiempoRestante(10);
                setAreDisabled(false);
                if (preguntaActual === preguntas.length - 1) {
                  setIsFinished(true);
                } else {
                  setPreguntaActual(preguntaActual + 1);
                }
              }}
            >
              Continuar
            </button>
          )}
        </div>
      </div>
      <div className="lado-derecho">
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