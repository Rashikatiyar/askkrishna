const openBtn = document.getElementById('openChatBtn');
const chatbox = document.getElementById('chatbox');
const closeBtn = document.getElementById('closeChat');
const form = document.getElementById('chatForm');
const input = document.getElementById('chatInput');
const messages = document.getElementById('messages');

function addMessage(text, who = 'bot') {
  const div = document.createElement('div');
  div.className = 'msg ' + who;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const typing = document.createElement('div');
  typing.className = 'msg bot typing';
  typing.textContent = 'Krishna is thinking...';
  typing.id = 'typing';
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
  const typing = document.getElementById('typing');
  if (typing) typing.remove();
}

async function botReply(userText) {
  showTyping();
  try {
    const res = await fetch('https://askkrishnabackend.onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText })
    });

    const data = await res.json();
    hideTyping();
    return data.reply || "I'm not sure how to answer that from the Gita.";
  } catch (err) {
    hideTyping();
    return "Something went wrong. Please try again later.";
  }
}

openBtn.addEventListener('click', () => {
  chatbox.classList.add('open');
  setTimeout(() => input.focus(), 50);
});

closeBtn.addEventListener('click', () => {
  chatbox.classList.remove('open');
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';
  const reply = await botReply(text);
  addMessage(reply, 'bot');
});
