/**
 * The entry point to all our code. Having one `main` function can help you
 * more easily see what code is run in and in what order.
 */
function main() {
  // Usually, JavaScript variables are only available inside the function they
  // are declared in. But anything we attach to the `window` object will be
  // available from EVERYWHERE.
  // We will add a property called `globals` but you can call this anything
  // (e.g., window.myLovelyGlobals or window.myImportantVariables).
  window.globals = {}

  setRandomGuessWord()
  renderMask()
  createButtons()
}

// Run out main function to run all our code.
main()

/**
 * Randomly a word to be guessed.
 */
function setRandomGuessWord() {
  const words = ['apple', 'orange', 'banana', 'pear', 'cucumber', 'kiwi']

  // Get random index based on the length of the `words` array.
  const randomIndex = Math.floor(Math.random() * words.length)

  // Select element using random index. Index will be random so everytime this
  // function is executed so our word will also be random.
  const guessWord = words[randomIndex]

  // Save the guess word into our global variables so we can access it from
  // other functions.
  window.globals.guessWord = guessWord

  // Print the guess word for debugging.
  console.log({ guessWord })
}

/**
 * Render the mask based on the guess word length and how many correct guesses
 * the user has made. Call this function everytime the user makes a guess in
 * order to update it.
 */
function renderMask() {
  // Get the guess word from our global variables (set in the function
  // `setRandomGuessWord`).
  const guessWord = window.globals.guessWord

  // Get the HTML element that contains the mask.
  const maskContainer = document.querySelector('.mask-container')

  // Create a letter mask (underscore) for each letter in the guess word.
  // We use `guessWord.length` to create the correct number of masks.
  for (let index = 0; index < guessWord.length; index++) {
    const letterMask = document.createElement('span') // Create span
    letterMask.className = 'letter-mask' // We'll use this class name in CSS
    letterMask.innerText = '_' // Set content of span to underscore
    maskContainer.appendChild(letterMask) // Add mask to the mask container
  }
}

/**
 * Create buttons for each letter.
 */
function createButtons() {
  // Get the document element where the letter buttons should be added>
  const lettersContainer = document.querySelector('.letters-container')

  // Create letters array
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

  // Loop over the letters array and create button for each letter.
  letters.forEach((letter) => {
    //  Create letter button element (using document.createElement)
    const letterButton = document.createElement('button')

    // Set button text using element.innerText =
    letterButton.innerText = letter

    // Register a click listener for each button so we can handle each guess
    // using our `handleUserGuess` function.
    letterButton.addEventListener('click', function () {
      // We pass the letter that was guessed to the `handleUserGuess` function
      handleUserGuess(letter)
    })

    lettersContainer.appendChild(letterButton) // Add button to page
  })
}

/**
 * Deal with user guess.
 * The `letterGuess` argument will contain the letter that the user guessed.
 */
function handleUserGuess(letterGuessed) {
  // Get the guess word from our global variables (set in the function
  // `setRandomGuessWord`).
  const guessWord = window.globals.guessWord

  if (isCorrectGuess(letterGuessed)) {
    console.log(`CORRECT: ${letterGuessed} is included in ${guessWord}.`)
  } else {
    console.log(`WRONG: ${letterGuessed} is not included in ${guessWord}.`)
  }
}

/**
 * Check if the user correctly guessed a letter.
 * Return true if they did, otherwise return false.
 */
function isCorrectGuess(letterGuessed) {
  // Get the guess word from our global variables (set in the function
  // `setRandomGuessWord`).
  const guessWord = window.globals.guessWord

  // Check if `guessWord` includes `letterGuessed`
  return guessWord.includes(letterGuessed)
}
