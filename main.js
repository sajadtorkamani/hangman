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
  // Every time we render the app, we'll want to check if the user has run out
  // of guesses or has correctly guessed all the letters. See implementation of
  // `checkIfGameFinished` for what we do when game is finished.
  checkIfGameFinished()

  renderNumGuessesRemaining()
  renderMask()
  renderButtons()
}

/**
 * Check if the user has run out of guesses or if they've correctly guessed
 * all the letters. If so, update the UI to let the user know.
 */
function checkIfGameFinished() {
  if (getNumGuessesRemaining() <= 0) {
    renderGameLostScreen()
    return
  }

  if (hasCorrectlyGuessedAllLetters()) {
    renderGameWonScreen()
  }
}

/**
 * Let the user know they've lost the game.
 */
function renderGameLostScreen() {
  hideGameScreen()
  showGuessWord()

  // Show the game lost screen
  document.querySelector('.game-lost-screen').style.display = 'block'
}

/**
 * Check if user has correctly guessed all letters.
 */
function hasCorrectlyGuessedAllLetters() {
  const numUniqueLettersGuessedCorrectly = getState('correctGuesses').length
  const numUniqueLettersInGuessWord = new Set(getState('guessWord')).size

  return numUniqueLettersGuessedCorrectly === numUniqueLettersInGuessWord
}

/**
 * Let the user know they've won the game.
 */
function renderGameWonScreen() {
  hideGameScreen()
  showGuessWord()

  // Show the game won screen
  document.querySelector('.game-won-screen').style.display = 'block'
}

/**
 * Hide the default game screen (i.e. the mask, letter buttons, etc).
 */
function hideGameScreen() {
  document.querySelector('.game-screen').style.display = 'none'
}

/**
 * Show the guess word. We show this when the game has finished.
 */
function showGuessWord() {
  // We use `document.querySelectorAll` instead of `document.querySelector` in
  // order to target ALL the elements with the class `correct-word`.
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
  // Clear contents because we'll rebuild the contents.
  maskContainer.innerHTML = ''

  // Create a letter mask (underscore) for each letter in the guess word.
  // We use `guessWord.length` to create the correct number of letter masks.
  for (let letterIndex = 0; letterIndex < guessWord.length; letterIndex++) {
    // Get the letter in the guess word that's contained in this index position.
    const guessWordLetter = guessWord[letterIndex]

    const letterMask = document.createElement('span')

    // We'll add a class so we can style in CSS.
    letterMask.className = 'letter-mask'

    // If the user has correctly guessed the letter, display the letter instead
    // of a mask. `correctGuesses` is an array of all the letters the user has
    // correctly guessed.
    if (correctGuesses.includes(guessWordLetter)) {
      letterMask.innerText = guessWordLetter
    }
    // If the user hasn't guessed the letter yet, display a mask instead of
    // the letter.
    else {
      letterMask.innerText = '_'
    }
    // Add letter mask to the mask container.
    maskContainer.appendChild(letterMask)
  }
}

/**
 * Render number of guesses remaining. We call this function inside `render`.
 * Everytime the user makes a guess, we call `setState` which calls `render`
 * which then calls this function. This means everytime the user makes a guess,
 * we update the part of the UI that shows the number of guesses remaining.
 */
function renderNumGuessesRemaining() {
  document.querySelector(
    '.guesses-remaining'
  ).innerText = `You have ${getNumGuessesRemaining()} guesses remaining.`
}

/**
 */
/**
 * Render buttons for each letter. We call this function inside `render`.
 * Everytime the user makes a guess, we call `setState` which calls `render`
 * which then calls this function. This means everytime the user makes a guess,
 * we will call this function again in order to rebuild the buttons and make
 * sure the letter that the user just guessed is disabled.
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
 * that the user guessed. We call this function whenever the user clicks a
 * a letter button.
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
  // Check if our guess word includes the letter guessed.
  return getState('guessWord').includes(letterGuessed)
}

/**
 * Add `letter` to the list of correct guesses. We'll use this list elsewhere
 * (e.g., to disable letters that the user has already guessed).
 */
function addCorrectGuess(letter) {
  console.log(`CORRECT: ${letter} is included in ${getState('guessWord')}.`)

  // Append correct guess to list of correct guesses
  const newCorrectGuesses = getState('correctGuesses').concat([letter])
  setState('correctGuesses', newCorrectGuesses)
}

/**
 * Add `letter` to the list of incorrect guesses. We'll use this list elsewhere
 * (e.g., to disable letters that the user has already guessed).
 */
function addIncorrectGuess(letter) {
  console.log(
    `INCORRECT: ${letter} is not included in ${getState('guessWord')}.`
  )

  // Append incorrect guess to list of incorrect guesses
  const newIncorrectGuesses = getState('incorrectGuesses').concat([letter])
  setState('incorrectGuesses', newIncorrectGuesses)
}

/**
 * Calculate number of guesses remaining.
 */
function getNumGuessesRemaining() {
  const NUM_GUESSES_ALLOWED = 5
  const numIncorrectGuesses = getState('incorrectGuesses').length

  return NUM_GUESSES_ALLOWED - numIncorrectGuesses
}
