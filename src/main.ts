import './style.css'
import { MultiFontInput } from './MultiFontInput'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app')!
  app.innerHTML = `
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 class="text-3xl font-bold mb-6">Multi-Font Letter Input</h1>
      <div id="input-container"></div>
      <p class="text-lg">
        Input: <span class="font-semibold input-string-display"></span>
      </p>
    </div>
  `

  new MultiFontInput(document.getElementById('input-container')!)
})