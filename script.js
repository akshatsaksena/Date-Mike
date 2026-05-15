const outcomes = {
  steady: {
    title: "Policy Pandit 🧠",
    copy: "You choose ethics over optics. Calm tone, sharp spine, zero nonsense.",
    memes: [
      ["Bug Chhupao? Nah.", "Leadership wants magic", "You bring truth + mitigation."],
      ["Corporate Sanskaar", "When gossip arrives", "Reply: 'Not participating.'"],
      ["Weekend Warrior Trap", "'Just one small task'", "You ask for comp-off trail."]
    ],
    tips: [
      "Document facts, not drama.",
      "Set boundaries in writing.",
      "Call out behavior, not identity."
    ]
  },
  spark: {
    title: "Culture Ustaad ⚡",
    copy: "You can stop chaos without killing morale. High empathy, high accountability.",
    memes: [
      ["Standup Samosa Energy", "Mood drops in meeting", "You redirect with dignity."],
      ["Accent Joke Freeze", "Room gets awkward", "You reset tone in 7 words."],
      ["Burnout Antakshari", "Team sinking quietly", "You rally realistic planning."]
    ],
    tips: [
      "Normalize speaking up early.",
      "Protect quiet voices in meetings.",
      "Turn outrage into action items."
    ]
  },
  chaos: {
    title: "Compliance Goblin 🎭",
    copy: "You are unfiltered but pointed. You roast bad systems, not colleagues.",
    memes: [
      ["Kalesh-as-a-Service", "'Hide this issue for now'", "You escalate with receipts."],
      ["Bigg Boss Office Edition", "Gossip ping enters inbox", "You hard-pass and exit."],
      ["Jugaad vs Burnout", "Weekend demand appears", "You choose labor rights energy."]
    ],
    tips: [
      "Be funny, never cruel.",
      "Escalate patterns, not one-off mistakes.",
      "Humor should punch up at power."
    ]
  }
};

const themes = { steady: ["#304ffe", "#00e5ff"], spark: ["#ff6d00", "#ffea00"], chaos: ["#d500f9", "#00b0ff"] };
const pinterestQueries = ["office meme template", "the office meme", "indian corporate meme", "workplace humor meme"];

function pinUrl(query) {
  return `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`;
}

function buildMemeDataUri(top, bottom, [c1, c2]) {
  const esc = (t) => t.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='420'>
    <defs><linearGradient id='g' x1='0%' x2='100%' y1='0%' y2='100%'><stop offset='0%' stop-color='${c1}' /><stop offset='100%' stop-color='${c2}' /></linearGradient><filter id='n'><feTurbulence baseFrequency='.9' numOctaves='1' stitchTiles='stitch'/><feColorMatrix type='saturate' values='.08'/><feBlend mode='overlay'/></filter></defs>
    <rect width='100%' height='100%' fill='url(#g)' /><rect width='100%' height='100%' filter='url(#n)' opacity='.2'/><rect x='24' y='24' width='592' height='372' rx='24' fill='rgba(0,0,0,.26)' stroke='rgba(255,255,255,.4)' />
    <text x='320' y='84' fill='white' font-size='32' font-family='Inter,Arial' font-weight='900' text-anchor='middle'>${esc(top)}</text>
    <text x='320' y='356' fill='#fff200' font-size='35' font-family='Inter,Arial' font-weight='900' text-anchor='middle'>${esc(bottom)}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

document.getElementById('vibe-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const tally = { steady: 0, spark: 0, chaos: 0 };
  ['q1', 'q2', 'q3', 'q4'].forEach((q) => tally[data.get(q)]++);
  const winner = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
  const chosen = outcomes[winner];

  document.getElementById('result-title').textContent = chosen.title;
  document.getElementById('result-copy').textContent = chosen.copy;

  const memeRoot = document.getElementById('memes');
  memeRoot.innerHTML = '';
  const tpl = document.getElementById('meme-template');
  chosen.memes.forEach(([name, top, bottom], idx) => {
    const node = tpl.content.cloneNode(true);
    const search = `${pinterestQueries[idx % pinterestQueries.length]} ${name}`;
    const url = pinUrl(search);
    node.querySelector('h4').textContent = name;
    node.querySelector('.caption').textContent = `${top} / ${bottom}`;
    node.querySelector('.meme-img').src = buildMemeDataUri(top, bottom, themes[winner]);
    node.querySelector('.pin-link').href = url;
    node.querySelector('.pin-search').href = url;
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
