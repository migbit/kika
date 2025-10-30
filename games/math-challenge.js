// games/math-challenge.js
// Mini-jogo Matemática: Classificar números em Primo ou Composto
// API: export function renderMathChallenge(container, onComplete) -> { dispose() }

function isPrime(n) {
  if (n < 2) return false;
  if (n % 2 === 0) return n === 2;
  for (let d = 3; d * d <= n; d += 2) {
    if (n % d === 0) return false;
  }
  return true;
}

export function renderMathChallenge(rootContainer, onComplete) {
  const container = document.createElement('div');
  container.className = 'mini-game-container';
  container.innerHTML = `
    <div class="mini-game-card">
      <div class="mini-game-header">
        <h2 class="mini-game-title">🔢 Primo ou Composto?</h2>
        <p class="mini-game-description">Classifica corretamente 8 números para ganhar o bónus!</p>
        <div class="mini-game-stats">
          <span class="stat-item">✅ Corretas: <span id="mc-correct">0</span>/8</span>
          <span class="stat-item">❌ Erros: <span id="mc-errors">0</span>/3</span>
        </div>
      </div>

      <div class="text-center" style="margin:16px 0">
        <div style="font-size:2rem;font-weight:700" id="mc-number">--</div>
      </div>

      <div class="text-center" style="display:flex;gap:12px;justify-content:center;margin:8px 0 16px">
        <button class="btn" id="btn-prime">Primo</button>
        <button class="btn btn-secondary" id="btn-composite">Composto</button>
      </div>

      <div class="text-center" id="mc-result" style="display:none;margin-top:8px">
        <p id="mc-message" style="font-size:1rem;color:hsl(280,10%,40%)"></p>
      </div>

      <div class="text-center" id="mc-finish" style="display:none;margin-top:16px">
        <button class="btn" id="mc-finish-btn">Continuar ➜</button>
      </div>
    </div>
  `;

  rootContainer.innerHTML = '';
  rootContainer.appendChild(container);

  const numberEl = container.querySelector('#mc-number');
  const correctEl = container.querySelector('#mc-correct');
  const errorsEl = container.querySelector('#mc-errors');
  const btnPrime = container.querySelector('#btn-prime');
  const btnComposite = container.querySelector('#btn-composite');
  const resultBox = container.querySelector('#mc-result');
  const messageEl = container.querySelector('#mc-message');
  const finishBox = container.querySelector('#mc-finish');
  const finishBtn = container.querySelector('#mc-finish-btn');

  let target = 0;
  let correct = 0;
  let errors = 0;
  let finished = false;

  function nextNumber() {
    // gera números entre 2 e 199, evita trivialidades repetidas
    target = Math.floor(Math.random() * 198) + 2;
    numberEl.textContent = String(target);
  }

  function lockButtons(v) {
    btnPrime.disabled = v;
    btnComposite.disabled = v;
  }

  function handleGuess(guessIsPrime) {
    if (finished) return;
    const truth = isPrime(target);
    const ok = (guessIsPrime === truth);

    resultBox.style.display = 'block';
    if (ok) {
      correct += 1;
      correctEl.textContent = String(correct);
      messageEl.textContent = `Correto! ${target} ${truth ? 'é primo' : 'é composto'}.`;
    } else {
      errors += 1;
      errorsEl.textContent = String(errors);
      messageEl.textContent = `Ups! ${target} ${truth ? 'é primo' : 'é composto'}.`;
    }

    if (correct >= 8 || errors >= 3) {
      finished = true;
      finishBox.style.display = 'block';
      lockButtons(true);
      return;
    }

    // prepara próxima ronda
    setTimeout(() => {
      resultBox.style.display = 'none';
      nextNumber();
    }, 600);
  }

  btnPrime.addEventListener('click', () => handleGuess(true));
  btnComposite.addEventListener('click', () => handleGuess(false));
  finishBtn.addEventListener('click', () => {
    if (typeof onComplete === 'function') onComplete();
  });

  // Teclado: P (primo), C (composto)
  function onKeydown(e) {
    if (finished) return;
    const k = e.key?.toLowerCase();
    if (k === 'p') handleGuess(true);
    if (k === 'c') handleGuess(false);
  }
  window.addEventListener('keydown', onKeydown);

  // start
  nextNumber();

  function dispose() {
    window.removeEventListener('keydown', onKeydown);
  }

  return { dispose };
}

