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
 * Create buttons for each letter.
 */
function createButtons() {
  // Get the document element where the letter buttons should be added>
  const lettersContainer = document.querySelector('.letters-container')

  // Create letters array
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

  // Loop over the letters array and for each letter:
  // - Create letter button element (using document.createElement)
  // - Add letter button to lettersContainer (using element.appendChild)
  letters.forEach((letter) => {
    const letterButton = document.createElement('button')
    const letterButtonText = document.createTextNode(letter)
    letterButton.appendChild(letterButtonText)

    lettersContainer.appendChild(letterButton)
  })
}
