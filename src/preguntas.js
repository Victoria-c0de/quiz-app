// Definimos la lista de preguntas,con sus objetos y sus opciones
const preguntas = [
    {
      titulo: "¿Cuál es el mejor lenguaje de programación?",
      opciones: [
        { textoRespuesta: "JavaScript", isCorrect: true },
        { textoRespuesta: "Python", isCorrect: false },
        { textoRespuesta: "Java", isCorrect: false },
        { textoRespuesta: "C++", isCorrect: false },
      ],
    },
    {
      titulo: "¿Cuál de los siguientes es un lenguaje de marcado?",
      opciones: [
        { textoRespuesta: "HTML", isCorrect: true },
        { textoRespuesta: "CSS", isCorrect: false },
        { textoRespuesta: "React", isCorrect: false },
        { textoRespuesta: "Angular", isCorrect: false },
      ],
    },
    {
        titulo: "¿Cuál es el protocolo utilizado para transferir datos en la web?",
        opciones: [
          { textoRespuesta: "HTTP", isCorrect: true },
          { textoRespuesta: "FTP", isCorrect: false },
          { textoRespuesta: "SSH", isCorrect: false },
          { textoRespuesta: "SMTP", isCorrect: false },
        ],
      },
    {
      titulo: "¿En qué año se lanzó React?",
      opciones: [
        { textoRespuesta: "2013", isCorrect: false },
        { textoRespuesta: "2015", isCorrect: true },
        { textoRespuesta: "2017", isCorrect: false },
        { textoRespuesta: "2019", isCorrect: false },
      ],
    },
  ];
  
export default preguntas;