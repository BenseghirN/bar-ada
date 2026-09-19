// Bistro Le Barada — carte des consommations
// Charge data/menu.json et construit la page. Pour mettre a jour la carte,
// il suffit d'editer data/menu.json (aucune modification de code requise).

const ICONS = {
  cocktail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16l-7.2 8.2V19"/><path d="M9 19h6"/><path d="M6.5 6.5h11"/></svg>',
  beer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9h9v10a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9Z"/><path d="M15 11h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2"/><path d="M6 9V6a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v3"/><path d="M8 5.2c0-.8.6-1.2.6-1.9M11 5.2c0-.8.6-1.2.6-1.9"/></svg>',
  beer0: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9h9v10a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9Z"/><path d="M15 11h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2"/><path d="M6 9V6a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v3"/><circle cx="10.5" cy="14.5" r="2.1"/></svg>',
  wine: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h10c0 4.5-2 7.5-5 7.8V17"/><path d="M9 21h6"/><path d="M12 17v4"/><path d="M7 3c0 4.5 2 7.5 5 7.8"/></svg>',
  aperitif: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10l-1 4.5H8L7 4Z"/><path d="M8 8.5 7 20h10l-1-11.5"/><path d="M9.5 13h5"/></svg>',
  soft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h8l-.8 13a1 1 0 0 1-1 .9H9.8a1 1 0 0 1-1-.9L8 6Z"/><path d="M7 6h10"/><path d="M15 2 12 6"/></svg>',
  hot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z"/><path d="M16 10h1.5a2 2 0 0 1 0 4H16"/><path d="M8 5.3c0-.7.5-1 .5-1.7M11.5 5.3c0-.7.5-1 .5-1.7"/></svg>',
  sport: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2h6l1 4-3 2v11a1 1 0 0 1-2 0V8L8 6l1-4Z"/><path d="M8.5 11h7"/></svg>',
  juice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="7.2"/><path d="M12 5.8V2M12 13 7.5 8.5M12 13l4.7-4.3M12 13 7 15.8M12 13l5 2.8"/></svg>',
  food: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2v8a2 2 0 0 0 2 2v10"/><path d="M7 2v6M10 2v6"/><path d="M17 2c-1.8 0-3 2-3 5s1.2 5 3 5v10"/></svg>',
};

function fmtPrice(p) {
  return Number(p).toFixed(2).replace(".", ",");
}

function buildNav(categories) {
  const nav = document.getElementById("nav");
  nav.innerHTML = categories
    .map(
      (cat) => `
    <button class="navpill" data-target="${cat.slug}">
      <span class="navpill-ic">${ICONS[cat.icon] || ""}</span>${cat.label}
    </button>`
    )
    .join("");
}

function buildSections(categories) {
  const main = document.getElementById("main");
  main.innerHTML = categories
    .map(
      (cat) => `
    <section class="catsec" id="${cat.slug}">
      <div class="cathead">
        <span class="cathead-ic">${ICONS[cat.icon] || ""}</span>
        <h2>${cat.label}</h2>
      </div>
      <ul class="items">
        ${cat.items
          .map(
            (it) => `
        <li class="item">
          <span class="item-name">${it.name}</span>
          <span class="item-rule"></span>
          <span class="item-price">${fmtPrice(it.price)}&nbsp;€</span>
        </li>`
          )
          .join("")}
      </ul>
    </section>`
    )
    .join("");
}

function wireScrollSpy() {
  const pills = Array.from(document.querySelectorAll(".navpill"));
  const sections = pills
    .map((p) => document.getElementById(p.dataset.target))
    .filter(Boolean);

  pills.forEach((p) => {
    p.addEventListener("click", () => {
      const target = document.getElementById(p.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const setActive = (id) => {
    pills.forEach((p) => p.classList.toggle("active", p.dataset.target === id));
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
  }
  if (pills[0]) setActive(pills[0].dataset.target);
}

async function init() {
  const main = document.getElementById("main");
  try {
    const res = await fetch("data/menu.json", { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    const categories = (data.categories || []).filter(
      (c) => Array.isArray(c.items) && c.items.length
    );
    if (!categories.length) throw new Error("Carte vide");
    buildNav(categories);
    buildSections(categories);
    wireScrollSpy();
  } catch (err) {
    main.innerHTML = `<p class="state-msg">La carte n'a pas pu être chargée (${err.message}). Vérifiez data/menu.json.</p>`;
    console.error(err);
  }
}

init();
