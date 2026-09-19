const PROJECTS = {
  laver: {
    name: "Laver",
    img: "assets/img/aW7A9FUI7biW9avIUSHivukRgo.png",
    extras: [
      "assets/img/5wI5Z4u18Cwc9Ijqoby6vGsy6hs.png",
      "assets/img/BjOPBpoElvlUZWjhpgxsbLty4xM.png",
      "assets/img/z0N5buFqkrDfteb46UPeEX2nldc.png",
      "assets/img/c4uycXvebPMTDWxxDx3l489Wo.png",
    ],
    desc: "Laver is a bold creative agency website designed to showcase services, projects, and personality through expressive visuals and clear storytelling.",
    category: "Agency Website",
    year: "2023",
    client: "Sonoran National Park",
    challenge:
      "The challenge was balancing bold visuals with clear navigation, ensuring the experience stayed expressive without feeling cluttered or difficult to explore.",
    thoughts:
      "The final result is a confident agency website that feels distinctive, polished, and easy to navigate while clearly presenting the studio’s work.",
  },
  atria: {
    name: "Atria",
    img: "assets/img/NZEmM7jRA6zzBxkZmx8AuHtMld0.png",
    extras: ["assets/img/qy5LwBcw9X277bvPo6OZEanrtdY.png"],
    desc: "Atria is an architecture studio site built around spatial photography, quiet type, and a home that feels like walking onto the property.",
    category: "Architecture Studio",
    year: "2024",
    client: "Atria Studio",
    challenge: "Keeping the work monumental without making the site feel cold.",
    thoughts: "A restrained interface lets the buildings carry the personality.",
  },
  plinq: {
    name: "Plinq",
    img: "assets/img/HcRlNxppO9AMHI0KhcKJtc3wvO0.png",
    extras: ["assets/img/GKLrsZpzBnbALdfB0jxNifjEp8.png", "assets/img/VPxJOjktPVbmy4dgmBhaw2oRHQ.png"],
    desc: "Plinq is a product site for a social utility, built around bright UI frames, device mockups, and punchy motion.",
    category: "Finance App",
    year: "2025",
    client: "Plinq",
    challenge: "Explaining a new interaction model without burying the product.",
    thoughts: "Short sequences and device frames keep the story tactile.",
  },
  nuvio: {
    name: "Nuvio",
    img: "assets/img/BL7zv9EGej7d1dYE5rLEhB911pI.png",
    extras: ["assets/img/F1tcMrodVxAaobV9cySMUlgKcY.png"],
    desc: "Nuvio explores landscape and atmosphere through a cinematic scroll experience.",
    category: "AI SaaS Product",
    year: "2024",
    client: "Nuvio",
    challenge: "Large imagery that still loads fast and reads on mobile.",
    thoughts: "Crop, grain, and pacing do most of the storytelling.",
  },
  sorae: {
    name: "Sorae",
    img: "assets/img/xybTQ8M8gQkUOzQ57Horl5riXsc.png",
    extras: ["assets/img/5lyoReJJbT7nSdhUNFlcI3S6qk.png", "assets/img/djhJMkCA9g7SYVna9s8voBpQ.png"],
    desc: "Sorae is a lifestyle brand site with sun-faded color and magazine-style layouts.",
    category: "Wellness App",
    year: "2023",
    client: "Sorae",
    challenge: "Feeling premium without becoming precious.",
    thoughts: "Type and photography do the heavy lifting; UI stays almost invisible.",
  },
  veyra: {
    name: "Veyra",
    img: "assets/img/uy87JonjAVE23J7z8J81GA0A0U.png",
    extras: ["assets/img/FSt2DFHxkOfTIEO54wG88PqMqo.png"],
    desc: "Veyra is a fashion lookbook experience with stark contrast and cropped portraiture.",
    category: "Fashion Brand",
    year: "2024",
    client: "Veyra",
    challenge: "Making a lookbook feel like a product, not a PDF.",
    thoughts: "Full-bleed frames and sparse copy keep the clothes in charge.",
  },
};

const zStack = { n: 20 };
function bring(el) {
  zStack.n += 1;
  el.style.zIndex = String(zStack.n);
}

(function introScreen() {
  const intro = document.getElementById("intro");
  if (!intro) return;
  const svg = intro.querySelector(".hello-svg");
  const paths = svg ? [...svg.querySelectorAll("path")] : [];
  const p1 = paths[0];
  const p2 = paths[1];
  let done = false;

  function lerpKeys(t, keys) {
    if (t <= keys[0][0]) return keys[0][1];
    for (let i = 1; i < keys.length; i++) {
      if (t <= keys[i][0]) {
        const [t0, v0] = keys[i - 1];
        const [t1, v1] = keys[i];
        const u = (t - t0) / (t1 - t0);
        return v0 + (v1 - v0) * u;
      }
    }
    return keys[keys.length - 1][1];
  }

  function setPath(el, dash, opacity) {
    if (!el) return;
    el.style.strokeDasharray = dash + " 1";
    el.style.strokeDashoffset = "0";
    el.style.opacity = String(opacity);
    el.setAttribute("stroke-dasharray", dash + " 1");
    el.setAttribute("stroke-dashoffset", "0");
    el.setAttribute("opacity", String(opacity));
  }

  function dismiss() {
    if (done) return;
    done = true;
    intro.classList.add("out");
  }

  let t0 = null;
  window.__helloPauseAt = null;
  function frame(now) {
    if (t0 === null) t0 = now;
    let t = now - t0;
    if (done && t < 1980) {
      t0 = now - 1980;
      t = 1980;
    }
    if (window.__helloPauseAt != null && t >= window.__helloPauseAt) {
      t = window.__helloPauseAt;
      t0 = now - t;
    }
    intro.dataset.t = String(Math.round(t));
    setPath(p1, lerpKeys(t, [[0, 0], [380, 1]]), t > 16 ? 1 : 0);
    setPath(
      p2,
      lerpKeys(t, [[450, 0], [500, 0.016], [800, 0.339], [1100, 0.815], [1400, 1]]),
      lerpKeys(t, [[450, 0], [500, 0.38], [720, 1]])
    );
    const ty = lerpKeys(t, [[0, 0], [1980, 0], [2080, -10], [2200, -84], [2520, -130]]);
    const br = lerpKeys(t, [[0, 0], [1980, 0], [2060, 50], [2520, 50]]);
    intro.style.borderRadius = br + "%";
    intro.style.transform = "translateY(" + ty + "%)";
    intro.style.overflow = "hidden";
    if (!done && t >= 1980) dismiss();
    if (t >= 2550) {
      intro.remove();
      return;
    }
    if (document.getElementById("intro")) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  intro.addEventListener("click", dismiss);
})();

const SONGS = [
  { title: "Never Gonna Give You Up", artist: "Rick Astley", id: "dQw4w9WgXcQ", duration: 214 },
  { title: "Gangnam Style", artist: "PSY", id: "9bZkp7q19f0", duration: 253 },
  { title: "Despacito", artist: "Luis Fonsi", id: "kJQP7kiw5Fk", duration: 281 },
];

const IPOD_MENU = ["Music", "Extras", "Settings", "Shuffle Songs", "Backlight", "Now Playing"];
const IPOD_EXTRAS = ["Photos", "Games", "Clock"];
const IPOD_SETTINGS = ["About", "Repeat", "Clicker"];

const PLAY_SVG = `<svg width="12" height="12" viewBox="0 0 16 16" fill="#666" aria-hidden="true"><polygon points="4,2 14,8 4,14"></polygon></svg>`;
const PAUSE_SVG = `<svg width="12" height="12" viewBox="0 0 16 16" fill="#666" aria-hidden="true"><rect x="3" y="2" width="3" height="12"></rect><rect x="10" y="2" width="3" height="12"></rect></svg>`;

const ipod = {
  view: "songs",
  songI: 0,
  menuI: 0,
  extraI: 0,
  setI: 0,
  playing: false,
  t: 0,
  t0: 0,
  loaded: "",
  loadTimer: 0,
};

function fmtTime(s) {
  s = Math.max(0, Math.floor(s || 0));
  return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
}

function ytThumb(id) {
  return "assets/img/yt-" + id + ".jpg";
}

function mediaEl() {
  return document.getElementById("ytPlayer");
}

function songFile(id) {
  return "assets/video/" + id + ".mp4";
}

function loadSong(autoplay) {
  const song = SONGS[ipod.songI];
  const media = mediaEl();
  const poster = document.getElementById("ytPoster");
  if (poster) poster.src = ytThumb(song.id);
  if (!media) return;
  const src = songFile(song.id);
  if (ipod.loaded !== song.id) {
    ipod.loaded = song.id;
    media.src = src;
    media.load();
  }
  media.muted = false;
  media.volume = 1;
  try {
    if (Number.isFinite(ipod.t) && Math.abs((media.currentTime || 0) - ipod.t) > 0.4) {
      media.currentTime = ipod.t;
    }
  } catch (err) {}
  if (autoplay) {
    const p = media.play();
    if (p && p.catch) p.catch(() => {});
  } else {
    media.pause();
  }
}

function bindIpodMedia() {
  const media = mediaEl();
  if (!media || media._ipodBound) return;
  media._ipodBound = true;
  media.addEventListener("timeupdate", () => {
    ipod.t = media.currentTime || 0;
  });
  media.addEventListener("loadedmetadata", () => {
    const song = SONGS[ipod.songI];
    if (song && media.duration) song.duration = Math.round(media.duration);
    try {
      media.currentTime = ipod.t || 0;
    } catch (err) {}
  });
  media.addEventListener("playing", () => {
    media.muted = false;
    media.volume = 1;
  });
  media.addEventListener("ended", () => {
    if (ipod.playing) playIndex(ipod.songI + 1, true);
  });
}

function setPlaying(on) {
  ipod.playing = on;
  const btn = document.querySelector(".wh.p");
  if (btn) btn.innerHTML = on ? PAUSE_SVG : PLAY_SVG;
  document.querySelector(".ipod").classList.toggle("playing", on);
  bindIpodMedia();
  if (on) {
    ipod.t0 = Date.now() - ipod.t * 1000;
    loadSong(true);
  } else {
    const media = mediaEl();
    if (media) ipod.t = media.currentTime || ipod.t;
    loadSong(false);
  }
  renderIpod();
}

function playIndex(i, autoplay) {
  ipod.songI = (i + SONGS.length) % SONGS.length;
  ipod.t = 0;
  ipod.t0 = Date.now();
  ipod.loaded = "";
  ipod.view = "loading";
  const media = mediaEl();
  if (media) {
    try { media.currentTime = 0; } catch (err) {}
  }
  renderIpod();
  if (autoplay) {
    setPlaying(true);
  } else {
    ipod.playing = false;
    const btn = document.querySelector(".wh.p");
    if (btn) btn.innerHTML = PLAY_SVG;
    const device = document.querySelector(".ipod");
    if (device) device.classList.remove("playing");
    bindIpodMedia();
    loadSong(false);
  }
  clearTimeout(ipod.loadTimer);
  ipod.loadTimer = setTimeout(() => {
    ipod.view = "video";
    renderIpod();
  }, 500);
}

function startIpodVideo() {
  if (ipod.view !== "video" && ipod.view !== "now" && ipod.view !== "loading") {
    ipod.view = "video";
  }
  ipod.view = "video";
  setPlaying(true);
}

function closeIpod() {
  setPlaying(false);
  const media = mediaEl();
  if (media) {
    media.pause();
    media.removeAttribute("src");
    media.load();
  }
  ipod.loaded = "";
  ipod.view = "home";
  ipod.t = 0;
  document.getElementById("ipod").classList.remove("open");
}

function closeGame() {
  const g = document.getElementById("game");
  g.classList.remove("open");
  const frame = document.getElementById("gameFrame");
  frame.src = "about:blank";
}

function ipodBar(title) {
  const icon = ipod.playing
    ? `<svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><polygon points="1,0 8,4 1,8"/></svg>`
    : `<svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><rect x="0" y="0" width="3" height="8"></rect><rect x="5" y="0" width="3" height="8"></rect></svg>`;
  return `<div class="ipod-bar"><span class="eq">${icon}</span><b>${title}</b><span class="bat"></span></div>`;
}

function renderIpod() {
  const screen = document.getElementById("ipodScreen");
  const ui = document.getElementById("ipodUi");
  if (!ui) return;
  screen.classList.toggle("menu", ipod.view !== "home");
  screen.classList.toggle("video", ipod.view === "video");
  const song = SONGS[ipod.songI];
  const poster = document.getElementById("ytPoster");
  if (poster) poster.src = ytThumb(song.id);
  const media = mediaEl();
  if (media && Number.isFinite(media.currentTime)) ipod.t = media.currentTime;
  else if (ipod.playing) ipod.t = Math.min(song.duration, (Date.now() - ipod.t0) / 1000);
  const elapsed = Math.floor(ipod.t);
  const pct = Math.round((elapsed / song.duration) * 100);
  const rows = (items, on) =>
    items
      .map(
        (t, i) =>
          `<button type="button" class="ipod-row${i === on ? " on" : ""}" data-ipod-pick="${i}">${t}</button>`
      )
      .join("");

  if (ipod.view === "home") {
    ui.innerHTML = `<div class="ipod-home"><div class="apple"></div><small>Masen James's iPod</small></div>`;
  } else if (ipod.view === "menu") {
    ui.innerHTML = ipodBar("iPod") + rows(IPOD_MENU, ipod.menuI);
  } else if (ipod.view === "extras") {
    ui.innerHTML = ipodBar("Extras") + rows(IPOD_EXTRAS, ipod.extraI);
  } else if (ipod.view === "settings") {
    ui.innerHTML = ipodBar("Settings") + rows(IPOD_SETTINGS, ipod.setI);
  } else if (ipod.view === "songs") {
    ui.innerHTML =
      ipodBar("All Songs") +
      SONGS.map(
        (s, i) =>
          `<button type="button" class="ipod-row${i === ipod.songI ? " on" : ""}" data-ipod-pick="${i}">${s.title}</button>`
      ).join("");
  } else if (ipod.view === "loading") {
    ui.innerHTML = `<div class="ipod-now">${ipodBar("Now Playing")}<div class="ipod-load"><b>${song.title}</b><span>${song.artist}</span><em>Loading...</em></div></div>`;
  } else if (ipod.view === "video") {
    ui.innerHTML = `<div class="ipod-now">${ipodBar("Now Playing")}</div>`;
  } else {
    ui.innerHTML = `<div class="ipod-now">${ipodBar("Now Playing")}<div class="of">${ipod.songI + 1} of ${SONGS.length}</div><div class="meta"><b>${song.title}</b><span>${song.artist}</span></div><div class="ipod-prog"><span>${fmtTime(elapsed)}</span><div class="track"><i style="width:${pct}%"></i></div><span>-${fmtTime(song.duration - elapsed)}</span></div></div>`;
  }
}

function chooseMenu(i) {
  ipod.menuI = i;
  if (i === 0) ipod.view = "songs";
  else if (i === 1) ipod.view = "extras";
  else if (i === 2) ipod.view = "settings";
  else if (i === 3) playIndex(Math.floor(Math.random() * SONGS.length), true);
  else if (i === 4) document.querySelector(".ipod").classList.toggle("lit");
  else {
    if (!ipod.playing && ipod.t === 0) playIndex(ipod.songI);
    else ipod.view = "now";
  }
}

function ipodSelect() {
  if (ipod.view === "home") ipod.view = "menu";
  else if (ipod.view === "menu") chooseMenu(ipod.menuI);
  else if (ipod.view === "extras" || ipod.view === "settings") ipod.view = "menu";
  else if (ipod.view === "songs") playIndex(ipod.songI);
  else if (ipod.view === "now") {
    ipod.view = "video";
    renderIpod();
  } else if (ipod.view === "video") startIpodVideo();
  renderIpod();
}

function ipodMenu() {
  if (ipod.view === "home") ipod.view = "menu";
  else if (ipod.view === "video" || ipod.view === "now" || ipod.view === "loading") ipod.view = "songs";
  else if (ipod.view === "songs" || ipod.view === "extras" || ipod.view === "settings") ipod.view = "menu";
  else ipod.view = "home";
  renderIpod();
}

function ipodMove(dir) {
  const n = (i, max) => (i + dir + max) % max;
  if (ipod.view === "menu") ipod.menuI = n(ipod.menuI, IPOD_MENU.length);
  else if (ipod.view === "extras") ipod.extraI = n(ipod.extraI, IPOD_EXTRAS.length);
  else if (ipod.view === "settings") ipod.setI = n(ipod.setI, IPOD_SETTINGS.length);
  else if (ipod.view === "songs") ipod.songI = n(ipod.songI, SONGS.length);
  else if (ipod.view === "now" || ipod.view === "video") playIndex(ipod.songI + dir, true);
  renderIpod();
}

function placeWin(el) {
  if (!el || !el.classList.contains("open") || el.classList.contains("max")) return;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (vw <= 809) {
    el.style.left = "8px";
    el.style.top = "44px";
    return;
  }
  const dx = Number(el.dataset.x);
  const dy = Number(el.dataset.y);
  if (Number.isFinite(dx) && Number.isFinite(dy)) {
    el.style.left = Math.round(dx * (vw / 1440)) + "px";
    el.style.top = Math.max(40, Math.round(dy * (vh / 900)) - 70) + "px";
    return;
  }
}

function placeOpenWins() {
  document.querySelectorAll(".win.open").forEach(placeWin);
}

function openWin(id, project) {
  if (id === "external") return;
  if (id === "ipod") {
    document.getElementById("ipod").classList.add("open");
    ipod.view = "songs";
    renderIpod();
    return;
  }
  if (id === "game") {
    const g = document.getElementById("game");
    g.classList.add("open");
    const frame = document.getElementById("gameFrame");
    if (frame.src === "about:blank" || !frame.src.includes("herding-cats")) {
      frame.src = "https://herding-cats-ten.vercel.app/";
    }
    return;
  }
  const el = document.getElementById("win-" + id);
  if (!el) return;
  el.classList.add("open");
  bring(el);
  if (id === "projects") renderProject(project || "laver");
  if (id === "reel") {
    const v = document.getElementById("reelVideo");
    if (v) {
      v.currentTime = 0;
      v.muted = true;
      v.play().catch(() => {});
    }
  }
  requestAnimationFrame(() => placeWin(el));
}

function closeWin(el) {
  if (!el) return;
  el.classList.remove("open", "max");
  delete el.dataset.toggleKey;
  if (el.id === "win-reel") {
    const v = document.getElementById("reelVideo");
    if (v) v.pause();
  }
}

function openerKey(kind, project) {
  return kind + ":" + (project || "");
}

function toggleWin(kind, project, opener) {
  if (kind === "external") return;
  const fromInside = opener && opener.closest(".win");
  if (kind === "ipod") {
    const layer = document.getElementById("ipod");
    if (!fromInside && layer.classList.contains("open")) {
      closeIpod();
      return;
    }
    openWin("ipod");
    return;
  }
  if (kind === "game") {
    const layer = document.getElementById("game");
    if (!fromInside && layer.classList.contains("open")) {
      closeGame();
      return;
    }
    openWin("game");
    return;
  }
  const el = document.getElementById("win-" + kind);
  if (!el) return;
  const key = openerKey(kind, project);
  if (!fromInside && el.classList.contains("open")) {
    if (!project || el.dataset.toggleKey === key) {
      closeWin(el);
      return;
    }
  }
  openWin(kind, project);
  el.dataset.toggleKey = key;
}

function renderProject(key) {
  const p = PROJECTS[key] || PROJECTS.laver;
  document.querySelectorAll(".proj-item").forEach((b) => b.classList.toggle("active", b.dataset.key === key));
  const extras = (p.extras || [])
    .map((src) => `<div class="proj-hero"><img src="${src}" alt="" /></div>`)
    .join("");
  document.getElementById("projDetail").innerHTML = `
    <div class="crumb">User / Projects / <b>${p.name}</b></div>
    <div class="proj-head"><h2>${p.name}</h2><a class="visit" href="#" target="_blank">Visit <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:-1px"><path d="M7 17 17 7M8 7h9v9"/></svg></a></div>
    <p class="proj-desc">${p.desc}</p>
    <div class="proj-meta"><div><small>Category</small>${p.category}</div><div><small>Client</small>${p.client}</div></div>
    <div class="proj-hero"><img src="${p.img}" alt="${p.name}" /></div>
    <div class="proj-extra">
      <h4>Challenges</h4><p>${p.challenge}</p>
      <h4>Final thoughts</h4><p>${p.thoughts}</p>
    </div>
    ${extras}`;
}

document.addEventListener("click", (e) => {
  const ipodLayer = document.getElementById("ipod");
  const gameLayer = document.getElementById("game");
  if (ipodLayer.classList.contains("open") && !e.target.closest(".ipod") && !e.target.closest("[data-open='ipod']")) {
    closeIpod();
  }
  if (gameLayer.classList.contains("open") && !e.target.closest(".game-stage") && !e.target.closest("[data-open='game']")) {
    closeGame();
  }
  const opener = e.target.closest("[data-open]");
  if (opener) {
    const kind = opener.dataset.open;
    if (kind === "external") {
      window.open(opener.dataset.url, "_blank", "noopener");
      return;
    }
    toggleWin(kind, opener.dataset.project, opener);
    return;
  }
  const copyChip = e.target.closest("[data-copy]");
  if (copyChip) {
    const val = copyChip.dataset.copy;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(val).catch(() => {});
    }
    copyChip.classList.add("copied");
    clearTimeout(copyChip._copyTimer);
    copyChip._copyTimer = setTimeout(() => copyChip.classList.remove("copied"), 1200);
  }
  const act = e.target.closest("[data-act]");
  if (act) {
    const a = act.dataset.act;
    if (a === "close") closeWin(act.closest(".win"));
    if (a === "min") closeWin(act.closest(".win"));
    if (a === "max") act.closest(".win").classList.toggle("max");
    if (a === "close-ipod") closeIpod();
  }
  const pick = e.target.closest("[data-ipod-pick]");
  if (pick) {
    const i = Number(pick.dataset.ipodPick);
    if (ipod.view === "songs") playIndex(i);
    else if (ipod.view === "menu") chooseMenu(i);
    else if (ipod.view === "extras") {
      ipod.extraI = i;
      ipod.view = "menu";
    } else if (ipod.view === "settings") {
      ipod.setI = i;
      ipod.view = "menu";
    }
    renderIpod();
    return;
  }
  if (e.target.closest("#ytOverlay") || (e.target.closest(".yt-host") && ipod.view === "video")) {
    e.preventDefault();
    startIpodVideo();
    return;
  }
  if (e.target.closest("#ipodScreen") && !e.target.closest("[data-ipod]") && ipod.view === "now") {
    ipod.view = "video";
    renderIpod();
    return;
  }
  const ipodBtn = e.target.closest("[data-ipod]");
  if (ipodBtn) {
    const cmd = ipodBtn.dataset.ipod;
    if (cmd === "menu") ipodMenu();
    if (cmd === "select") ipodSelect();
    if (cmd === "play") {
      if (ipod.view === "home" || ipod.view === "menu" || ipod.view === "songs" || ipod.view === "extras" || ipod.view === "settings") {
        playIndex(ipod.songI, true);
      } else {
        setPlaying(!ipod.playing);
      }
    }
    if (cmd === "next") ipodMove(1);
    if (cmd === "prev") ipodMove(-1);
  }
  const item = e.target.closest(".proj-item");
  if (item) renderProject(item.dataset.key);
});

setInterval(() => {
  if (document.getElementById("ipod").classList.contains("open") && ipod.view === "now") {
    renderIpod();
  }
}, 500);

/* drag windows */
let drag = null;
document.addEventListener("pointerdown", (e) => {
  const bar = e.target.closest(".titlebar");
  if (!bar || e.target.closest("button,a")) return;
  const win = bar.closest(".win");
  if (!win || win.classList.contains("max")) return;
  bring(win);
  const r = win.getBoundingClientRect();
  drag = { win, dx: e.clientX - r.left, dy: e.clientY - r.top };
  win.style.cursor = "grabbing";
});
document.addEventListener("pointermove", (e) => {
  if (!drag) return;
  drag.win.style.left = e.clientX - drag.dx + "px";
  drag.win.style.top = e.clientY - drag.dy + "px";
});
document.addEventListener("pointerup", () => {
  if (drag) drag.win.style.cursor = "";
  drag = null;
});

/* clock */
function tickClock() {
  const d = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  let h = d.getHours();
  const am = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  const m = String(d.getMinutes()).padStart(2, "0");
  document.getElementById("clock").innerHTML =
    `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} <span class="clock-sep">|</span> ${h}:${m} ${am}`;
}
tickClock();
setInterval(tickClock, 1000);

/* mobile label */
function adapt() {
  const label = document.getElementById("aboutLabel");
  if (label) label.textContent = window.innerWidth <= 900 ? "Tips" : "About Me";
}
adapt();
window.addEventListener("resize", () => {
  adapt();
  placeOpenWins();
});

/* cats toggle + oneko */
const catsToggle = document.getElementById("catsToggle");
let catsOn = false;
catsToggle.addEventListener("click", () => {
  catsOn = !catsOn;
  catsToggle.classList.toggle("on", catsOn);
});

const nekoEl = document.getElementById("neko");
const NEKO = "assets/img/";
const sprite = {
  still: "still.gif",
  alert: "alert.gif",
  yawn: "yawn.gif",
  sleep: ["sleep1.gif", "sleep2.gif"],
  itch: ["itch1.gif", "itch2.gif"],
  lick: "lickpaw.gif",
  n: ["nrun1.gif", "nrun2.gif"],
  ne: ["nerun1.gif", "nerun2.gif"],
  e: ["erun1.gif", "erun2.gif"],
  se: ["serun1.gif", "serun2.gif"],
  s: ["srun1.gif", "srun2.gif"],
  sw: ["swrun1.gif", "swrun2.gif"],
  w: ["wrun1.gif", "wrun2.gif"],
  nw: ["nwrun1.gif", "nwrun2.gif"],
};
let nx = window.innerWidth / 2 - 16;
let ny = window.innerHeight / 2 - 40;
let mx = nx;
let my = ny;
let frame = 0;
let idle = 0;
nekoEl.style.left = nx + "px";
nekoEl.style.top = ny + "px";

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});

function setSprite(file) {
  const src = NEKO + file;
  if (!nekoEl.src.endsWith(file)) nekoEl.src = src;
}

function dirFrom(dx, dy) {
  const a = (Math.atan2(dy, dx) * 180) / Math.PI;
  if (a >= -22.5 && a < 22.5) return "e";
  if (a >= 22.5 && a < 67.5) return "se";
  if (a >= 67.5 && a < 112.5) return "s";
  if (a >= 112.5 && a < 157.5) return "sw";
  if (a >= 157.5 || a < -157.5) return "w";
  if (a >= -157.5 && a < -112.5) return "nw";
  if (a >= -112.5 && a < -67.5) return "n";
  return "ne";
}

setInterval(() => {
  frame++;
  const dx = mx - nx;
  const dy = my - ny;
  const dist = Math.hypot(dx, dy);
  const speed = catsOn ? 14 : 10;
  if (dist > 48) {
    idle = 0;
    const d = dirFrom(dx, dy);
    nx += (dx / dist) * speed;
    ny += (dy / dist) * speed;
    const files = sprite[d];
    setSprite(files[frame % 2]);
  } else {
    idle++;
    if (idle < 8) setSprite(sprite.alert);
    else if (idle < 16) setSprite(sprite.yawn);
    else if (idle < 24) setSprite(sprite.itch[frame % 2]);
    else if (idle < 30) setSprite(sprite.lick);
    else setSprite(sprite.sleep[frame % 2]);
  }
  nekoEl.style.left = nx + "px";
  nekoEl.style.top = ny + "px";
}, 180);

renderProject("laver");
