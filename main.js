/**
 * This function is the entry point to all our code. Having one `main` function
 * can help you more easily see what code is executed and in what order.
 */
function main() {
  // Usually, JavaScript variables are only available inside the function they
  // are declared in. But anything we attach to the `window` object will be
  // available from EVERYWHERE.
  // See this video: https://tinyurl.com/js-scope
  //
  // We will add some custom variables inside `window.state` but you can
  // add anything to the `window` object (e.g., window.myLovelyGlobals or
  // window.myImportantVariables).
  //
  // Just avoid adding any properties or methods that the window object
  // already has. See below link:
  // - https://developer.mozilla.org/en-US/docs/Web/API/Window#properties.

  window.state = {
    // This is the word the user has to guess.
    guessWord: getRandomGuessWord(),

    // This will contain all the letters that the user has guessed correctly.
    correctGuesses: [],

    // This will contain all the letters that the user has guessed incorrectly.
    incorrectGuesses: [],
  }

  // We'll render the app based on the initial state. Anytime we update the
  // state using `setState`, we'll re-execute the `render` function so that
  // our app always uses the latest state.
  render()
}

// Run the main function to run all our code.
main()

/**
 * We'll use this function to get a state variable from `window.state`.
 * You could also access `window.state.someVariable` directly so this is only a
 * shortcut / helper function.
 */
function getState(stateVariable) {
  if (!window.state.hasOwnProperty(stateVariable)) {
    throw new Error(`No state variable named: ${stateVariable}`)
  }

  return window.state[stateVariable]
}

/**
 * We'll use this function to set a state variable on `window.state`.
 * After updating the state, we'll call `render` in order to re-render the UI
 * and make sure our UI is using the latest state variables.
 */
function setState(stateVariable, newValue) {
  if (!window.state.hasOwnProperty(stateVariable)) {
    throw new Error(`No state variable named: ${stateVariable}`)
  }

  window.state[stateVariable] = newValue

  render()
}

/**
 * Get a word to be guessed.
 */
function getRandomGuessWord() {
  // List of possible words. You can add as many words as you like.
  const words = ['apple', 'orange', 'banana', 'pear', 'cucumber', 'kiwi']

  // Get random index based on the length of the `words` array.
  const randomIndex = Math.floor(Math.random() * words.length)

  // Select element using random index. Index will be random so every time this
  // function is executed, our word will also be random.
  const guessWord = words[randomIndex]

  // Print the guess word for debugging.
  console.log({ guessWord })

  return guessWord
}

/**
 * This function will render our application. We'll execute this everytime we
 * update a state variable (e.g., numGuessesRemaining) so that our application
 * uses our latest state variables.
 *
 * For example, when a user makes a wrong guess, we can call
 * `setState('numGuessesRemaining', 3)`. `setState` will then execute this
 * `render` function so that our application is re-rendered and now displays
 * the new `numGuessesRemaining` value of 3.
 */
function render() {
  checkIfGameFinished()

  renderGuessCount()
  renderMask()
  renderButtons()
}

function checkIfGameFinished() {
  if (getNumGuessesRemaining() <= 0) {
    renderGameOverScreen()
    return
  }

  if (hasCorrectlyGuessedAllLetters()) {
    renderGameFinishedScreen()
  }
}

function renderGameOverScreen() {
  hideGameScreen()
  showCorrectWord()
  document.querySelector('.game-over-screen').style.display = 'block'
}

function hasCorrectlyGuessedAllLetters() {
  return (
    getState('correctGuesses').length === new Set(getState('guessWord')).size
  )
}

function renderGameFinishedScreen() {
  hideGameScreen()
  showCorrectWord()
  document.querySelector('.game-finished-screen').style.display = 'block'
}

function hideGameScreen() {
  document.querySelector('.game-screen').style.display = 'none'
}

function showCorrectWord() {
  document
    .querySelectorAll('.correct-word')
    .forEach((element) => (element.innerText = getState('guessWord')))
}

/**
 * Render the mask based on the guess word length and how many correct guesses
 * the user has made. Call this function everytime the user makes a guess in
 * order to update it.
 */
function renderMask() {
  // Get the guess word from our global variables (set in the function
  // `setRandomGuessWord`).
  const guessWord = getState('guessWord')
  const correctGuesses = getState('correctGuesses')

  // Get the HTML element that contains the mask.
  const maskContainer = document.querySelector('.mask-container')
  // Clear contents because we'll dre-render it.
  maskContainer.innerHTML = ''

  // Create a letter mask (underscore) for each letter in the guess word.
  // We use `guessWord.length` to create the correct number of masks.
  for (let index = 0; index < guessWord.length; index++) {
    // Get the letter in guess word that is contained in this index position.
    const guessWordLetter = guessWord[index]

    const letterMask = document.createElement('span')
    letterMask.className = 'letter-mask'

    // If the user has correctly guesses a letter, display the letter instead
    // of a mask.
    if (correctGuesses.includes(guessWordLetter)) {
      letterMask.innerText = guessWordLetter

      // If the user hasn't guessed the letter yet, display mask.
    } else {
      letterMask.innerText = '_'
    }
    maskContainer.appendChild(letterMask) // Add mask to the mask container
  }
}

function renderGuessCount() {
  document.querySelector(
    '.guesses-remaining'
  ).innerText = `You have ${getNumGuessesRemaining()} guesses remaining.`
}

/**
 * Render buttons for each letter.
 */
function renderButtons() {
  // Get the document element where the letter buttons should be added>
  const buttonsContainer = document.querySelector('.buttons-container')
  // Clear contents because we'll re-render it
  buttonsContainer.innerHTML = ''

  // Create letters array
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

  const correctGuesses = getState('correctGuesses')
  const incorrectGuesses = getState('incorrectGuesses')

  // Loop over the letters array and create button for each letter.
  letters.forEach((letter) => {
    //  Create letter button element (using document.createElement)
    const letterButton = document.createElement('button')

    // Set button text using element.innerText =
    letterButton.innerText = letter

    // Disable the button if the user has already guessed the letter.
    if (correctGuesses.includes(letter) || incorrectGuesses.includes(letter)) {
      letterButton.disabled = true
    }

    // Register a click listener for each button so we can handle each guess
    // using our `handleUserGuess` function.
    letterButton.addEventListener('click', function () {
      // We pass the letter that was guessed to the `handleUserGuess` function
      handleUserGuess(letter)
    })

    // Add button to page
    buttonsContainer.appendChild(letterButton)
  })
}

/**
 * Deal with user guess. The `letterGuess` argument will contain the letter
 * that the user guessed.
 */
function handleUserGuess(letterGuessed) {
  if (isCorrectGuess(letterGuessed)) {
    addCorrectGuess(letterGuessed)
  } else {
    addIncorrectGuess(letterGuessed)
  }
}

/**
 * Check if the user correctly guessed a letter.
 * Return true if they did, otherwise return false.
 */
function isCorrectGuess(letterGuessed) {
  // Check if our guessWord includes `letterGuessed`
  return getState('guessWord').includes(letterGuessed)
}

function addCorrectGuess(letter) {
  console.log(`CORRECT: ${letter} is included in ${getState('guessWord')}.`)

  // Append correct guess to list of correct guesses
  const newCorrectGuesses = getState('correctGuesses').concat([letter])
  setState('correctGuesses', newCorrectGuesses)
}

function addIncorrectGuess(letter) {
  console.log(
    `INCORRECT: ${letter} is not included in ${getState('guessWord')}.`
  )

  // Append incorrect guess to list of incorrect guesses
  const newIncorrectGuesses = getState('incorrectGuesses').concat([letter])
  setState('incorrectGuesses', newIncorrectGuesses)
}

function getNumGuessesRemaining() {
  const NUM_GUESSES_ALLOWED = 5
  const guessesRemaining =
    NUM_GUESSES_ALLOWED - getState('incorrectGuesses').length

  return guessesRemaining
}
