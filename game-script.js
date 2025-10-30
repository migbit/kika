// ===================== CONFIG BÁSICA =====================
const SUBJECTS = [
  { id: 'historia-geografia', name: 'História e Geografia de Portugal', icon: '🏰', gradient: 'gradient-purple' },
  { id: 'ciencias',            name: 'Ciências da Terra e Natureza',     icon: '🌍', gradient: 'gradient-green' },
  { id: 'portugues',           name: 'Português',                         icon: '📚', gradient: 'gradient-blue' },
  { id: 'ingles',              name: 'Inglês',                            icon: '🇬🇧', gradient: 'gradient-red' },
  { id: 'matematica',          name: 'Matemática',                        icon: '🔢', gradient: 'gradient-orange' },
  { id: 'cidadania',           name: 'Cidadania',                         icon: '🤝', gradient: 'gradient-pink' },
  { id: 'educacao-visual',     name: 'Educação Visual',                   icon: '🎨', gradient: 'gradient-yellow' }
];

const BADGES = [
  { id: 'first-correct',     name: 'Primeira Vitória',          description: 'Acertaste a primeira pergunta!',                icon: '🌟', requirement: (s) => s.totalCorrect >= 1 },
  { id: 'streak-5',          name: 'Em Fogo! 🔥',               description: 'Acertaste 5 perguntas seguidas!',              icon: '🔥', requirement: (s) => s.streak >= 5 },
  { id: 'streak-10',         name: 'Imparável!',                description: 'Acertaste 10 perguntas seguidas!',             icon: '⚡', requirement: (s) => s.streak >= 10 },
  { id: 'score-100',         name: 'Centena!',                  description: 'Chegaste aos 100 pontos!',                     icon: '💯', requirement: (s) => s.score >= 100 },
  { id: 'score-200',         name: 'Duzentos!',                 description: 'Chegaste aos 200 pontos!',                     icon: '🏆', requirement: (s) => s.score >= 200 },
  { id: 'survivor',          name: 'Sobrevivente',              description: 'Respondeste 15 perguntas sem perder vidas!',   icon: '💪', requirement: (s) => s.totalCorrect + s.totalIncorrect >= 15 && s.lives > 0 },
  { id: 'perfectionist',     name: 'Perfecionista',             description: 'Acertaste 20 perguntas sem errar!',            icon: '👑', requirement: (s) => s.totalCorrect >= 20 && s.totalIncorrect === 0 },
  { id: 'mini-game-master',  name: 'Mestre dos Mini-Jogos',     description: 'Completaste 3 mini-jogos!',                    icon: '🎮', requirement: (s) => Math.floor(s.totalCorrect / 5) >= 3 }
];

// ===================== ESTADO =====================
let gameState = {
  screen: 'subject-select',
  subject: null,
  semester: null,
  questions: [],
  currentQuestionIndex: 0,

  score: 0,
  lives: 5,
  streak: 0,
  totalCorrect: 0,
  totalIncorrect: 0,

  // ciclo perfeito (mini-jogo só aparece se o conjunto foi 100% correto)
  roundCorrect: 0,
  roundInvalid: false,

  unlockedBadges: [],
  showingFeedback: false,
  selectedOption: null,

  // mini-jogo (carregado externamente)
  miniGameController: null,

  loadingQuestions: false
};

// ===================== RENDER ROOT =====================
function render() {
  const app = document.getElementById('app');

  if (gameState.screen === 'subject-select') {
    renderSubjectSelector(app);
    return;
  }

  if (gameState.screen === 'semester-select') {
    renderSemesterSelector(app);
    return;
  }

  if (gameState.loadingQuestions) {
    app.innerHTML = `<div class="text-center" style="padding:48px;font-size:1.25rem;color:hsl(280,10%,50%)">A carregar perguntas… ⏳</div>`;
    return;
  }

  if (gameState.screen === 'playing') {
    if (!gameState.questions || gameState.questions.length === 0) {
      app.innerHTML = `
        <div class="question-container">
          <div class="game-header">
            <h2 style="text-align:center">Sem perguntas carregadas para esta disciplina/semestre.</h2>
            <div class="text-center" style="margin-top:16px">
              <button class="btn btn-secondary" onclick="backToMenu()">← Voltar ao menu</button>
            </div>
          </div>
        </div>`;
      return;
    }
    renderGameScreen(app);
    return;
  }

  if (gameState.screen === 'mini-game') {
    renderMiniGame(app); // carrega o módulo da forca e desenha
    return;
  }

  if (gameState.screen === 'game-over') {
    renderGameOver(app);
  }
}

// ===================== UI: SELEÇÃO DISCIPLINA/SEMESTRE =====================
function renderSubjectSelector(container) {
  container.innerHTML = `
    <div class="subject-selector">
      <div class="subject-header">
        <h1>🎓 Quiz Educativo</h1>
        <p>Escolhe uma disciplina para começar a jogar!</p>
      </div>
      <div class="subject-grid">
        ${SUBJECTS.map((subject, index) => `
          <div class="subject-card" onclick="selectSubject('${subject.id}')" style="animation-delay:${index * 0.1}s">
            <div class="subject-card-header ${subject.gradient}">
              <div class="subject-icon">${subject.icon}</div>
              <h3 class="subject-name">${subject.name}</h3>
            </div>
            <div class="subject-card-footer">
              <button class="btn">Jogar! 🎮</button>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="text-center" style="margin-top:48px;animation:slideUp 0.4s ease-out;">
        <p style="color:hsl(280,10%,50%)">⭐ O mini-jogo (forca) só abre ao acertar TODAS as perguntas de um ciclo.</p>
      </div>
    </div>
  `;
}

function renderSemesterSelector(container) {
  container.innerHTML = `
    <div class="subject-selector">
      <div class="subject-header">
        <h1>📚 ${SUBJECTS.find(s => s.id === gameState.subject)?.name || 'Disciplina'}</h1>
        <p>Escolhe o semestre para começar.</p>
      </div>
      <div class="subject-grid">
        ${['semestre1', 'semestre2'].map((sem, i) => `
          <div class="subject-card" onclick="selectSemester('${sem}')" style="animation-delay:${i*0.1}s">
            <div class="subject-card-header gradient-blue">
              <div class="subject-icon">📖</div>
              <h3 class="subject-name">${sem === 'semestre1' ? 'Semestre 1' : 'Semestre 2'}</h3>
            </div>
            <div class="subject-card-footer">
              <button class="btn">Jogar! 🎮</button>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="text-center" style="margin-top:24px">
        <button class="btn btn-secondary" onclick="backToMenu()">← Voltar</button>
      </div>
    </div>
  `;
}

function selectSubject(subjectId) {
  gameState.subject = subjectId;
  gameState.semester = null;
  gameState.screen = 'semester-select';
  render();
}

async function selectSemester(semesterId) {
  gameState.semester = semesterId;
  gameState.loadingQuestions = true;
  render();

  try {
    const qs = await loadQuestions(gameState.subject, gameState.semester);
    gameState.questions = [...qs]; // usa ordem definida no ficheiro de dados
    gameState.currentQuestionIndex = 0;

    // reset jogo
    gameState.score = 0;
    gameState.lives = 5;
    gameState.streak = 0;
    gameState.totalCorrect = 0;
    gameState.totalIncorrect = 0;
    gameState.unlockedBadges = [];
    gameState.showingFeedback = false;
    gameState.selectedOption = null;

    // ciclo perfeito
    gameState.roundCorrect = 0;
    gameState.roundInvalid = false;

    // mini-jogo
    if (gameState.miniGameController?.dispose) {
      gameState.miniGameController.dispose();
    }
    gameState.miniGameController = null;

    gameState.screen = 'playing';
  } catch (e) {
    alert('Não foi possível carregar as perguntas deste semestre. Verifica os ficheiros /data.');
    gameState.screen = 'subject-select';
  } finally {
    gameState.loadingQuestions = false;
    render();
  }
}

// Import dinâmico: /data/{disciplina}/{semestre}.js -> export default [ ... ]
async function loadQuestions(subjectId, semesterId) {
  const module = await import(`./data/${subjectId}/${semesterId}.js`);
  return module.default || [];
}

// ===================== JOGO: QUESTÕES =====================
function renderGameScreen(container) {
  const question = gameState.questions[gameState.currentQuestionIndex];

  const totalQ = gameState.questions.length;
  const progressPercent = Math.min(100, (gameState.roundCorrect / totalQ) * 100);

  container.innerHTML = `
    <div class="question-container">
      <div class="game-header">
        <div class="header-top">
          <div class="lives-container">
            <span class="lives-label">Vidas:</span>
            <div class="hearts">
              ${[1,2,3,4,5].map(i => `<span class="heart ${i > gameState.lives ? 'empty' : ''}">❤️</span>`).join('')}
            </div>
          </div>
          <div class="score-container">
            <span>🏆</span><span class="score-value">${gameState.score}</span>
          </div>
          ${gameState.streak > 0 ? `
            <div class="streak-container"><span>🔥</span><span>${gameState.streak}x Consecutivas!</span></div>
          ` : ''}
        </div>

        <div class="progress-section">
          <div class="progress-header">
            <span class="progress-label">Ciclo perfeito para Mini-Jogo:</span>
            <span class="progress-value">${gameState.roundCorrect}/${totalQ} ⭐</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${progressPercent}%"></div></div>
          ${gameState.roundInvalid ? `
            <p class="progress-hint">Este ciclo já não é perfeito (houve um erro). Termina o conjunto para reiniciar.</p>
          ` : `
            <p class="progress-hint">${totalQ - gameState.roundCorrect} perguntas em falta para o mini-jogo!</p>
          `}
        </div>
      </div>

      <div class="question-card">
        <div class="question-number">
          <span class="question-badge">Pergunta #${gameState.currentQuestionIndex + 1}</span>
        </div>

        <h2 class="question-text">${question.question}</h2>

        <div class="options-grid">
          ${question.options.map((option, index) => `
            <button
              class="option-btn ${gameState.showingFeedback ? (index === question.correctAnswer ? 'correct' : gameState.selectedOption === index ? 'incorrect' : 'disabled') : ''}"
              onclick="selectOption(${index})"
              ${gameState.showingFeedback ? 'disabled' : ''}>
              <span class="option-letter">${String.fromCharCode(65 + index)}.</span>
              <span class="option-text">${option}</span>
              ${gameState.showingFeedback && index === question.correctAnswer ? '<span class="option-icon">✅</span>' : ''}
              ${gameState.showingFeedback && gameState.selectedOption === index && index !== question.correctAnswer ? '<span class="option-icon">❌</span>' : ''}
            </button>
          `).join('')}
        </div>

        ${gameState.showingFeedback ? `
          <div class="feedback-box ${gameState.selectedOption === question.correctAnswer ? 'correct' : 'incorrect'}">
            <div class="feedback-header">
              <span class="feedback-icon">${gameState.selectedOption === question.correctAnswer ? '✅' : '❌'}</span>
              <h3 class="feedback-title ${gameState.selectedOption === question.correctAnswer ? 'correct' : 'incorrect'}">
                ${gameState.selectedOption === question.correctAnswer ? '🎉 Correto!' : '💔 Ups!'}
              </h3>
            </div>
            <p class="feedback-text">${question.explanation}</p>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  if (gameState.showingFeedback) {
    const feedbackBox = document.querySelector('.feedback-box');
    if (feedbackBox) {
      const nextButton = document.createElement('button');
      nextButton.textContent = 'Próxima pergunta ➜';
      nextButton.className = 'btn';
      nextButton.style.marginTop = '16px';

      const q = gameState.questions[gameState.currentQuestionIndex];
      const isCorrect = gameState.selectedOption === q.correctAnswer;

      nextButton.onclick = () => handleAnswer(isCorrect);
      feedbackBox.appendChild(nextButton);
    }
  }
}

function selectOption(optionIndex) {
  if (gameState.showingFeedback) return;

  gameState.selectedOption = optionIndex;
  gameState.showingFeedback = true;

  render();
}

function handleAnswer(isCorrect) {
  const totalQ = gameState.questions.length;
  const atLast = gameState.currentQuestionIndex === totalQ - 1;

  if (isCorrect) {
    gameState.score += 10;
    gameState.streak += 1;
    gameState.totalCorrect += 1;
    gameState.roundCorrect += 1;
    showConfetti();
  } else {
    gameState.score = Math.max(0, gameState.score - 5);
    gameState.streak = 0;
    gameState.lives -= 1;
    gameState.totalIncorrect += 1;
    gameState.roundInvalid = true;

    if (gameState.lives === 0) {
      gameState.screen = 'game-over';
      gameState.showingFeedback = false;
      render();
      return;
    }
  }

  checkBadges();

  if (!atLast) {
    gameState.currentQuestionIndex += 1;
    gameState.showingFeedback = false;
    gameState.selectedOption = null;
    render();
    return;
  }

  // fim do conjunto
  if (!gameState.roundInvalid && gameState.roundCorrect === totalQ) {
    // ciclo perfeito: abre mini-jogo da forca
    gameState.showingFeedback = false;
    gameState.selectedOption = null;
    gameState.screen = 'mini-game';
    render();
    return;
  }

  // caso contrário, reiniciar ciclo
  gameState.currentQuestionIndex = 0;
  gameState.roundCorrect = 0;
  gameState.roundInvalid = false;
  gameState.showingFeedback = false;
  gameState.selectedOption = null;
  render();
}

// ===================== BADGES + CONFETTI =====================
function checkBadges() {
  BADGES.forEach(badge => {
    if (!gameState.unlockedBadges.includes(badge.name) && badge.requirement(gameState)) {
      gameState.unlockedBadges.push(badge.name);
      showBadgeNotification(badge);
    }
  });
}

function showBadgeNotification(badge) {
  const notification = document.getElementById('badge-notification');
  if (!notification) return;
  notification.querySelector('.badge-icon').textContent = badge.icon;
  notification.querySelector('.badge-name').textContent = badge.name;
  notification.querySelector('.badge-desc').textContent = badge.description;
  notification.classList.remove('hidden');
  setTimeout(() => notification.classList.add('hidden'), 4000);
}

function showConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;
  const colors = ['hsl(280,70%,60%)','hsl(330,80%,65%)','hsl(200,80%,60%)','hsl(140,60%,55%)','hsl(50,100%,65%)','hsl(25,90%,60%)'];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

// ===================== MINI-JOGO (FORCA) =====================
async function renderMiniGame(container) {
  // destruir instância anterior se existir
  if (gameState.miniGameController?.dispose) {
    gameState.miniGameController.dispose();
    gameState.miniGameController = null;
  }

  container.innerHTML = `
    <div class="mini-game-container">
      <div class="mini-game-card">
        <div class="mini-game-header">
          <h2 class="mini-game-title">🎯 Mini-Jogo</h2>
          <p class="mini-game-description">A carregar…</p>
        </div>
        <div id="mini-game-host" style="margin-top:8px"></div>
        <div class="text-center" style="margin-top:16px">
          <button class="btn btn-secondary" onclick="backToSemester()">← Voltar</button>
        </div>
      </div>
    </div>
  `;
  const host = container.querySelector('#mini-game-host');

  try {
    if (gameState.subject === 'matematica') {
      const mod = await import('./games/math-challenge.js');
      gameState.miniGameController = mod.renderMathChallenge(host, completeMiniGame);
    } else {
      const mod = await import('./games/hangman.js');
      gameState.miniGameController = mod.renderHangman(host, completeMiniGame);
    }
  } catch (e) {
    container.innerHTML = `
      <div class="mini-game-container">
        <div class="mini-game-card">
          <div class="mini-game-header">
            <h2 class="mini-game-title">⚠️ Erro ao carregar o mini-jogo</h2>
            <p class="mini-game-description">Verifica se <code>./games/hangman.js</code> existe no servidor.</p>
          </div>
          <div class="text-center">
            <button class="btn btn-secondary" onclick="returnToPlaying()">← Voltar</button>
          </div>
        </div>
      </div>
    `;
  }
}

function returnToPlaying() {
  gameState.screen = 'playing';
  render();
}

function completeMiniGame() {
  // pontuação bónus
  gameState.score += 50;

  // destruir controller do mini-jogo (se expuser dispose)
  if (gameState.miniGameController?.dispose) {
    gameState.miniGameController.dispose();
  }
  gameState.miniGameController = null;

  // novo ciclo de perguntas
  gameState.currentQuestionIndex = 0;
  gameState.roundCorrect = 0;
  gameState.roundInvalid = false;

  gameState.screen = 'playing';
  checkBadges();
  render();

  setTimeout(() => alert('🎉 Mini-Jogo Completo! +50 pontos bónus!'), 0);
}

// ===================== GAME OVER / REINICIAR =====================
async function restartGame() {
  if (!gameState.subject) { backToMenu(); return; }
  if (!gameState.semester) { gameState.screen = 'semester-select'; render(); return; }

  gameState.loadingQuestions = true;
  render();

  try {
    const qs = await loadQuestions(gameState.subject, gameState.semester);
    gameState = {
      ...gameState,
      screen: 'playing',
      questions: [...qs],
      currentQuestionIndex: 0,

      score: 0,
      lives: 3,
      streak: 0,
      totalCorrect: 0,
      totalIncorrect: 0,
      unlockedBadges: [],
      showingFeedback: false,
      selectedOption: null,

      roundCorrect: 0,
      roundInvalid: false,

      loadingQuestions: false
    };
  } catch (e) {
    alert('Não foi possível recarregar as perguntas.');
    gameState.loadingQuestions = false;
    gameState.screen = 'subject-select';
  }
  render();
}

function backToMenu() {
  if (gameState.miniGameController?.dispose) {
    gameState.miniGameController.dispose();
  }
  gameState = {
    screen: 'subject-select',
    subject: null,
    semester: null,
    questions: [],
    currentQuestionIndex: 0,

    score: 0,
    lives: 3,
    streak: 0,
    totalCorrect: 0,
    totalIncorrect: 0,

    roundCorrect: 0,
    roundInvalid: false,

    unlockedBadges: [],
    showingFeedback: false,
    selectedOption: null,

    loadingQuestions: false,
    miniGameController: null
  };
  render();
}

function backToSemester() {
  if (!gameState.subject) { backToMenu(); return; }
  if (gameState.miniGameController?.dispose) {
    gameState.miniGameController.dispose();
  }
  gameState.miniGameController = null;
  gameState.screen = 'semester-select';
  gameState.showingFeedback = false;
  gameState.selectedOption = null;
  render();
}

function renderGameOver(container) {
  const accuracy = gameState.totalCorrect + gameState.totalIncorrect > 0
    ? Math.round((gameState.totalCorrect / (gameState.totalCorrect + gameState.totalIncorrect)) * 100)
    : 0;

  container.innerHTML = `
    <div class="game-over-container">
      <div class="game-over-card">
        <div class="game-over-emoji">${gameState.lives === 0 ? '💔' : '🎉'}</div>
        <h2 class="game-over-title">${gameState.lives === 0 ? 'Fim do Jogo!' : 'Parabéns!'}</h2>
        <p class="game-over-message">
          ${gameState.lives === 0 
            ? 'Não desistas! Tenta novamente e conseguirás fazer melhor! 💪'
            : 'Excelente trabalho! Continua assim! 🌟'
          }
        </p>
        <div class="stats-grid">
          <div class="stat-card" style="background: linear-gradient(135deg, hsl(280,70%,60%) 0%, hsl(330,80%,65%) 100%);">
            <div class="stat-icon">🏆</div>
            <div class="stat-value">${gameState.score}</div>
            <div class="stat-label">Pontos</div>
          </div>
          <div class="stat-card" style="background: linear-gradient(135deg, hsl(140,60%,55%) 0%, hsl(170,60%,55%) 100%);">
            <div class="stat-icon">🎯</div>
            <div class="stat-value">${accuracy}%</div>
            <div class="stat-label">Precisão</div>
          </div>
          <div class="stat-card" style="background: linear-gradient(135deg, hsl(200,80%,60%) 0%, hsl(280,70%,60%) 100%);">
            <div class="stat-icon">✅</div>
            <div class="stat-value">${gameState.totalCorrect}</div>
            <div class="stat-label">Corretas</div>
          </div>
          <div class="stat-card" style="background: linear-gradient(135deg, hsl(25,90%,60%) 0%, hsl(0,75%,60%) 100%);">
            <div class="stat-icon">🔥</div>
            <div class="stat-value">${Math.floor(gameState.totalCorrect / 5)}</div>
            <div class="stat-label">Mini-Jogos</div>
          </div>
        </div>
        ${gameState.unlockedBadges.length > 0 ? `
          <div class="badges-section">
            <h3 class="badges-title">🏆 Conquistas Desbloqueadas</h3>
            <div class="badges-list">
              ${gameState.unlockedBadges.map(badge => `<div class="badge-item">${badge}</div>`).join('')}
            </div>
          </div>
        ` : ''}
        <div class="game-over-actions">
          <button class="btn" onclick="restartGame()">🔄 Jogar Novamente</button>
          <button class="btn btn-secondary" onclick="backToMenu()">🏠 Menu Principal</button>
        </div>
      </div>
    </div>
  `;
}

// ===================== EXPOSTO AO HTML (onclick) =====================
window.selectSubject = selectSubject;
window.selectSemester = selectSemester;
window.selectOption = selectOption;
window.restartGame = restartGame;
window.backToMenu = backToMenu;
window.backToSemester = backToSemester;

// ===================== START =====================
render();
