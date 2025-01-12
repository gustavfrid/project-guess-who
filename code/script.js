// All the DOM selectors stored as short variables
const board = document.getElementById('board')
const questions = document.getElementById('questions')
const restartButton = document.getElementById('restart')
const filterButton = document.getElementById('filter')
const winOrLose = document.getElementById('winOrLose')
const winOrLoseText = document.getElementById('winOrLoseText')
const playAgainButton = document.getElementById('playAgain')
const cheatCode = document.getElementById('cheatCode')
const cheatFooter = document.getElementById('cheatFooter')
const guessCounterText = document.getElementById('guessCounterText')
const gameTimer = document.getElementById('guessCounterTimer')
const guessList = document.getElementById('guessList')
const questionSection = document.getElementById('questionSection')

// Array with all the characters, as objects
const CHARACTERS = [
  {
    name: 'Jabala',
    img: 'images/jabala.svg',
    hair: 'hidden',
    eyes: 'hidden',
    accessories: ['sun glasses', 'a hat'],
    other: [],
  },
  {
    name: 'Jack',
    img: 'images/jack.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['a hat'],
    other: ['a beard', 'a parrot'],
  },
  {
    name: 'Jacques',
    img: 'images/jacques.svg',
    hair: 'grey',
    eyes: 'blue',
    accessories: ['a hat'],
    other: ['a smoking pipe'],
  },
  {
    name: 'Jai',
    img: 'images/jai.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: [],
    other: [],
  },
  {
    name: 'Jake',
    img: 'images/jake.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: ['glasses'],
    other: [],
  },
  {
    name: 'James',
    img: 'images/james.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['sun glasses'],
    other: [],
  },
  {
    name: 'Jana',
    img: 'images/jana.svg',
    hair: 'black',
    eyes: 'hidden',
    accessories: ['sun glasses'],
    other: [],
  },
  {
    name: 'Jane',
    img: 'images/jane.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: [],
  },
  {
    name: 'Jaqueline',
    img: 'images/jaqueline.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses', 'a necklace'],
    other: [],
  },

  {
    name: 'Jazebelle',
    img: 'images/jazebelle.svg',
    hair: 'purple',
    eyes: 'hidden',
    accessories: ['sun glasses'],
    other: ['a cigarette'],
  },
  {
    name: 'Jean',
    img: 'images/jean.svg',
    hair: 'brown',
    eyes: 'blue',
    accessories: ['glasses', 'a hat'],
    other: ['a cigarette'],
  },
  {
    name: 'Jeane',
    img: 'images/jeane.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: [],
  },
  {
    name: 'Jed',
    img: 'images/jed.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses', 'a hat'],
    other: ['a cigarette', 'a beard'],
  },
  {
    name: 'Jenni',
    img: 'images/jenni.svg',
    hair: 'white',
    eyes: 'hidden',
    accessories: ['a hat'],
    other: ['a phone'],
  },
  {
    name: 'Jeri',
    img: 'images/jeri.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses'],
    other: [],
  },
  {
    name: 'Jerry',
    img: 'images/jerry.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['a hat'],
    other: [],
  },
  {
    name: 'Jess',
    img: 'images/jess.svg',
    hair: 'black',
    eyes: 'blue',
    accessories: ['glasses'],
    other: [],
  },
  {
    name: 'Jocelyn',
    img: 'images/jocelyn.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses'],
    other: [],
  },
  {
    name: 'Jon',
    img: 'images/jon.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: [],
  },
  {
    name: 'Jordan',
    img: 'images/jordan.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['sun glasses', 'a hat', 'a necklace'],
    other: [],
  },
  {
    name: 'Josephine',
    img: 'images/josephine.svg',
    hair: 'grey',
    eyes: 'brown',
    accessories: [],
    other: [],
  },
  {
    name: 'Josh',
    img: 'images/josh.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: [],
    other: [],
  },
  {
    name: 'Jude',
    img: 'images/jude.svg',
    hair: 'black',
    eyes: 'green',
    accessories: [],
    other: [],
  },
  {
    name: 'Julie',
    img: 'images/julie.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses', 'a hat'],
    other: [],
  },
]

// Global variables
let secret
let currentQuestion
let charactersInPlay
let guessCounter = 0
let optionGroups = ''
let cheating = false
let askedQuestions = []
let startTime
let elapsedTime
const categories = {
  hair: { value: [], type: '' },
  eyes: { value: [], type: '' },
  accessories: { value: [], type: '' },
  other: { value: [], type: '' },
}

// Draw the game board
const generateBoard = () => {
  board.innerHTML = ''
  charactersInPlay.forEach(person => {
    board.innerHTML += /*html*/ `
      <div class="card" ${
        person.name === secret.name && cheating ? 'style="border: 3px solid red"' : ''
      }>
        <p>${person.name}</p>
        <img src=${person.img} alt=${person.name}>
        <div class="guess">
          <span>Guess on ${person.name}?</span>
          <button class="filled-button small" onclick="guess('${person.name}')">Guess</button>
        </div>
      </div>
    `
  })
}

const arraysHasSameData = (arr1, arr2) => {
  return arr1.some(item => arr2.includes(item))
}

const generateCategories = () => {
  CHARACTERS.forEach(person => {
    // for each person in the array of characters do:
    for (const category in person) {
      // for each category in each person img, eyes. hair etc.. do:
      if (category !== 'img' && category !== 'name') {
        // if category is not equal to img and name do:
        if (Array.isArray(person[category])) {
          // check if values already exists in the category
          person[category].forEach(attribute => {
            if (!categories[category].value.includes(attribute)) {
              // if the category is an array spread the values of the array
              // and push them in to the appropriate array in the categories object
              categories[category].value.push(attribute)
              categories[category].type = 'array'
            }
          })
        } else {
          // if the category is not an array push them in to the appropriate array in the categories object
          // check if values already exists in the category
          if (!categories[category].value.includes(person[category])) {
            categories[category].value.push(person[category])
            categories[category].type = 'string'
          }
        }
      }
    }
  })
}

// Populate the select options dynamically from the CHARACTERS array
const generateQuestions = () => {
  optionGroups = ''
  // loop through all keys in categories object
  for (const category in categories) {
    let categoryValues = categories[category].value
    // removes previous asked questions from options
    if (arraysHasSameData(categoryValues, askedQuestions)) {
      categoryValues.splice(categoryValues.indexOf(currentQuestion.value), 1)
    }
    // sort values alphabetically
    categoryValues.sort()
    // build the select element options as html tags
    optionGroups += /*html*/ `<optgroup label='${category}' id='${category}'>`
    categoryValues.forEach(option => {
      optionGroups += /*html*/ `<option value='${option}'>${option} ${
        categories[category].type === 'array' ? '' : category
      }</option>`
    })
    optionGroups += /*html*/ `</optgroup>`
  }
  questions.innerHTML = ''
  questions.innerHTML += optionGroups
}

// Randomly select a person from the characters array and set as the value of the variable called secret
const setSecret = () => {
  secret = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)] //
  console.log(`The secret person is ${secret.name}`, secret)
}

// This function to start (and restart) the game
const start = () => {
  // Here we're setting charactersInPlay array to be all the characters to start with
  charactersInPlay = CHARACTERS
  // What else should happen when we start the game?
  cheating = false
  askedQuestions = []
  guessCounter = 0
  board.style.display = 'flex'
  questionSection.style.display = 'flex'
  cheatFooter.style.display = 'flex'
  winOrLose.style.display = 'none'
  winOrLoseText.innerText = ''
  cheatFooter.style.display = 'flex'
  guessList.innerHTML = ''
  setSecret()
  generateBoard()
  generateCategories()
  generateQuestions()
  startTimer()
  guessCounterHandler()
  questions.focus()
}

const startTimer = () => {
  startTime = Date.now()
  setInterval(() => {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000)
    gameTimer.innerHTML = `Time played: ${elapsedTime} s`
  }, 1000)
}

const guessCounterHandler = () => {
  guessCounterText.innerText = `Guess counter: ${guessCounter}`
}

const populateGuessList = () => {
  guessList.innerHTML += /*html*/ `<li>${currentQuestion.value} ${currentQuestion.category}</li>`
}

// setting the currentQuestion object when you select something in the dropdown
const selectQuestion = (guess, name) => {
  // askedQuestions;
  let category = ''
  let value = ''
  if (guess) {
    category = 'name'
    value = name
  } else {
    category = questions.options[questions.selectedIndex].parentNode.label
    value = questions.value
  }
  currentQuestion = {
    category: category,
    value: value,
  }
  if (currentQuestion.value !== '') {
    guessCounter++
    guessCounterHandler()
    populateGuessList()
  }
}

// This function should be invoked when you click on 'Find Out' button.
const checkQuestion = () => {
  const { category, value } = currentQuestion
  if (secret[category].includes(value)) {
    filterCharacters(true)
  } else {
    filterCharacters(false)
  }
  askedQuestions.push(value)
  generateQuestions()
}

// It'll filter the characters array and redraw the game board.
const filterCharacters = keep => {
  const { category, value } = currentQuestion
  if (category !== 'name') {
    const categoryText = categories[category].type === 'array' ? '' : ` ${category}`
    if (keep) {
      alert(
        `Yes, the person has ${value}${categoryText}! Keep all people that has ${value}${categoryText}`
      )
      charactersInPlay = charactersInPlay.filter(person => person[category].includes(value))
    } else {
      alert(
        `No, the person doesn't have ${value}${categoryText}! Remove all people that have ${value}${categoryText}`
      )
      charactersInPlay = charactersInPlay.filter(person => !person[category].includes(value))
    }
  } else {
    if (keep) {
      charactersInPlay = charactersInPlay.filter(person => person[category].includes(value))
    } else {
      charactersInPlay = charactersInPlay.filter(person => !person[category].includes(value))
    }
  }

  // Invoke function to redraw the board with the remaining people.
  generateBoard()
}

// when clicking guess, the player first have to confirm that they want to make a guess.
const guess = personToConfirm => {
  const confirmGuess = confirm(`Are you sure you want to guess on ${personToConfirm}`)
  if (confirmGuess) {
    selectQuestion(true, personToConfirm)
    checkMyGuess(personToConfirm)
  } else {
    alert(`Ok, try again later`)
  }
}

// If you confirm, this function is invoked
const checkMyGuess = personToCheck => {
  if (personToCheck === secret.name) {
    // alert(`Yay! You guessed right, ${personToCheck} is the secret person`);
    filterCharacters(true)
    board.style.display = 'none'
    winOrLose.style.display = 'flex'
    questionSection.style.display = 'none'
    cheatFooter.style.display = 'none'
    winOrLoseText.innerText = `Yay! You guessed right, ${personToCheck} is the secret person!${
      cheating ? ` However the victory is not that sweet when you cheat 😎` : ''
    } You guessed it in in ${elapsedTime}s and ${guessCounter} guesses!`
  } else {
    alert(`Darn! ${personToCheck} is not secret person`)
    filterCharacters(false)
  }
}

// Invokes the start function when website is loaded
start()

// All the event listeners
restartButton.addEventListener('click', start)
// questions.addEventListener('change', selectQuestion);
filterButton.addEventListener('click', () => {
  selectQuestion()
  checkQuestion()
})
playAgainButton.addEventListener('click', () => {
  start()
})
cheatCode.addEventListener('change', () => {
  cheating = true
  cheatFooter.style.display = 'none'
  generateBoard()
})
