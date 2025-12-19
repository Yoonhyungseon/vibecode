(() => {
  const rangeSelect = document.getElementById('rangeSelect');
  const newGameBtn = document.getElementById('newGame');
  const guessInput = document.getElementById('guessInput');
  const checkBtn = document.getElementById('checkBtn');
  const hintArea = document.querySelector('.hint-area');
  const attemptsLabel = document.getElementById('attempts');
  const confettiEl = document.getElementById('confetti');

  let secret = null;
  let attempts = 0;
  let max = parseInt(rangeSelect.value, 10);

  function newGame() {
    max = parseInt(rangeSelect.value, 10);
    secret = Math.floor(Math.random() * max) + 1;
    attempts = 0;
    attemptsLabel.textContent = attempts;
    hintArea.classList.remove('success');
    hintArea.textContent = `새 게임이 시작되었습니다 — 1에서 ${max} 사이의 숫자입니다.`;
    guessInput.value = '';
    guessInput.min = 1;
    guessInput.max = max;
    guessInput.focus();
    clearConfetti();
  }

  function showConfetti() {
    clearConfetti();
    const count = 30;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.style.left = Math.random() * 100 + '%';
      dot.style.background = `hsl(${Math.random()*300},80%,60%)`;
      dot.style.transform = `translateY(-20vh) rotate(${Math.random()*360}deg)`;
      confettiEl.appendChild(dot);

      // simple fall animation with random duration
      const dur = 1.6 + Math.random()*1.8;
      dot.animate([
        { transform: dot.style.transform, opacity: 1 },
        { transform: `translateY(${100 + Math.random()*30}vh) rotate(${Math.random()*720}deg)`, opacity: 0 }
      ], {duration: dur*1000, easing: 'cubic-bezier(.2,.7,.1,1)', fill: 'forwards'});
    }
  }

  function clearConfetti() {
    while (confettiEl.firstChild) confettiEl.removeChild(confettiEl.firstChild);
  }

  function checkGuess() {
    const val = guessInput.value.trim();
    if (!val) {
      hintArea.textContent = '숫자를 입력하세요.';
      return;
    }
    const n = Number(val);
    if (!Number.isFinite(n) || !Number.isInteger(n)) {
      hintArea.textContent = '유효한 정수를 입력하세요.';
      return;
    }
    if (n < 1 || n > max) {
      hintArea.textContent = `숫자는 1부터 ${max} 사이여야 합니다.`;
      return;
    }

    attempts += 1;
    attemptsLabel.textContent = attempts;

    if (n === secret) {
      hintArea.classList.add('success');
      hintArea.textContent = `정답이에요! 🎉 ${attempts}번 만에 맞추셨어요. 새 게임으로 다시 도전하세요.`;
      showConfetti();
      showCatDance();
    } else if (n < secret) {
      hintArea.textContent = '더 큽니다. ↑';
    } else {
      hintArea.textContent = '더 작습니다. ↓';
    }
    guessInput.focus();
    guessInput.select();
  }

  // keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      guessInput.value = '';
      guessInput.focus();
    }
    if (e.key === 'r' || e.key === 'R') newGame();
  });

  // attach events
  newGameBtn.addEventListener('click', newGame);
  checkBtn.addEventListener('click', checkGuess);
  guessInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkGuess(); });

  // cat dance overlay
  const catDance = document.getElementById('catDance');
  const closeCat = document.getElementById('closeCat');
  let catTimer = null;

  function showCatDance() {
    if (!catDance) return;
    // show overlay and animation
    catDance.setAttribute('aria-hidden', 'false');
    catDance.classList.add('playing');
    // make it last ~10 seconds
    if (catTimer) clearTimeout(catTimer);
    catTimer = setTimeout(hideCatDance, 10000);
  }

  function hideCatDance() {
    if (!catDance) return;
    catDance.classList.remove('playing');
    catDance.setAttribute('aria-hidden', 'true');
    if (catTimer) { clearTimeout(catTimer); catTimer = null; }
  }

  if (closeCat) closeCat.addEventListener('click', hideCatDance);

  // initialize
  newGame();

})();
