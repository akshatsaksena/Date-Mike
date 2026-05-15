const outcomes = {
  steady: {
    title: "The Respectful Strategist 🧠",
    copy: "You're smooth, thoughtful, and policy-safe. You build trust first, then connection.",
    memes: [
      ["The Office Zoom Face", "When someone says 'quick 5-min sync'", "Me opening a 27-slide deck anyway."],
      ["Corporate Drake", "Oversharing at work", "Complimenting great work with receipts."],
      ["Calendar Boss", "Random flirting in Slack", "Scheduled coffee chat with clear intent."]
    ],
    tips: [
      "Compliments should focus on work, ideas, or effort.",
      "Ask consent before turning conversations personal.",
      "If in doubt, keep tone warm but professional."
    ]
  },
  spark: {
    title: "The Team Hype Captain ⚡",
    copy: "You bring energy and make people feel seen. Your superpower is uplifting people without pressure.",
    memes: [
      ["Michael Scott Energy", "Trying to boost morale", "Actually remembering everyone's wins."],
      ["Pam Reaction Meme", "When your teammate crushes a presentation", "'THAT was iconic.'"],
      ["Uno Reverse", "Office awkwardness", "Turning it into appreciation thread."]
    ],
    tips: [
      "Celebrate publicly, connect privately (and respectfully).",
      "Read cues: enthusiasm isn't always invitation.",
      "Keep boundaries explicit and kind."
    ]
  },
  chaos: {
    title: "The Meme Diplomat 🎭",
    copy: "You communicate through humor and vibes. Keep it playful, inclusive, and never targeted.",
    memes: [
      ["The Office Fire Drill", "When the group chat gets too dry", "*drops one harmless meme and leaves*"],
      ["NPC at Standup", "'Any blockers?'", "Me pretending I don't have 48 tabs open."],
      ["Keyboard Smash", "Trying to sound casual in email", "'Per my last meme...' (not sent)"]
    ],
    tips: [
      "Memes should never be sexual, personal, or exclusionary.",
      "Use humor to include people, not test limits.",
      "When unsure, skip the joke and choose clarity."
    ]
  }
};

document.getElementById('vibe-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const tally = { steady: 0, spark: 0, chaos: 0 };
  ['q1','q2','q3'].forEach((q) => tally[data.get(q)]++);
  const winner = Object.entries(tally).sort((a,b) => b[1]-a[1])[0][0];
  const chosen = outcomes[winner];

  document.getElementById('result-title').textContent = chosen.title;
  document.getElementById('result-copy').textContent = chosen.copy;

  const memeRoot = document.getElementById('memes');
  memeRoot.innerHTML = '';
  const tpl = document.getElementById('meme-template');
  chosen.memes.forEach(([title, setup, punch]) => {
    const node = tpl.content.cloneNode(true);
    node.querySelector('h4').textContent = title;
    node.querySelector('.setup').textContent = setup;
    node.querySelector('.punch').textContent = punch;
    memeRoot.appendChild(node);
  });

  const tipsRoot = document.getElementById('tips');
  tipsRoot.innerHTML = '';
  chosen.tips.forEach((tip) => {
    const li = document.createElement('li');
    li.textContent = tip;
    tipsRoot.appendChild(li);
  });

  document.getElementById('result').classList.remove('hidden');
  document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
});
