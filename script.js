const outcomes = {
  steady: {
    title: "Boundary Brainiac 🧠",
    copy: "You flirt with competence: clear signals, real respect, zero mess. You're elite at keeping vibes good and consequences low.",
    memes: [
      ["Hard Launch: Professionalism", "When chat gets weird", "You: 'Let's keep this work-safe and funny.'"],
      ["The Office Eye Contact", "Coworker: 'quick call?'", "You already sent an agenda + outcome."],
      ["Spreadsheet Rizz", "People chasing chaos", "You bringing clarity like a superhero."]
    ],
    tips: [
      "Name boundaries early; it makes everyone relax.",
      "Use praise about work quality, not appearance.",
      "If signals are fuzzy, ask. Don't assume."
    ]
  },
  spark: {
    title: "Morale Menace (Good) ⚡",
    copy: "You are pure momentum. You can make any room feel alive — your power move is channeling hype into inclusive, consent-aware energy.",
    memes: [
      ["Michael Scott But Competent", "You entering standup", "'Today we celebrate every tiny win.'"],
      ["Reaction Shot Deluxe", "Teammate nails presentation", "You writing a 6-line shoutout instantly."],
      ["Calendar Gremlin", "No social plans", "You scheduling a sane, optional coffee circle."]
    ],
    tips: [
      "Be loud with appreciation, soft with assumptions.",
      "One-on-one tone should match the other person's comfort.",
      "Never corner; always give social exits."
    ]
  },
  chaos: {
    title: "Certified Meme Goblin 🎭",
    copy: "You live for unhinged humor. Keep it absurd, never personal — that's how you stay iconic without being a problem.",
    memes: [
      ["The Office Fire Alarm Arc", "Slack is too serious", "You deploy one meme and restore oxygen."],
      ["Corporate NPC Glitch", "'Any blockers?'", "You: 'Only existential and Jira-related.'"],
      ["Reply-All Roulette", "Typing risky joke", "You choose harmless chaos and live to meme again."]
    ],
    tips: [
      "Punch up at situations, not people.",
      "No sexual content. No targeting colleagues.",
      "If you have to ask if it's too much, it's too much."
    ]
  }
};

const themes = {
  steady: ["#304ffe", "#00e5ff"],
  spark: ["#ff6d00", "#ffea00"],
  chaos: ["#d500f9", "#00b0ff"]
};

function buildMemeDataUri(top, bottom, [c1, c2]) {
  const esc = (t) => t.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='640' height='420'>
    <defs>
      <linearGradient id='g' x1='0%' x2='100%' y1='0%' y2='100%'>
        <stop offset='0%' stop-color='${c1}' />
        <stop offset='100%' stop-color='${c2}' />
      </linearGradient>
      <filter id='n'><feTurbulence baseFrequency='.9' numOctaves='1' stitchTiles='stitch'/><feColorMatrix type='saturate' values='.08'/><feBlend mode='overlay'/></filter>
    </defs>
    <rect width='100%' height='100%' fill='url(#g)' />
    <rect width='100%' height='100%' filter='url(#n)' opacity='.2'/>
    <rect x='24' y='24' width='592' height='372' rx='24' fill='rgba(0,0,0,.26)' stroke='rgba(255,255,255,.4)' />
    <text x='320' y='80' fill='white' font-size='34' font-family='Inter,Arial' font-weight='900' text-anchor='middle'>${esc(top)}</text>
    <text x='320' y='356' fill='#fff200' font-size='36' font-family='Inter,Arial' font-weight='900' text-anchor='middle'>${esc(bottom)}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

document.getElementById('vibe-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const tally = { steady: 0, spark: 0, chaos: 0 };
  ['q1','q2','q3','q4'].forEach((q) => tally[data.get(q)]++);
  const winner = Object.entries(tally).sort((a,b) => b[1]-a[1])[0][0];
  const chosen = outcomes[winner];

  document.getElementById('result-title').textContent = chosen.title;
  document.getElementById('result-copy').textContent = chosen.copy;

  const memeRoot = document.getElementById('memes');
  memeRoot.innerHTML = '';
  const tpl = document.getElementById('meme-template');
  chosen.memes.forEach(([name, top, bottom]) => {
    const node = tpl.content.cloneNode(true);
    node.querySelector('h4').textContent = name;
    node.querySelector('.caption').textContent = `${top} / ${bottom}`;
    node.querySelector('.meme-img').src = buildMemeDataUri(top, bottom, themes[winner]);
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
