const openBtn = document.getElementById('openChatBtn');
const chatbox = document.getElementById('chatbox');
const closeBtn = document.getElementById('closeChat');
const form = document.getElementById('chatForm');
const input = document.getElementById('chatInput');
const messages = document.getElementById('messages');

const gitaReplies = [
  'Perform your duty, but do not be attached to the results. (2.47)',
  'The mind is restless, but it can be controlled by practice and detachment. (6.35)',
  'You are what you believe in. You become that which you believe you can become.',
  'Set thy heart upon thy work, but never on its reward. (2.47)',
  'Peace comes from within. Do not seek it without.',
];

function addMessage(text, who = 'bot') {
  const div = document.createElement('div');
  div.className = 'msg ' + who;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function botReply(userText) {
  const t = userText.toLowerCase();
  if (t.includes('karma')) return 'Do your karma without attachment to results, Arjuna. (2.47)';
  if (t.includes('mind')) return 'The mind is restless, but it is subdued by practice. (6.35)';
  if (t.includes('fear')) return 'Abandon all fear and surrender to Me. I will protect you. (18.66)';
  return gitaReplies[Math.floor(Math.random() * gitaReplies.length)];
}

openBtn.addEventListener('click', () => {
  chatbox.classList.add('open');
  setTimeout(() => input.focus(), 50);
});

closeBtn.addEventListener('click', () => {
  chatbox.classList.remove('open');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';
  setTimeout(() => {
    addMessage(botReply(text), 'bot');
  }, 400);
});
