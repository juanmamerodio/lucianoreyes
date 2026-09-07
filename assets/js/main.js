(() => {
  "use strict";

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const body = document.body;
  const progress = $("#progress");
  const burger = $("#burger");
  const mobilemenu = $("#mobilemenu");

  const onScroll = () => {
    const max = body.scrollHeight - window.innerHeight;
    const y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    if (progress) progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    const scrolled = y > 40;
    const bar = $(".nav__bar");
    if (bar) bar.style.boxShadow = scrolled ? "0 1px 0 rgba(22,26,31,.18)" : "";
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el) => revealObserver.observe(el));

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count || "0", 10);
        const suffix = el.dataset.suffix || "";
        const dur = 1200;
        const t0 = performance.now();
        const step = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  $$(".cifra__num").forEach((el) => counterObserver.observe(el));

  $$(".issue").forEach((issue) => {
    const row = $(".issue__row", issue);
    const btn = $(".issue__toggle", issue);
    const open = () => {
      issue.dataset.open = "1";
      $(".issue__body", issue).style.display = "block";
      btn && (btn.textContent = "−");
    };
    const close = () => {
      issue.dataset.open = "0";
      $(".issue__body", issue).style.display = "none";
      btn && (btn.textContent = "+");
    };
    row.addEventListener("click", () => {
      if (issue.dataset.open === "1") close();
      else open();
    });
  });

  const filters = $$(".audit__filtro");
  filters.forEach((f) => {
    f.addEventListener("click", () => {
      const cat = f.dataset.filtro;
      filters.forEach((x) => (x.dataset.active = x === f ? "1" : "0"));
      $$(".issue").forEach((issue) => {
        const show = cat === "all" || issue.dataset.cat === cat;
        issue.style.display = show ? "" : "none";
        if (!show) issue.dataset.open = "0";
      });
      $$(".audit__cat").forEach((c) => {
        const show = cat === "all" || c.dataset.cat === cat;
        c.style.display = show ? "" : "none";
      });
    });
  });
  if (filters.length) filters[0].dataset.active = "1";

  const closeMenu = () => {
    mobilemenu && (mobilemenu.dataset.open = "0");
    burger && (burger.setAttribute("aria-expanded", "false"));
  };
  if (burger) {
    burger.addEventListener("click", () => {
      const isOpen = mobilemenu.dataset.open === "1";
      mobilemenu.dataset.open = isOpen ? "0" : "1";
      burger.setAttribute("aria-expanded", String(!isOpen));
    });
  }
  $$("[data-scroll]").forEach((a) => {
    a.addEventListener("click", () => {
      closeMenu();
      const href = a.getAttribute("href");
      if (href && href.startsWith("#")) {
        const t = $(href);
        if (t) {
          t.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", href);
        }
      }
    });
  });

  const form = $("#propuesta-form");
  const status = $("#form-status");
  if (form) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const data = new FormData(form);
      const parts = [];
      for (const [k, v] of data.entries()) {
        if (k === "anonimo") continue;
        parts.push(k + ": " + v);
      }
      if (data.get("anonimo")) parts.push("publicacion: anónima");
      const subject = "Propuesta de comunidad — " + (data.get("nombre") || "anónimo");
      const bodyTxt = parts.join("\n");
      const mailto = "mailto:contacto@example.edu.ar?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(bodyTxt);
      status.textContent = "Abriendo tu cliente de correo para enviar la propuesta…";
      status.style.color = "#00A651";
      window.location.href = mailto;
    });
  }

  const share = $("#share");
  if (share) {
    share.addEventListener("click", () => {
      const url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
          share.textContent = "¡Enlace copiado!";
          setTimeout(() => (share.textContent = "Copiar enlace"), 2400);
        });
      } else {
        window.prompt("Copiá el enlace:", url);
      }
    });
  }
})();