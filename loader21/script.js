const rows = [...document.querySelectorAll('.process-row')];
const thoughtText = document.getElementById('thoughtText');
const confidenceBar = document.getElementById('confidenceBar');
const confidenceValue = document.getElementById('confidenceValue');
const elapsed = document.getElementById('elapsed');
const thinkingElapsed = document.getElementById('thinkingElapsed');
const composer = document.getElementById('composer');
const prompt = document.getElementById('prompt');
const conversation = document.getElementById('conversation');
const userMessage = document.getElementById('userMessage');
const draftText = document.getElementById('draftText');
const thread = document.querySelector('.thread');
const historyTitle = document.getElementById('historyTitle');

const thoughts = [
  'Considering the best way to help…',
  'Reviewing the available context…',
  'Exploring a few possible approaches…',
  'Checking the details…',
  'Organizing the response…',
  'Refining the answer…',
  'Making sure this is useful…',
  'Almost ready…'
];

const destinations = Array.from({ length: 20 }, (_, index) => `../loader${index + 1}/index.html`);

let seconds = 1;
let phase = 0;
let thoughtIndex = 0;
let confidence = 12;
let hasStarted = false;
let draft = '';
let targetDraft = '';
let draftMode = 'pause';
let draftTimer;

const draftOpenings = [
  'I think the best place to begin is',
  'Based on what you’ve shared, I would suggest',
  'There are a few ways we could approach this, but',
  'The most useful next step might be',
  'Let’s start by looking at',
  'A thoughtful way forward would be to'
];

function scheduleDraft(delay) {
  window.clearTimeout(draftTimer);
  draftTimer = window.setTimeout(runDraft, delay);
}

function chooseDraft() {
  const options = draftOpenings.filter(option => option !== targetDraft);
  targetDraft = options[Math.floor(Math.random() * options.length)];
  draftMode = 'typing';
  scheduleDraft(80 + Math.random() * 180);
}

function runDraft() {
  if (!hasStarted) return;

  if (draftMode === 'typing') {
    draft = targetDraft.slice(0, draft.length + 1);
    draftText.textContent = draft;

    if (draft === targetDraft) {
      draftMode = 'deleting';
      scheduleDraft(700 + Math.random() * 1700);
      return;
    }

    if (draft.length > 12 && Math.random() < 0.035) {
      draftMode = 'deleting';
      scheduleDraft(250 + Math.random() * 500);
      return;
    }

    scheduleDraft(28 + Math.random() * 75);
    return;
  }

  if (draftMode === 'deleting') {
    const removeCount = Math.random() < 0.16 ? 2 : 1;
    draft = draft.slice(0, Math.max(0, draft.length - removeCount));
    draftText.textContent = draft;

    if (!draft || (draft.length < 15 && Math.random() < 0.12)) {
      draft = '';
      draftText.textContent = '';
      draftMode = 'pause';
      scheduleDraft(500 + Math.random() * 1500);
      return;
    }

    scheduleDraft(18 + Math.random() * 45);
    return;
  }

  chooseDraft();
}

function revealResponse() {
  window.requestAnimationFrame(() => {
    thread.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function resetChat() {
  hasStarted = false;
  window.clearTimeout(draftTimer);
  conversation.classList.add('idle');
  userMessage.textContent = '';
  draft = '';
  draftText.textContent = '';
  prompt.value = '';
  historyTitle.textContent = 'New conversation';
  seconds = 1;
  phase = 0;
  confidence = 12;
  confidenceBar.style.width = '12%';
  confidenceValue.textContent = '12%';
  rows.forEach((row, index) => {
    row.classList.toggle('active', index === 0);
    row.classList.remove('complete');
  });
  prompt.focus();
}

function updateProcess() {
  rows.forEach((row, index) => {
    row.classList.toggle('complete', index < phase);
    row.classList.toggle('active', index === phase);
  });

  confidence += Math.max(1, Math.floor(Math.random() * 8));
  if (confidence > 94) confidence = 61 + Math.floor(Math.random() * 14);
  confidenceBar.style.width = `${confidence}%`;
  confidenceValue.textContent = `${confidence}%`;

  phase += 1;
  if (phase >= rows.length) {
    window.setTimeout(() => {
      phase = 0;
      rows.forEach(row => row.classList.remove('complete', 'active'));
      rows[0].classList.add('active');
    }, 1100);
  }
}

function updateThought() {
  thoughtText.classList.add('changing');
  window.setTimeout(() => {
    thoughtIndex = (thoughtIndex + 1) % thoughts.length;
    thoughtText.textContent = thoughts[thoughtIndex];
    thoughtText.classList.remove('changing');
  }, 210);
}

function visitAnotherLoader() {
  const destination = destinations[Math.floor(Math.random() * destinations.length)];
  window.location.href = destination;
}

window.setInterval(() => {
  if (!hasStarted) return;
  seconds += 1;
  const minutes = Math.floor(seconds / 60);
  const remainder = String(seconds % 60).padStart(2, '0');
  elapsed.textContent = `Session ${minutes}:${remainder}`;
  thinkingElapsed.textContent = `Thinking for ${seconds.toLocaleString()} ${seconds === 1 ? 'second' : 'seconds'}`;
}, 1000);

window.setInterval(() => {
  if (hasStarted) updateProcess();
}, 3100);

window.setInterval(() => {
  if (hasStarted) updateThought();
}, 4300);

composer.addEventListener('submit', event => {
  event.preventDefault();
  const value = prompt.value.trim();
  if (value) {
    userMessage.textContent = value;
    historyTitle.textContent = value;
    conversation.classList.remove('idle');
    hasStarted = true;
    seconds = 1;
    elapsed.textContent = 'Session 0:01';
    thinkingElapsed.textContent = 'Thinking for 1 second';
    prompt.value = '';
    draft = '';
    draftText.textContent = '';
    draftMode = 'pause';
    chooseDraft();
    revealResponse();
  }
});

document.getElementById('brandButton').addEventListener('click', visitAnotherLoader);
document.getElementById('moreButton').addEventListener('click', visitAnotherLoader);
document.getElementById('newChatButton').addEventListener('click', resetChat);
