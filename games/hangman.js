// games/hangman.js
// Mini-jogo: Forca (módulo autónomo)
// API: export function renderHangman(container, onComplete) -> { dispose() }

const WORDS = [
  'PORTUGAL','ESCOLA','AMIZADE','MATEMATICA','HISTORIA','CIENCIAS','PORTO','NATUREZA',
  'GRAMATICA','DICIONARIO','EDUCACAO','PLANETA','ECOSSISTEMA','FAMILIA','ARTES','PEPITA'
];

const MAX_ERRORS = 6;

export function renderHangman(rootContainer, onComplete) {
  // cria container local do jogo
  const container = document.createElement('div');
  container.className = 'mini-game-container';
  container.innerHTML = `
    <div class="mini-game-card hangman-card">
      <div class="mini-game-header">
        <h2 class="mini-game-title">🪢 Jogo da Forca</h2>
        <p class="mini-game-description">Adivinha a palavra antes de esgotar as tentativas!</p>
        <div class="mini-game-stats">
          <span class="stat-item timer">❌ Erros: <span id="hg-errors">0</span> / ${MAX_ERRORS}</span>
        </div>
      </div>

      <div class="hangman-drawing">
        <div class="gallow">
          <div class="base"></div>
          <div class="pole"></div>
          <div class="arm"></div>
          <div class="rope"></div>
          <div class="head part hidden"></div>
          <div class="body part hidden"></div>
          <div class="arm-left part hidden"></div>
          <div class="arm-right part hidden"></div>
          <div class="leg-left part hidden"></div>
          <div class="leg-right part hidden"></div>
        </div>
      </div>

      <div class="hangman-word" id="hg-word"></div>

      <div class="letters-grid" id="hg-letters"></div>

      <div class="text-center" id="hg-result" style="display:none;margin-top:16px">
        <p id="hg-message" style="font-size:1.25rem;margin-bottom:8px;"></p>
        <button class="btn" id="hg-finish">Continuar ➜</button>
      </div>
    </div>
  `;
  rootContainer.innerHTML = '';
  rootContainer.appendChild(container);

  // estado interno
  const secret = WORDS[Math.floor(Math.random() * WORDS.length)];
  const guessed = new Set();
  let errors = 0;
  let finished = false;

  // refs
  const wordEl = container.querySelector('#hg-word');
  const lettersEl = container.querySelector('#hg-letters');
  const errorsEl = container.querySelector('#hg-errors');
  const resultBox = container.querySelector('#hg-result');
  const messageEl = container.querySelector('#hg-message');
  const finishBtn = container.querySelector('#hg-finish');

  // desenha palavra
  function renderWord() {
    wordEl.innerHTML = secret.split('').map(ch => {
      return `<span class="hg-slot">${guessed.has(ch) ? ch : '•'}</span>`;
    }).join('');
  }

  // desenha teclado
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  lettersEl.innerHTML = alphabet.map(letter =>
    `<button class="hg-key" data-k="${letter}">${letter}</button>`
  ).join('');

  function showPart(n) {
    // revela partes da forca na ordem 1..6
    const partsOrder = ['head','body','arm-left','arm-right','leg-left','leg-right'];
    const cls = partsOrder[n-1];
    if (!cls) return;
    const el = container.querySelector(`.${cls}`);
    if (el) el.classList.remove('hidden');
  }

  function checkWinLose() {
    const allGuessed = secret.split('').every(ch => guessed.has(ch));
    if (allGuessed) {
      finished = true;
      messageEl.textContent = '🎉 Parabéns! Acertaste a palavra!';
      resultBox.style.display = 'block';
      return true;
    }
    if (errors >= MAX_ERRORS) {
      finished = true;
      messageEl.textContent = `💔 Esgotaste as tentativas. A palavra era: ${secret}`;
      resultBox.style.display = 'block';
      return true;
    }
    return false;
  }

  // eventos
  lettersEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.hg-key');
    if (!btn || finished) return;
    const l = btn.getAttribute('data-k');
    btn.disabled = true;

    if (secret.includes(l)) {
      secret.split('').forEach(ch => { if (ch === l) guessed.add(ch); });
      renderWord();
      checkWinLose();
    } else {
      errors++;
      errorsEl.textContent = String(errors);
      showPart(errors);
      checkWinLose();
    }
  });

  // teclado físico
  function onKeydown(e) {
    if (finished) return;
    const l = e.key?.toUpperCase();
    if (!/^[A-Z]$/.test(l)) return;
    const btn = lettersEl.querySelector(`[data-k="${l}"]`);
    if (btn && !btn.disabled) btn.click();
  }
  window.addEventListener('keydown', onKeydown);

  finishBtn.addEventListener('click', () => {
    if (finished && typeof onComplete === 'function') onComplete();
  });

  // arranque
  renderWord();

  // controller p/ limpeza
  function dispose() {
    window.removeEventListener('keydown', onKeydown);
  }

  return { dispose };
}
