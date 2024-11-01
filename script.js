let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let playerName = '';
let scoreHistory = []; // Array para almacenar el historial de puntajes

// Preguntas relacionadas con la termodinámica y la aeronáutica
const questions = [
    {
        question: "¿Qué es el segundo principio de la termodinámica?",
        options: [
            "La energía no se crea ni se destruye",
            "El calor no fluye espontáneamente de un cuerpo frío a uno caliente",
            "La energía interna de un sistema siempre aumenta",
            "El trabajo es independiente del calor"
        ],
        correctAnswer: "El calor no fluye espontáneamente de un cuerpo frío a uno caliente"
    },
    {
        question: "¿Cuál es la función de las alas en un avión?",
        options: [
            "Generar resistencia al aire",
            "Generar sustentación",
            "Reducir el peso",
            "Controlar la velocidad"
        ],
        correctAnswer: "Generar sustentación"
    },
    {
        question: "¿Qué es la entropía en termodinámica?",
        options: [
            "La cantidad de energía disponible para realizar trabajo",
            "La medida del desorden de un sistema",
            "La cantidad de energía calorífica en un sistema",
            "El equilibrio térmico"
        ],
        correctAnswer: "La medida del desorden de un sistema"
    },
    {
        question: "¿Qué parte del avión controla la altitud?",
        options: [
            "El timón",
            "Los alerones",
            "El elevador",
            "Las turbinas"
        ],
        correctAnswer: "El elevador"
    },
    {
        question: "¿Qué fenómeno explica que el aire sobre las alas de un avión se mueva más rápido que por debajo?",
        options: [
            "Efecto Bernoulli",
            "Efecto Venturi",
            "Fuerza de arrastre",
            "Ley de Boyle"
        ],
        correctAnswer: "Efecto Bernoulli"
    }
];

// Función para mostrar la pantalla de inicio
document.getElementById('start-btn').addEventListener('click', function() {
    playerName = document.getElementById('player-name').value;
    if (playerName) {
        document.getElementById('start-container').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        showQuestion(); // Mostrar la primera pregunta
    } else {
        alert("Por favor, ingresa tu nombre");
    }
});

// Función para mostrar una nueva pregunta
function showQuestion() {
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');

    // Limpiar respuestas anteriores
    answerButtonsElement.innerHTML = '';
    
    // Obtener la pregunta actual
    const currentQuestion = questions[currentQuestionIndex];
    
    // Mostrar la pregunta en el DOM
    questionElement.textContent = currentQuestion.question;

    // Mezclar y mostrar las opciones
    const shuffledOptions = shuffleArray([...currentQuestion.options]);
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('answer-btn');
        button.onclick = () => checkAnswer(button, option);
        answerButtonsElement.appendChild(button);
    });

    answered = false; // Se reinicia el estado para permitir la respuesta
}

// Función para mezclar las respuestas aleatoriamente
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Función para verificar si la respuesta es correcta
function checkAnswer(button, answer) {
    if (answered) return; // Prevenir respuestas múltiples

    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    
    // Verificar si la respuesta es correcta o incorrecta
    if (answer === correctAnswer) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('incorrect');
        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    document.getElementById('score').textContent = score; // Actualizar el puntaje
    disableButtons();
    answered = true;

    // Cambiar automáticamente a la siguiente pregunta después de 2 segundos
    setTimeout(nextQuestion, 200);
}

// Deshabilitar los botones después de responder
function disableButtons() {
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(button => {
        button.classList.add('disabled');
        button.disabled = true;
    });
}

// Función para pasar a la siguiente pregunta
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Mostrar la siguiente pregunta
    } else {
        showResult(); // Mostrar el resultado final
    }
}

// Función para mostrar el resultado
function showResult() {
    // Guardar el puntaje en el historial con el nombre del jugador
    scoreHistory.push({ name: playerName, score: score });

    // Mostrar el contenedor de resultados
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('result-message').textContent = `${playerName}, tu puntaje final es: ${score}`;

    // Mostrar el historial de puntajes
    document.getElementById('history-container').style.display = 'block';
    const scoreHistoryList = document.getElementById('score-history');
    scoreHistoryList.innerHTML = ''; // Limpiar la lista anterior
    scoreHistory.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Juego ${index + 1}: ${entry.name} - Puntaje: ${entry.score}`;
        scoreHistoryList.appendChild(listItem);
    });
}

// Reiniciar el test
document.getElementById('restart-btn').addEventListener('click', function() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('start-container').style.display = 'block';
    document.getElementById('player-name').value = '';
    document.getElementById('history-container').style.display = 'none'; // Ocultar el historial
});

// Mostrar la primera pregunta cuando la página se carga
window.onload = function() {
    // No hacemos nada aquí porque la pantalla de inicio se carga automáticamente
};