const feedbackForm = document.getElementById('feedback-form');
const commentsArea = document.getElementById('comments');
const charCountSpan = document.getElementById('char-count');
const feedbackDisplay = document.getElementById('feedback-display');
const tooltip = document.getElementById('tooltip');
const errorMessage = document.getElementById('error-message');

commentsArea.addEventListener('input', (e) => {
    charCountSpan.textContent = e.target.value.length;
});

feedbackForm.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        e.preventDefault();
        const inputs = Array.from(feedbackForm.querySelectorAll('input, textarea'));
        const index = inputs.indexOf(e.target);
        if (index < inputs.length - 1) inputs[index + 1].focus();
    }
});

feedbackForm.addEventListener('mouseover', (e) => {
    const tip = e.target.getAttribute('data-tooltip');
    if (tip) {
        tooltip.textContent = tip;
        tooltip.classList.remove('hidden');
    }
});

feedbackForm.addEventListener('mousemove', (e) => {
    if (!tooltip.classList.contains('hidden')) {
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY + 10 + 'px';
    }
});

feedbackForm.addEventListener('mouseout', (e) => {
    if (e.target.hasAttribute('data-tooltip')) {
        tooltip.classList.add('hidden');
    }
});

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const comment = commentsArea.value.trim();

    if (!name || !email || !comment) {
        errorMessage.textContent = "ALL FIELDS REQUIRED";
        return;
    }

    errorMessage.textContent = "";

  const card = document.createElement('div');
    card.className = 'feedback-card';
    card.innerHTML = `
        <p>
            <strong style="color: var(--orange); font-size: 1.1rem;">${name.toUpperCase()}</strong>
        </p>
        <p style="color: var(--white); font-size: 0.9rem; margin-bottom: 5px;">${email}</p>
        <p style="color: var(--white);">${comment}</p>
    `;

    feedbackDisplay.prepend(card);
    feedbackForm.reset();
    charCountSpan.textContent = "0";
});

document.body.addEventListener('click', () => {
    console.log("Clicked the black background");
});

document.getElementById('form-container').addEventListener('click', (e) => {
    e.stopPropagation();
    console.log("Clicked inside the form section - Propagation Stopped");
});