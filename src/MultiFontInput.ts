import { fonts } from './fonts'

export class MultiFontInput {
  private container: HTMLDivElement
  private inputString: string = ''

  constructor(private rootElement: HTMLElement) {
    this.container = document.createElement('div')
    this.container.className = 'flex flex-wrap justify-center gap-2 mb-6'
    this.rootElement.appendChild(this.container)
    this.render()
  }

  private createLetterInput(value: string, font: string, index: number, disabled: boolean = false): HTMLInputElement {
    const input = document.createElement('input')
    input.type = 'text'
    input.value = value
    input.maxLength = 1
    input.className = `w-12 h-12 text-center text-2xl border-2 rounded focus:outline-none ${
      disabled
        ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
        : 'border-gray-300 focus:border-blue-500'
    }`
    input.style.fontFamily = font
    input.dataset.index = index.toString()
    input.disabled = disabled

    if (!disabled) {
      input.addEventListener('input', (e) => this.handleInput(e, index))
      input.addEventListener('keydown', (e) => this.handleKeyDown(e, index))
    }

    return input
  }

  private handleInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement
    const value = input.value.slice(-1)
    const newInputString = this.inputString.split('')
    newInputString[index] = value
    this.inputString = newInputString.join('')
    this.render()
    this.focusNextInput(index)
  }

  private handleKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement
    if (event.key === 'Backspace' && input.value === '') {
      event.preventDefault()
      this.removeCharacter(index)
      this.focusPreviousInput(index)
    }
  }

  private removeCharacter(index: number) {
    if (index > 0) {
      const newInputString = this.inputString.split('')
      newInputString.splice(index - 1, 1)
      this.inputString = newInputString.join('')
      this.render()
    }
  }

  private focusNextInput(index: number) {
    const nextInput = this.rootElement.querySelector(`input[data-index="${index + 1}"]:not(:disabled)`) as HTMLInputElement
    if (nextInput) {
      nextInput.focus()
    }
  }

  private focusPreviousInput(index: number) {
    if (index > 0) {
      const prevInput = this.rootElement.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement
      if (prevInput) {
        prevInput.focus()
        // Move cursor to the end of the input
        const len = prevInput.value.length
        prevInput.setSelectionRange(len, len)
      }
    }
  }

  private render() {
    this.container.innerHTML = ''
    const letters = this.inputString.split('')

    letters.forEach((letter, index) => {
      const input = this.createLetterInput(letter, fonts[index % fonts.length], index)
      this.container.appendChild(input)
    })

    // Add empty input for new letter
    const emptyInput = this.createLetterInput('', fonts[letters.length % fonts.length], letters.length)
    this.container.appendChild(emptyInput)

    // Add disabled next input
    const disabledInput = this.createLetterInput('', fonts[(letters.length + 1) % fonts.length], letters.length + 1, true)
    this.container.appendChild(disabledInput)

    // Update input string display
    const inputStringDisplay = this.rootElement.querySelector('.input-string-display') as HTMLSpanElement
    if (inputStringDisplay) {
      inputStringDisplay.textContent = this.inputString
    }

    // Focus the last non-empty input
    const lastNonEmptyIndex = Math.max(0, this.inputString.length - 1)
    const lastNonEmptyInput = this.rootElement.querySelector(`input[data-index="${lastNonEmptyIndex}"]`) as HTMLInputElement
    if (lastNonEmptyInput) {
      lastNonEmptyInput.focus()
      const len = lastNonEmptyInput.value.length
      lastNonEmptyInput.setSelectionRange(len, len)
    }
  }
}