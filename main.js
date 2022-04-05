function createButtons() {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

  const lettersContainer = document.querySelector('.letters-container')

  letters.forEach((letter) => {
    const letterButton = document.createElement('button')
    const letterButtonText = document.createTextNode(letter)
    letterButton.appendChild(letterButtonText)

    lettersContainer.appendChild(letterButton)
  })
}

function main() {
  createButtons()
}

main()
