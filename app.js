const POSTS = [
  {
    slug: "faucon-millenium",
    title: "Review : Le Faucon Millenium — pourquoi c’est un set culte",
    category: "reviews",
    tags: ["UCS", "Vaisseaux", "Iconique"],
    date: "2026-02-21",
    excerpt:
      "Détails, plaisir de construction, minifigs, exposabilité… Voici mon avis structuré sur un incontournable de la collection.",
    url: "./posts/faucon-millenium.html",
    reading: "7 min",
    score: "9/10"
  },
  {
    slug: "top-sets-2026",
    title: "Top 7 des sets LEGO Star Wars à surveiller en 2026",
    category: "nouveautes",
    tags: ["Top", "Achat", "2026"],
    date: "2026-02-21",
    excerpt:
      "Mon classement (et pourquoi) : valeur perçue, minifigs, design, plaisir de build, et potentiel collection.",
    url: "./posts/top-sets-2026.html",
    reading: "6 min"
  },
  {
    slug: "minifigs-rares",
    title: "Minifigs rares : comment les repérer sans se faire avoir",
    category: "sets-rares",
    tags: ["Minifigs", "Rareté", "Conseils"],
    date: "2026-02-21",
    excerpt:
      "Checklist anti-arnaque : impression, accessoires, variantes, état, et astuces de collectionneur.",
    url: "./posts/minifigs-rares.html",
    reading: "8 min"
  },
  {
    slug: "guide-debutant",
    title: "Guide débutant : démarrer une collection LEGO Star Wars intelligemment",
    category: "home",
    tags: ["Débuter", "Budget", "Organisation"],
    date: "2026-02-21",
    excerpt:
      "Que prendre en premier ? Comment choisir, stocker, et éviter les achats impulsifs. Une méthode simple.",
    url: "./posts/guide-debutant.html",
    reading: "5 min"
  },
  {
    slug: "sets-ucs",
    title: "UCS : faut-il craquer ? Avantages, limites, et comment choisir",
    category: "reviews",
    tags: ["UCS", "Display", "Conseils"],
    date: "2026-02-21",
    excerpt:
      "Un set UCS, c’est magnifique… mais exigeant. Voici comment savoir si ça vaut le coup pour toi.",
    url: "./posts/sets-ucs.html",
    reading: "6 min"
  },
  {
    slug: "investir-lego",
    title: "Investir vs collectionner : les erreurs les plus fréquentes",
    category: "sets-rares",
    tags: ["Valeur", "Marché", "Erreurs"],
    date: "2026-02-21",
    excerpt:
      "Boîtes, timing, état, hype… une approche réaliste pour éviter la frustration et garder du plaisir.",
    url: "./posts/investir-lego.html",
    reading: "7 min"
  }
];

const $app = document.getElementById("app");
document.getElementById("year").textContent = new Date().getFullYear();

function setActiveNav(routeKey){
  document.querySelectorAll(".links a").forEach(a => a.classList.remove("active"));
  const el = document.querySelector(`.links a[data-route="${routeKey}"]`);
  if(el) el.classList.add("active");
}

function escapeHtml(s){
  return (s || "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
}

function renderHome({query=""} = {}){
  setActiveNav("home");
  const q = query.trim().toLowerCase();
  const filtered = POSTS.filter(p => {
    if(!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.join(" ").toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const cards = filtered.map(p => `
    <article class="card">
      <div class="cover" aria-hidden="true"></div>
      <div class="inner">
        <div class="meta">
          <span class="badge">${escapeHtml(p.category)}</span>
          <span class="dot">•</span>
          <span class="pill">⏱️ ${escapeHtml(p.reading || "5 min")}</span>
          ${p.score ? `<span class="pill">⭐ ${escapeHtml(p.score)}</span>` : ""}
        </div>
        <h3 style="margin-top:10px"><a href="${p.url}">${escapeHtml(p.title)}</a></h3>
        <p>${escapeHtml(p.excerpt)}</p>
        <div class="meta">
          ${p.tags.map(t => `<span class="pill">#${escapeHtml(t)}</span>`).join("")}
        </div>
      </div>
    </article>
  `).join("");

  const latest = [...POSTS].slice(0,6).map(p => `
    <a href="${p.url}">
      <span>${escapeHtml(p.title)}</span>
      <span class="badge">${escapeHtml(p.category)}</span>
    </a>
  `).join("");

  $app.innerHTML = `
    <section class="hero">
      <span class="pill">🧱 LEGO Star Wars · Reviews · Nouveautés · Collection</span>
      <h1>Le guide galactique pour construire, collectionner et kiffer.</h1>
      <p>
        Ici on parle builds, minifigs, sets UCS, nouveautés et astuces de collection.
        Objectif : un blog clair, utile, et fun (sans bla-bla).
      </p>

      <div class="row">
        <div class="searchbar" role="search">
          <span aria-hidden="true">🔎</span>
          <input id="search" placeholder="Rechercher : UCS, minifigs, 2026, X-Wing…" value="${escapeHtml(query)}" />
        </div>
        <a class="btn primary" href="#/categorie/reviews">Voir les reviews</a>
        <a class="btn" href="#/a-propos">Qui suis-je ?</a>
      </div>
      <hr class="sep" />
      <div class="meta">
        <span class="pill">✅ Pages articles</span>
        <span class="pill">✅ Recherche</span>
        <span class="pill">✅ SEO (RSS + sitemap)</span>
      </div>
    </section>

    <section class="grid">
      ${cards || `<div class="aside"><h2>Résultats</h2><p style="color:var(--muted);margin:0">Aucun résultat pour “${escapeHtml(query)}”.</p></div>`}

      <aside class="aside">
        <h2>Derniers articles</h2>
        ${latest}
        <hr class="sep" />
        <h2>Catégories</h2>
        <a href="#/categorie/reviews"><span>Reviews</span><span class="badge">${POSTS.filter(p=>p.category==="reviews").length}</span></a>
        <a href="#/categorie/nouveautes"><span>Nouveautés</span><span class="badge">${POSTS.filter(p=>p.category==="nouveautes").length}</span></a>
        <a href="#/categorie/sets-rares"><span>Sets rares</span><span class="badge">${POSTS.filter(p=>p.category==="sets-rares").length}</span></a>
      </aside>
    </section>
  `;

  const input = document.getElementById("search");
  input?.addEventListener("input", (e) => {
    const v = e.target.value;
    location.hash = `#/?q=${encodeURIComponent(v)}`;
  });
}

function renderCategory(cat){
  const routeKey = cat === "reviews" ? "reviews" : cat === "nouveautes" ? "nouveautes" : cat === "sets-rares" ? "sets-rares" : "home";
  setActiveNav(routeKey);

  const list = POSTS.filter(p => p.category === cat);
  $app.innerHTML = `
    <section class="hero">
      <span class="pill">📚 Catégorie</span>
      <h1>${escapeHtml(cat)}</h1>
      <p>Une sélection d’articles classés pour trouver vite ce que tu cherches.</p>
      <div class="row">
        <a class="btn" href="#/">← Retour accueil</a>
        <a class="btn primary" href="#/?q=${encodeURIComponent(cat)}">Rechercher “${escapeHtml(cat)}”</a>
      </div>
    </section>

    <section class="grid">
      ${list.map(p => `
        <article class="card">
          <div class="cover" aria-hidden="true"></div>
          <div class="inner">
            <div class="meta">
              <span class="badge">${escapeHtml(p.category)}</span>
              <span class="dot">•</span>
              <span class="pill">⏱️ ${escapeHtml(p.reading || "5 min")}</span>
              ${p.score ? `<span class="pill">⭐ ${escapeHtml(p.score)}</span>` : ""}
            </div>
            <h3 style="margin-top:10px"><a href="${p.url}">${escapeHtml(p.title)}</a></h3>
            <p>${escapeHtml(p.excerpt)}</p>
            <div class="meta">${p.tags.map(t => `<span class="pill">#${escapeHtml(t)}</span>`).join("")}</div>
          </div>
        </article>
      `).join("") || `<div class="aside"><h2>Oups</h2><p style="color:var(--muted);margin:0">Pas d’articles ici pour le moment.</p></div>`}
    </section>
  `;
}

function renderAbout(){
  setActiveNav("a-propos");
  $app.innerHTML = `
    <section class="hero">
      <span class="pill">👋 À propos</span>
      <h1>Bienvenue sur Galaxie Briques</h1>
      <p>
        Ce blog est dédié aux LEGO Star Wars : reviews, nouveautés, minifigs, astuces de collection.
        Tu peux modifier ce texte pour te présenter (ton prénom, ton histoire, ta collection…).
      </p>
      <div class="row">
        <a class="btn primary" href="#/">Voir les articles</a>
        <a class="btn" href="#/?q=UCS">Rechercher “UCS”</a>
      </div>
    </section>

    <section class="grid">
      <div class="aside">
        <h2>Idées de rubriques</h2>
        <a href="#/categorie/reviews"><span>Reviews</span><span class="badge">notes /10</span></a>
        <a href="#/categorie/nouveautes"><span>Nouveautés</span><span class="badge">sorties</span></a>
        <a href="#/categorie/sets-rares"><span>Sets rares</span><span class="badge">minifigs</span></a>
        <hr class="sep" />
        <h2>Contact</h2>
        <p style="margin:0;color:var(--muted)">Ajoute ici un email ou un formulaire plus tard.</p>
      </div>

      <div class="aside">
        <h2>Objectif du site</h2>
        <p style="margin:0;color:var(--muted)">
          Construire un blog propre, rapide, et facile à héberger gratuitement (GitHub Pages).
          Quand tu voudras, on pourra passer au “niveau 4” : vrai CMS (WordPress) ou génération automatique d’articles.
        </p>
      </div>
    </section>
  `;
}

function parseHash(){
  const h = (location.hash || "#/").slice(1); // remove '#'
  const [path, queryString] = h.split("?");
  const params = new URLSearchParams(queryString || "");
  return { path, params };
}

function route(){
  const { path, params } = parseHash();

  if(path === "/" || path === ""){
    renderHome({ query: params.get("q") || "" });
    return;
  }

  const parts = path.split("/").filter(Boolean); // e.g. ["categorie","reviews"]
  if(parts[0] === "categorie" && parts[1]){
    renderCategory(parts[1]);
    return;
  }
  if(parts[0] === "a-propos"){
    renderAbout();
    return;
  }

  // fallback
  renderHome();
}

window.addEventListener("hashchange", route);
route();
