
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('[data-menu-toggle]');
  const menu = document.getElementById('side-menu');
  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        menu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const quiz = document.getElementById('quizForm');
  if (quiz) {
    quiz.addEventListener('submit', (event) => {
      event.preventDefault();
      const answers = {q1:'b', q2:'c', q3:'b', q4:'a', q5:'c'};
      let score = 0;
      for (const [key, value] of Object.entries(answers)) {
        const checked = quiz.querySelector(`input[name="${key}"]:checked`);
        if (checked && checked.value === value) score += 1;
      }
      const result = document.getElementById('quizResult');
      if (result) {
        result.hidden = false;
        result.innerHTML = `<strong>Punteggio:</strong> ${score}/5.<br>${
          score === 5 ? 'Hai il quadro d’insieme ben saldo.' :
          score >= 3 ? 'La struttura regge, ma alcuni nodi vanno ripassati.' :
          'Non basta aver letto: qui serve ricollegare i passaggi storici e concettuali.'
        }`;
      }
    });
  }
});
