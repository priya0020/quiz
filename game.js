const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions= []

let questions = [
    {
        question: 'MY FAVOURITE COLOR ?',
        choice1: 'RED',
        choice2: 'BLACK',
        choice3: 'YELLOW',
        choice4: 'WHITE',
        answer: 2,
    },
    {
        question: 'MY FAVOURITE SOFT TOY? ',
        choice1: 'ELEPHANT',
        choice2: 'DOG',
        choice3: 'CAT',
        choice4: 'PARROT',
        answer: 2,
    },
    {
        question: 'MY FAVOURITE JWELLERY ?',
        choice1: 'RING',
        choice2: 'ANKLET',
        choice3: 'BRACELETT',
        choice4: 'PENDENT',
        answer: 1,
    },
    {
        question: 'MY FAVOURITE RIDE ?',
        choice1: 'CAR',
        choice2: 'BUS',
        choice3: 'BIKE',
        choice4: 'CYCLE',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number ]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
    
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
           acceptingAnswers = false
            const selectedChoice = e.target
            const selectedAnswer = selectedChoice.dataset['number']

            let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
            'incorrect'

            if(classToApply === 'correct'){
                incrementScore(SCORE_POINTS)
            }

            selectedChoice.parentElement.classList.add(classToApply)

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()
            }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
