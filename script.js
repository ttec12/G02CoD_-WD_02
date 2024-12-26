const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which of the following is a popular front-end framework for building user interface?',
    answers: [
      { text: 'React', correct: true },
      { text: 'Angular', correct: false },
      { text: 'Vue.js', correct: false },
      { text: 'Ember.js', correct: false }
    ]
  },
  {
    question: 'Which of the following is a server-side scripting language?',
    answers: [
      { text: 'PHP', correct: true },
      { text: 'Javascript', correct: false },
      { text: 'CSS', correct: false },
      { text: 'HTML', correct: false }
    ]
  },
  {
    question: 'Which of the following is a type of database used in web development?',
    answers: [
      { text: 'Relational database', correct: false },
      { text: 'NoSQL database', correct: false },
      { text: 'Graph database', correct: false },
      { text: 'All of the above', correct: true }
    ]
  },
  {
    question: 'What is the term for the process of breaking down a complex problem ino smaller, more manageable parts?',
    answers: [
      { text: 'Debugging', correct: false },
      { text: 'Refactoring', correct: false },
      { text: 'Modularizaton', correct: false },
      { text: 'Decomposition', correct: true }
    ]
  },
  {
    question: 'What does HTML stnd for?',
    answers: [
      { text: 'Hyertext Markup Language', correct: true },
      { text: 'Hyperlink Markup Language', correct: false },
      { text: 'Hypertext Markup Link', correct: false },
      { text: 'Hyperlink Text Language', correct: false }
    ]
  },
]